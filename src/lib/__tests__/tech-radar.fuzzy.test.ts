import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  calculateSpringForce,
  calculateWallRepulsion,
} from '../tech-radar-utilities/physics-forces'
import { seededRandom, hashString } from '../tech-radar-utilities'

describe('Tech Radar fuzzy tests', () => {
  describe('utilities', () => {
    test.prop([fc.string()])(
      'hashString should be deterministic and non-negative',
      (input) => {
        const hash1 = hashString(input)
        const hash2 = hashString(input)
        expect(hash1).toBe(hash2)
        expect(hash1).toBeGreaterThanOrEqual(0)
        expect(Number.isInteger(hash1)).toBe(true)
      }
    )

    test.prop([fc.integer()])(
      'seededRandom should return value between 0 and 1',
      (seed) => {
        const val = seededRandom(seed)
        expect(val).toBeGreaterThanOrEqual(0)
        expect(val).toBeLessThan(1)
      }
    )
  })

  describe('physics', () => {
    test.prop([
      fc.record(
        {
          xCoordinate: fc.double({ min: -1e6, max: 1e6, noNaN: true }),
          yCoordinate: fc.double({ min: -1e6, max: 1e6, noNaN: true }),
          angle: fc.double({ noNaN: true }),
          radius: fc.double({ min: 0, max: 1e6, noNaN: true }),
          vx: fc.double(),
          vy: fc.double(),
        },
        { requiredKeys: ['xCoordinate', 'yCoordinate'] }
      ),
      fc.double({ min: -1e6, max: 1e6, noNaN: true }),
    ])(
      'calculateSpringForce should return finite forces',
      (blip, targetRadius) => {
        const result = calculateSpringForce(blip as any, targetRadius)
        expect(Number.isFinite(result.forceX)).toBe(true)
        expect(Number.isFinite(result.forceY)).toBe(true)
      }
    )

    test.prop([
      fc.record(
        {
          xCoordinate: fc.double({ min: -1e6, max: 1e6, noNaN: true }),
          yCoordinate: fc.double({ min: -1e6, max: 1e6, noNaN: true }),
          angle: fc.double({ noNaN: true }),
          radius: fc.double({ min: 0, max: 1e6, noNaN: true }),
          vx: fc.double(),
          vy: fc.double(),
        },
        { requiredKeys: ['xCoordinate', 'yCoordinate'] }
      ),
      fc.double({ noNaN: true }),
      fc.double({ noNaN: true }),
    ])(
      'calculateWallRepulsion should return finite forces',
      (blip, startAngle, endAngle) => {
        const result = calculateWallRepulsion({
          blip: blip as any,
          startAngle,
          endAngle,
        })
        expect(Number.isFinite(result.forceX)).toBe(true)
        expect(Number.isFinite(result.forceY)).toBe(true)
      }
    )
  })
})
