import type {
  CalculateBlipPositionParameters,
  CalculateBlipPositionResult,
} from '@/types/tech-radar'

/**
 * Simple hash function to convert a string to a deterministic number.
 * This ensures the same skill name always produces the same seed.
 */
export const hashString: (input: string) => number = (
  input: string
): number => {
  let hash: number = 0
  for (let index: number = 0; index < input.length; index++) {
    const char: number = input.codePointAt(index) ?? 0
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

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
    // Generate deterministic seeds from skill name
    const baseSeed: number = hashString(skillName)
    const angleSeed: number = baseSeed
    const radiusSeed: number = baseSeed + 100

    const angleStep: number = (endAngle - startAngle) / (total + 1)
    const angleJitter: number = (seededRandom(angleSeed) - 0.5) * 0.2
    const angle: number = startAngle + (index + 1) * angleStep + angleJitter

    // Map confidence (0-1) to radius (inner to outer)
    // High confidence -> closer to center
    // Low confidence -> closer to edge
    const minRadius: number = 25
    const maxRadius: number = 85
    const radiusJitter: number = (seededRandom(radiusSeed) - 0.5) * 5
    const radius: number =
      minRadius + (1 - confidence) * (maxRadius - minRadius) + radiusJitter

    const xCoordinate: number = Math.cos(angle) * radius
    const yCoordinate: number = Math.sin(angle) * radius
    return { angle, radius, xCoordinate, yCoordinate }
  }
