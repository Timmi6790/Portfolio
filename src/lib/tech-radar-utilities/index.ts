import {
  siteConfig,
  SKILL_RENDER_AREAS,
  type SkillRenderArea,
} from '@/lib/config'
import { RADAR_CONFIG } from '@/lib/radar-config'
import type {
  CalculateBlipPositionParameters,
  CalculateBlipPositionResult,
  CalculatePhysicsForceParameters,
  CalculatePhysicsForceResult,
  ConstrainBlipsParameters,
  ForceResult,
  MutableBlip,
  ResolveBlipCollisionsParameters,
  ShouldShowSkillParameter,
} from '@/types/tech-radar'

import {
  calculateBlipRepulsion,
  calculateNoise,
  calculateSpringForce,
  calculateTangentForce,
  calculateWallRepulsion,
} from './physics-forces'
import { hashString, seededRandom } from './utilities'

/**
 * Calculate position for a blip within a quadrant.
 * `startAngle` and `endAngle` define the angular range (radians).
 * Uses skillName for deterministic seeding to ensure consistent rendering.
 */
export const calculateBlipPosition: (
  parameters: CalculateBlipPositionParameters
) => CalculateBlipPositionResult = ({
  confidence,
  endAngle,
  index,
  skillName,
  startAngle,
  total,
}: CalculateBlipPositionParameters): CalculateBlipPositionResult => {
  const baseSeed: number = hashString(skillName)
  const angleSeed: number = baseSeed
  const radiusSeed: number = baseSeed + 100

  const angleStep: number = (endAngle - startAngle) / (total + 1)
  const angleJitter: number =
    (seededRandom(angleSeed) - 0.5) * RADAR_CONFIG.jitter.angle
  const angle: number = startAngle + (index + 1) * angleStep + angleJitter

  const radiusJitter: number =
    (seededRandom(radiusSeed) - 0.5) * RADAR_CONFIG.jitter.radius
  const radius: number =
    RADAR_CONFIG.blips.minRadius +
    (1 - confidence) *
      (RADAR_CONFIG.blips.maxRadius - RADAR_CONFIG.blips.minRadius) +
    radiusJitter

  const xCoordinate: number = Math.cos(angle) * radius
  const yCoordinate: number = Math.sin(angle) * radius
  return { angle, radius, xCoordinate, yCoordinate }
}

/**
 * Calculate physics forces for a single blip
 */
const calculatePhysicsForces: (
  parameters: CalculatePhysicsForceParameters
) => CalculatePhysicsForceResult = ({
  allBlips,
  blip,
  blipIndex,
  endAngle,
  minSeparation,
  startAngle,
  targetRadius,
  temperature,
}: CalculatePhysicsForceParameters): CalculatePhysicsForceResult => {
  let totalForceX: number = 0
  let totalForceY: number = 0

  const springForce: ForceResult = calculateSpringForce(blip, targetRadius)
  totalForceX += springForce.forceX
  totalForceY += springForce.forceY

  const wallForce: ForceResult = calculateWallRepulsion({
    blip,
    endAngle,
    startAngle,
  })
  totalForceX += wallForce.forceX
  totalForceY += wallForce.forceY

  const tangentForce: ForceResult = calculateTangentForce({
    blip,
    blipIndex,
    temperature,
  })
  totalForceX += tangentForce.forceX
  totalForceY += tangentForce.forceY

  const repulsionForce: ForceResult = calculateBlipRepulsion({
    allBlips,
    blip,
    blipIndex,
    minSeparation,
  })
  totalForceX += repulsionForce.forceX
  totalForceY += repulsionForce.forceY

  const noiseForce: ForceResult = calculateNoise(
    blipIndex,
    allBlips.length,
    temperature
  )
  totalForceX += noiseForce.forceX
  totalForceY += noiseForce.forceY

  return { forceX: totalForceX, forceY: totalForceY }
}

/**
 * Helper to constrain blips to the sector
 */
