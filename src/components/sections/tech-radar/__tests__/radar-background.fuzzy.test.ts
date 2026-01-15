import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import { calculateSweepPath } from '../radar-background'

describe('RadarBackground Fuzzy Tests', () => {
  describe('calculateSweepPath', () => {
    test.prop([
      // Radius must be non-negative for a valid physical sweep (though path calc handles negatives by math)
      // Let's constrain to reasonable positive UI values
      fc.double({ min: 0, max: 2000, noNaN: true }),
      // Angle in degrees (constrain to prevent overflow issues in trig calc internally or test regex)
      fc.double({ min: -36000, max: 36000, noNaN: true }),
    ])('should generate a valid SVG path string', (radius, angle) => {
      const path = calculateSweepPath(radius, angle)

      // Structure check: "M 0 0 L <R> 0 A <R> <R> 0 0 1 <X> <Y> Z"
      expect(path).toMatch(
        /^M 0 0 L -?\d+(\.\d+)?(e[-+]?\d+)? 0 A -?\d+(\.\d+)?(e[-+]?\d+)? -?\d+(\.\d+)?(e[-+]?\d+)? 0 0 1 -?\d+(\.\d+)?(e[-+]?\d+)? -?\d+(\.\d+)?(e[-+]?\d+)? Z$/
      )

      // Additional safety: shouldn't contain NaN strings
      expect(path).not.toContain('NaN')
      expect(path).not.toContain('Infinity')

      // Basic geometric consistency check (approximate)
      if (radius > 0) {
        // Parse end point X, Y roughly
        const parts = path.split(' ')
        // "M", "0", "0", "L", "R", "0", "A", "R", "R", "0", "0", "1", "X", "Y", "Z"
        // Indices:                  4           7    8                 12   13
        const endXPart = parts[12]
        const endYPart = parts[13]
        if (endXPart && endYPart) {
          const endX = parseFloat(endXPart)
          const endY = parseFloat(endYPart)

          // distance from origin should match radius roughly
          const dist = Math.sqrt(endX * endX + endY * endY)
          expect(dist).toBeCloseTo(radius, 4)
        }
      }
    })
  })
})
