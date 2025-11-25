import type {
  CalculateBlipPositionParameters,
  CalculateBlipPositionResult,
} from '@/types/tech-radar'

// Seeded random number generator for deterministic layout
export const seededRandom: (seed: number) => number = (
  seed: number
): number => {
  const temporary: number = Math.sin(seed) * 10_000
  return temporary - Math.floor(temporary)
}

/**
 * Calculate position for a blip within a quadrant.
 * `startAngle` and `endAngle` define the angular range (radians).
 */
export const calculateBlipPosition: (
  parameters: CalculateBlipPositionParameters
) => CalculateBlipPositionResult = ({
  confidence,
  endAngle,
  index,
  seedOffset,
  startAngle,
  total,
}: CalculateBlipPositionParameters): CalculateBlipPositionResult => {
  const angleStep: number = (endAngle - startAngle) / (total + 1)
  const angleJitter: number = (seededRandom(index + seedOffset) - 0.5) * 0.2
  const angle: number = startAngle + (index + 1) * angleStep + angleJitter

  // Map confidence (0-1) to radius (inner to outer)
  // High confidence -> closer to center
  // Low confidence -> closer to edge
  const minRadius: number = 25
  const maxRadius: number = 85
  const radiusJitter: number =
    (seededRandom(index + seedOffset + 100) - 0.5) * 5
  const radius: number =
    minRadius + (1 - confidence) * (maxRadius - minRadius) + radiusJitter

  const xCoordinate: number = Math.cos(angle) * radius
  const yCoordinate: number = Math.sin(angle) * radius
  return { angle, radius, xCoordinate, yCoordinate }
}
