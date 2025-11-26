import type { Skill, SkillRenderArea } from '@/lib/config'

export type TechRadarQuadrant =
  | 'buildTools'
  | 'frameworks'
  | 'infrastructure'
  | 'languages'

export interface Blip {
  readonly angle: number
  readonly iconName: string
  readonly id: string
  readonly name: string
  readonly quadrant: TechRadarQuadrant
  readonly radius: number
  readonly xCoordinate: number
  readonly yCoordinate: number
}

export interface CalculateBlipPositionParameters {
  readonly confidence: number
  readonly endAngle: number
  readonly index: number
  readonly skillName: string
  readonly startAngle: number
  readonly total: number
}

export interface CalculateBlipPositionResult {
  angle: number
  radius: number
  xCoordinate: number
  yCoordinate: number
}

/**
 * Radar dimensions and layout configuration
 */
export interface RadarConfigType {
  readonly animation: {
    readonly sonarSweepAngle: number
    readonly sonarSweepRadius: number
  }
  readonly blips: {
    readonly hoverScale: number
    readonly maxRadius: number
    readonly minRadius: number
    readonly size: number
    readonly strokeWidth: number
  }
  readonly circles: {
    readonly inner: number
    readonly middle: number
    readonly outer: number
  }
  readonly jitter: {
    readonly angle: number
    readonly radius: number
  }
  readonly labels: {
    readonly bottomRadius: number
    readonly fontSize: number
    readonly topRadius: number
  }
  readonly physics: {
    readonly iterations: number
    readonly maxSpeed: number
    readonly noiseAmount: number
    readonly repulsionStrength: number
    readonly springStrength: number
    readonly tangentForce: number
    readonly wallRepulsionStrength: number
  }
  readonly viewBox: {
    readonly height: number
    readonly max: number
    readonly min: number
    readonly width: number
  }
}

/**
 * Quadrant angle configuration
 */
export interface QuadrantAngleType {
  readonly end: number
  readonly start: number
}

/**
 * Quadrant angles for all four quadrants
 */
export interface QuadrantAnglesType {
  readonly buildTools: QuadrantAngleType
  readonly frameworks: QuadrantAngleType
  readonly infrastructure: QuadrantAngleType
  readonly languages: QuadrantAngleType
}

/**
 * Quadrant styling configuration
 */
export interface QuadrantStyleType {
  readonly blipColor: string
  readonly labelColor: string
}

/**
 * Quadrant styles for all four quadrants
 */
export interface QuadrantStylesType {
  readonly buildTools: QuadrantStyleType
  readonly frameworks: QuadrantStyleType
  readonly infrastructure: QuadrantStyleType
  readonly languages: QuadrantStyleType
}

/**
 * Label paths for curved text
 */
export interface LabelPathsType {
  readonly buildTools: string
  readonly frameworks: string
  readonly infrastructure: string
  readonly languages: string
}

export interface ShouldShowSkillParameter {
  readonly renderArea: SkillRenderArea
  readonly skill: Skill
}

export type MutableBlip = {
  -readonly [K in keyof CalculateBlipPositionResult]: CalculateBlipPositionResult[K]
}

export interface ForceResult {
  readonly forceX: number
  readonly forceY: number
}

export interface CalculatePhysicsForceParameters {
  readonly allBlips: readonly MutableBlip[]
  readonly blip: MutableBlip
  readonly blipIndex: number
  readonly endAngle: number
  readonly minSeparation: number
  readonly startAngle: number
  readonly targetRadius: number
  readonly temperature: number
}

export interface CalculatePhysicsForceResult {
  readonly forceX: number
  readonly forceY: number
}

export interface ConstrainBlipsParameters {
  readonly blips: MutableBlip[]
  readonly blipSize: number
  readonly endAngle: number
  readonly startAngle: number
}

export interface ResolveBlipCollisionsParameters {
  readonly blips: readonly CalculateBlipPositionResult[]
  readonly endAngle: number
  readonly startAngle: number
}

export interface CalculateBlipRepulsionParameters {
  readonly allBlips: readonly MutableBlip[]
  readonly blip: MutableBlip
  readonly blipIndex: number
  readonly minSeparation: number
}

export interface CalculateTangentForceParameters {
  readonly blip: MutableBlip
  readonly blipIndex: number
  readonly temperature: number
}

export interface CalculateWallRepulsionParameters {
  readonly blip: MutableBlip
  readonly endAngle: number
  readonly startAngle: number
}
