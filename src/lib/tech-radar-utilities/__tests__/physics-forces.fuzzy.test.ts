import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  calculateSpringForce,
  calculateWallRepulsion,
  calculateTangentForce,
  calculateBlipRepulsion,
} from '../physics-forces'
// import { RADAR_CONFIG } from '@/components/sections/tech-radar/config'

describe('Physics Forces Fuzzy Tests', () => {
  describe('calculateSpringForce', () => {
    test.prop([
      fc.record({
        xCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
        yCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
      }),
      fc.double({ min: 0, max: 1000, noNaN: true }), // targetRadius
    ])('should always return finite forces', (blip, targetRadius) => {
      // Cast to any to avoid complex type mocking, we know it needs x/y
      const result = calculateSpringForce(blip as any, targetRadius)

      expect(Number.isFinite(result.forceX)).toBe(true)
      expect(Number.isFinite(result.forceY)).toBe(true)
    })
  })

  describe('calculateWallRepulsion', () => {
    test.prop([
      fc.record({
        xCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
        yCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
      }),
      fc.double({ min: 0, max: Math.PI * 2 }), // startAngle
      fc.double({ min: 0, max: Math.PI * 2 }), // endAngle
    ])('should always return finite forces', (blip, startAngle, endAngle) => {
      const result = calculateWallRepulsion({
        blip: blip as any,
        startAngle,
        endAngle,
      })

      expect(Number.isFinite(result.forceX)).toBe(true)
      expect(Number.isFinite(result.forceY)).toBe(true)
    })
  })

  describe('calculateTangentForce', () => {
    test.prop([
      fc.record({
        xCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
        yCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
      }),
      fc.integer(), // blipIndex
      fc.double({ min: 0, max: 1, noNaN: true }), // temperature
    ])('should always return finite forces', (blip, blipIndex, temperature) => {
      const result = calculateTangentForce({
        blip: blip as any,
        blipIndex,
        temperature,
      })
      expect(Number.isFinite(result.forceX)).toBe(true)
      expect(Number.isFinite(result.forceY)).toBe(true)
    })
  })

  describe('calculateBlipRepulsion', () => {
    test.prop([
      fc.array(
        fc.record({
          xCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
          yCoordinate: fc.double({ min: -500, max: 500, noNaN: true }),
        }),
        { minLength: 1, maxLength: 10 }
      ),
      fc.integer({ min: 0, max: 9 }), // blipIndex (will clamp to array length)
      fc.double({ min: 1, max: 100, noNaN: true }), // minSeparation
    ])(
      'should always return finite forces and cap at max',
      (allBlips, rawIndex, minSeparation) => {
        const blipIndex = rawIndex % allBlips.length
        const blip = allBlips[blipIndex]

        const result = calculateBlipRepulsion({
          allBlips: allBlips as any[],
          blip: blip as any,
          blipIndex,
          minSeparation,
        })

        expect(Number.isFinite(result.forceX)).toBe(true)
        expect(Number.isFinite(result.forceY)).toBe(true)

        const maxPossibleForce = 5 * (allBlips.length - 1)
        // Allow small epsilon or accounting for zero-dist safety
        const forceMagnitude = Math.hypot(result.forceX, result.forceY)

        if (allBlips.length > 1) {
          // If there are other blips, force might be non-zero
        }

        expect(forceMagnitude).toBeLessThanOrEqual(maxPossibleForce + 0.1)
      }
    )
  })
})
