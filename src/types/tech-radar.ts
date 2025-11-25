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
  readonly angle: number
  readonly radius: number
  readonly xCoordinate: number
  readonly yCoordinate: number
}
