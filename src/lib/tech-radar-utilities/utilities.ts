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

/**
 * Seeded random number generator for deterministic layout
 */
export const seededRandom: (seed: number) => number = (
  seed: number
): number => {
  const temporary: number = Math.sin(seed) * 10_000
  return temporary - Math.floor(temporary)
}

/**
 * Normalize an angle to be within the range [-PI, PI]
 * Handles arbitrarily large angles efficiently.
 */
export const normalizeAngle: (angle: number) => number = (
  angle: number
): number => {
  return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI))
}
