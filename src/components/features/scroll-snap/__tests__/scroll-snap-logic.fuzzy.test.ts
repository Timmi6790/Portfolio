import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  shouldSnapDown,
  shouldSnapUp,
  resolveOptions,
  type GeometrySnapshot,
  type ResolvedOptions,
} from '../scroll-snap-pair-controller'

// Helper to create a fake DOMRect
const createRect = (top: number, bottom: number): DOMRect => ({
  top,
  bottom,
  left: 0,
  right: 0,
  width: 0,
  height: bottom - top,
  x: 0,
  y: top,
  toJSON: () => {},
})

describe('Scroll Snap Logic Fuzzy Tests', () => {
  describe('resolveOptions', () => {
    test.prop([
      fc.record(
        {
          minDelta: fc.option(fc.double({ min: 0, noNaN: true })),
          snapTolerance: fc.option(fc.double({ min: 0, noNaN: true })),
          topZone: fc.option(fc.double({ min: 0, noNaN: true })),
        },
        {}
      ),
    ])('should always return defined values using defaults', (options) => {
      // Cast to match interface loosely or strictly
      const resolved = resolveOptions(options as any)

      expect(typeof resolved.minDelta).toBe('number')
      expect(typeof resolved.snapTolerance).toBe('number')
      expect(typeof resolved.topZone).toBe('number')

      // Defaults check
      if (options.minDelta === undefined) expect(resolved.minDelta).toBe(12)
      if (options.topZone === undefined) expect(resolved.topZone).toBe(64)
    })
  })

  describe('shouldSnapDown', () => {
    test.prop([
      fc.double({ noNaN: true }), // deltaY
      fc.record({
        topRectTop: fc.double({ noNaN: true, min: -1000, max: 1000 }),
        topRectBottom: fc.double({ noNaN: true, min: -1000, max: 1000 }),
        bottomRectTop: fc.double({ noNaN: true, min: -1000, max: 1000 }),
        bottomRectBottom: fc.double({ noNaN: true, min: -1000, max: 1000 }),
      }),
      fc.double({ min: 1, max: 500, noNaN: true }), // topZone
    ])(
      'should only snap down when geometry aligns and delta is positive',
      (deltaY, rects, topZone) => {
        const snapshot: GeometrySnapshot = {
          topRect: createRect(rects.topRectTop, rects.topRectBottom),
          bottomRect: createRect(rects.bottomRectTop, rects.bottomRectBottom),
          bottomSectionTopY: 0, // Unused by logic check
          topSectionTopY: 0, // Unused by logic check
        }

        const options: ResolvedOptions = {
          minDelta: 0,
          snapTolerance: 0,
          topZone,
        }

        const shouldSnap = shouldSnapDown(deltaY, snapshot, options)

        if (deltaY <= 0) {
          expect(shouldSnap).toBe(false)
        } else {
          // Reproduce logic:
          const topNearTop =
            rects.topRectTop >= -topZone && rects.topRectTop <= topZone
          const bottomBelow = rects.bottomRectTop > topZone

          if (shouldSnap) {
            expect(topNearTop).toBe(true)
            expect(bottomBelow).toBe(true)
          }
        }
      }
    )
  })

  describe('shouldSnapUp', () => {
    test.prop([
      fc.double({ noNaN: true }), // deltaY
      fc.record({
        topRectTop: fc.double({ noNaN: true, min: -1000, max: 1000 }),
        topRectBottom: fc.double({ noNaN: true, min: -1000, max: 1000 }),
        bottomRectTop: fc.double({ noNaN: true, min: -1000, max: 1000 }),
        bottomRectBottom: fc.double({ noNaN: true, min: -1000, max: 1000 }),
      }),
      fc.double({ min: 1, max: 500, noNaN: true }), // topZone
    ])(
      'should only snap up when geometry aligns and delta is negative',
      (deltaY, rects, topZone) => {
        const snapshot: GeometrySnapshot = {
          topRect: createRect(rects.topRectTop, rects.topRectBottom),
          bottomRect: createRect(rects.bottomRectTop, rects.bottomRectBottom),
          bottomSectionTopY: 0,
          topSectionTopY: 0,
        }

        const options: ResolvedOptions = {
          minDelta: 0,
          snapTolerance: 0,
          topZone,
        }

        const shouldSnap = shouldSnapUp(deltaY, snapshot, options)

        if (deltaY >= 0) {
          expect(shouldSnap).toBe(false)
        } else {
          // Reproduce logic:
          const bottomNearTop =
            rects.bottomRectTop >= -topZone && rects.bottomRectTop <= topZone
          const topAbove = rects.topRectBottom <= 0

          if (shouldSnap) {
            expect(bottomNearTop).toBe(true)
            expect(topAbove).toBe(true)
          }
        }
      }
    )
  })
})
