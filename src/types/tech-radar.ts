import type { LucideIcon } from 'lucide-react'

export type TechRadarQuadrant =
  | 'buildTools'
  | 'frameworks'
  | 'infrastructure'
  | 'languages'

export interface Blip {
  readonly angle: number
  readonly icon: LucideIcon
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
  readonly seedOffset: number
  readonly startAngle: number
  readonly total: number
}

export interface CalculateBlipPositionResult {
  readonly angle: number
  readonly radius: number
  readonly xCoordinate: number
  readonly yCoordinate: number
}
