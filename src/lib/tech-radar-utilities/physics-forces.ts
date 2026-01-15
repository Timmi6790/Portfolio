import { RADAR_CONFIG } from '@/components/sections/tech-radar/config'
import type {
  CalculateBlipRepulsionParameters,
  CalculateTangentForceParameters,
  CalculateWallRepulsionParameters,
  ForceResult,
  MutableBlip,
} from '@/types/tech-radar'

import { normalizeAngle, seededRandom } from './utilities'

/**
 * Calculate spring force pulling blip towards target radius
 */
export const calculateSpringForce: (
  blip: MutableBlip,
  targetRadius: number
) => ForceResult = (blip: MutableBlip, targetRadius: number): ForceResult => {
  const currentRadius: number = Math.hypot(blip.xCoordinate, blip.yCoordinate)
  const radiusDiff: number = targetRadius - currentRadius
  const springStrength: number = RADAR_CONFIG.physics.springStrength
  const angle: number = Math.atan2(blip.yCoordinate, blip.xCoordinate)

  return {
    forceX: Math.cos(angle) * radiusDiff * springStrength,
    forceY: Math.sin(angle) * radiusDiff * springStrength,
  }
}

/**
 * Calculate wall repulsion force from sector boundaries
 */
export const calculateWallRepulsion: (
  parameters: CalculateWallRepulsionParameters
) => ForceResult = ({
  blip,
  endAngle,
  startAngle,
}: CalculateWallRepulsionParameters): ForceResult => {
  let forceX: number = 0
  let forceY: number = 0
  let currentAngle: number = Math.atan2(blip.yCoordinate, blip.xCoordinate)

  if (currentAngle < 0) {
    currentAngle += Math.PI * 2
  }

  const currentRadius: number = Math.hypot(blip.xCoordinate, blip.yCoordinate)
  const wallRepulsionStrength: number =
    RADAR_CONFIG.physics.wallRepulsionStrength

  // Force from Start Wall
  const diffStart: number = normalizeAngle(currentAngle - startAngle)

  if (Math.abs(diffStart) < 0.5) {
    const distance: number = Math.abs(currentRadius * Math.sin(diffStart))
    const force: number = wallRepulsionStrength / (distance * distance + 0.1)
    forceX += -Math.sin(startAngle) * force
    forceY += Math.cos(startAngle) * force
  }

  // Force from End Wall
  const diffEnd: number = normalizeAngle(currentAngle - endAngle)

  if (Math.abs(diffEnd) < 0.5) {
    const distance: number = Math.abs(currentRadius * Math.sin(diffEnd))
    const force: number = wallRepulsionStrength / (distance * distance + 0.1)
    forceX += Math.sin(endAngle) * force
    forceY += -Math.cos(endAngle) * force
  }

  return { forceX, forceY }
}

/**
 * Calculate tangential drift force
 */
export const calculateTangentForce: (
  parameters: CalculateTangentForceParameters
) => ForceResult = ({
  blip,
  blipIndex,
  temperature,
}: CalculateTangentForceParameters): ForceResult => {
  const tangentForce: number = RADAR_CONFIG.physics.tangentForce * temperature
  const tangentDirection: number = blipIndex % 2 === 0 ? 1 : -1
  const currentAngle: number = Math.atan2(blip.yCoordinate, blip.xCoordinate)

  return {
    forceX: -Math.sin(currentAngle) * tangentForce * tangentDirection,
    forceY: Math.cos(currentAngle) * tangentForce * tangentDirection,
  }
}

/**
 * Calculate blip-to-blip repulsion force
 */
export const calculateBlipRepulsion: (
  parameters: CalculateBlipRepulsionParameters
) => ForceResult = ({
  allBlips,
  blip,
  blipIndex,
  minSeparation,
}: CalculateBlipRepulsionParameters): ForceResult => {
  let forceX: number = 0
  let forceY: number = 0

  const repulsionStrength: number = RADAR_CONFIG.physics.repulsionStrength

  for (const [index, otherBlip] of allBlips.entries()) {
    if (blipIndex === index) {
      continue
    }

    const deltaX: number = blip.xCoordinate - otherBlip.xCoordinate
    const deltaY: number = blip.yCoordinate - otherBlip.yCoordinate
    const distanceSquared: number = deltaX * deltaX + deltaY * deltaY
    const distance: number = Math.sqrt(distanceSquared)

    if (distance < minSeparation * 1.5) {
      // Avoid divide by zero
      const safeDistanceSquared: number = Math.max(distanceSquared, 0.0001)
      const forceMagnitude: number =
        repulsionStrength / (safeDistanceSquared + 0.1)
      const cappedForce: number = Math.min(forceMagnitude, 5)

      let normalizedX: number
      let normalizedY: number

      if (distance < 0.0001) {
        // If blips are effectively on top of each other, push in a random deterministic direction
        // or just use arbitrary direction (e.g. X-axis) to separate them
        normalizedX = 1
        normalizedY = 0
      } else {
        normalizedX = deltaX / distance
        normalizedY = deltaY / distance
      }

      forceX += normalizedX * cappedForce
      forceY += normalizedY * cappedForce
    }
  }

  return { forceX, forceY }
}

/**
 * Calculate random noise force
 */
export const calculateNoise: (
  blipIndex: number,
  totalBlips: number,
  temperature: number
) => ForceResult = (
  blipIndex: number,
  totalBlips: number,
  temperature: number
): ForceResult => {
  const noiseAmount: number = RADAR_CONFIG.physics.noiseAmount * temperature
  const noiseSeed: number = blipIndex * totalBlips + blipIndex
  const noiseX: number = seededRandom(noiseSeed) - 0.5
  const noiseY: number = seededRandom(noiseSeed + 1000) - 0.5

  return {
    forceX: noiseX * noiseAmount,
    forceY: noiseY * noiseAmount,
  }
}