const constrainBlips: (parameters: ConstrainBlipsParameters) => void = ({
  blips,
  blipSize,
  endAngle,
  startAngle,
}: ConstrainBlipsParameters): void => {
  for (const blip of blips) {
    let currentAngle: number = Math.atan2(blip.yCoordinate, blip.xCoordinate)
    let currentRadius: number = Math.hypot(blip.xCoordinate, blip.yCoordinate)

    if (currentAngle < 0) {
      currentAngle += Math.PI * 2
    }

    const boundaryBuffer: number = blipSize + 2
    const blipAngularSize: number = Math.atan2(boundaryBuffer, currentRadius)

    const minAngle: number = startAngle + blipAngularSize
    const maxAngle: number = endAngle - blipAngularSize

    if (currentAngle < minAngle) {
      currentAngle = minAngle
    }
    if (currentAngle > maxAngle) {
      currentAngle = maxAngle
    }

    const minRadius: number = RADAR_CONFIG.blips.minRadius
    const maxRadius: number = RADAR_CONFIG.blips.maxRadius

    if (currentRadius < minRadius) {
      currentRadius = minRadius
    }
    if (currentRadius > maxRadius) {
      currentRadius = maxRadius
    }

    blip.angle = currentAngle
    blip.radius = currentRadius
    blip.xCoordinate = Math.cos(currentAngle) * currentRadius
    blip.yCoordinate = Math.sin(currentAngle) * currentRadius
  }
}

export const resolveBlipCollisions: (
  parameters: ResolveBlipCollisionsParameters
) => CalculateBlipPositionResult[] = ({
  blips,
  endAngle,
  startAngle,
}: ResolveBlipCollisionsParameters): CalculateBlipPositionResult[] => {
  const resolvedBlips: MutableBlip[] = structuredClone(blips) as MutableBlip[]
  const blipSize: number = RADAR_CONFIG.blips.size
  const minSeparation: number = blipSize * 2 + 4
  const iterations: number = RADAR_CONFIG.physics.iterations

  const targetRadii: number[] = blips.map(
    (blip: CalculateBlipPositionResult): number => blip.radius
  )

  for (let iteration: number = 0; iteration < iterations; iteration++) {
    const progress: number = iteration / iterations
    const temperature: number = 1 - progress

    for (
      let blipIndex: number = 0;
      blipIndex < resolvedBlips.length;
      blipIndex++
    ) {
      const blip: MutableBlip | undefined = resolvedBlips.at(blipIndex)
      const targetRadius: number | undefined = targetRadii.at(blipIndex)

      if (blip === undefined || targetRadius === undefined) {
        continue
      }

      const { forceX, forceY }: CalculatePhysicsForceResult =
        calculatePhysicsForces({
          allBlips: resolvedBlips,
          blip,
          blipIndex,
          endAngle,
          minSeparation,
          startAngle,
          targetRadius,
          temperature,
        })

      const forceMag: number = Math.hypot(forceX, forceY)
      const maxSpeed: number = RADAR_CONFIG.physics.maxSpeed * temperature + 0.5

      if (forceMag > maxSpeed) {
        blip.xCoordinate += (forceX / forceMag) * maxSpeed
        blip.yCoordinate += (forceY / forceMag) * maxSpeed
      } else {
        blip.xCoordinate += forceX
        blip.yCoordinate += forceY
      }
    }

    constrainBlips({ blips: resolvedBlips, blipSize, endAngle, startAngle })
  }

  return resolvedBlips
}

const getSkillRenderAreaMinimumConfidence: (
  skillRenderArea: SkillRenderArea
) => number = (skillRenderArea: SkillRenderArea): number => {
  switch (skillRenderArea) {
    case SKILL_RENDER_AREAS.RESUME: {
      return siteConfig.skills.resumeMinimumConfidence
    }
    case SKILL_RENDER_AREAS.SECTION: {
      return siteConfig.skills.sectionSideMinimumConfidence
    }
    case SKILL_RENDER_AREAS.TECH_RADAR: {
      return 1
    }
    default: {
      throw new Error(
        `Invalid skill render area: ${JSON.stringify(skillRenderArea)}`
      )
    }
  }
}

export const shouldShowSkill: (
  parameter: ShouldShowSkillParameter
) => boolean = ({ renderArea, skill }: ShouldShowSkillParameter): boolean => {
  const minConfidence: number = getSkillRenderAreaMinimumConfidence(renderArea)

  if (minConfidence > skill.confidence) {
    return false
  }

  if (skill.renderAreas !== undefined && skill.renderAreas.length > 0) {
    for (const area of skill.renderAreas) {
      if (area === renderArea) {
        return true
      }
    }

    return false
  }

  return true
}

export { hashString, seededRandom } from './utilities'
