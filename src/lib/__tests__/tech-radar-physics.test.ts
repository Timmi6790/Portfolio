import {
  calculateBlipPosition,
  resolveBlipCollisions,
} from '@/lib/tech-radar-utilities'
import { RADAR_CONFIG } from '@/lib/radar-config'
import { describe, it, expect } from 'vitest'

describe('Tech Radar Physics Regressions', () => {
  const startAngle = 0
  const endAngle = Math.PI / 2

  it('should position high confidence blips (0.95) within the inner circle', () => {
    const highConfidence = 0.95
    const result = calculateBlipPosition({
      confidence: highConfidence,
      endAngle,
      index: 0,
      skillName: 'Java',
      startAngle,
      total: 1,
    })

    // Expected radius calculation:
    // minRadius + (1 - confidence) * (maxRadius - minRadius)
    // 40 + (1 - 0.95) * (170 - 40) = 40 + 0.05 * 130 = 40 + 6.5 = 46.5
    const expectedRadius =
      RADAR_CONFIG.blips.minRadius +
      (1 - highConfidence) *
        (RADAR_CONFIG.blips.maxRadius - RADAR_CONFIG.blips.minRadius)

    // Allow for jitter (+/- 1)
    expect(result.radius).toBeGreaterThanOrEqual(
      expectedRadius - RADAR_CONFIG.jitter.radius
    )
    expect(result.radius).toBeLessThanOrEqual(
      expectedRadius + RADAR_CONFIG.jitter.radius
    )

    // Crucially, it must be well within the inner circle (80)
    expect(result.radius).toBeLessThan(RADAR_CONFIG.circles.inner)
    // And it should be relatively close to the minRadius for high confidence
    expect(result.radius).toBeLessThan(RADAR_CONFIG.circles.inner * 0.7)
  })

  it('should keep high confidence blips close to center even after physics simulation', () => {
    // Create a high confidence blip (Java-like)
    const highConfBlip = calculateBlipPosition({
      confidence: 0.95,
      endAngle,
      index: 0,
      skillName: 'Java',
      startAngle,
      total: 1,
    })

    // Create some neighbors that might push it
    const neighbors = [
      calculateBlipPosition({
        confidence: 0.85, // SQL-like
        endAngle,
        index: 1,
        skillName: 'SQL',
        startAngle,
        total: 2,
      }),
      calculateBlipPosition({
        confidence: 0.8,
        endAngle,
        index: 2,
        skillName: 'Other',
        startAngle,
        total: 3,
      }),
    ]

    const blips = [highConfBlip, ...neighbors]

    const resolved = resolveBlipCollisions({ blips, startAngle, endAngle })
    const resolvedJava = resolved[0]

    expect(resolvedJava).toBeDefined()
    if (!resolvedJava) return

    // Calculate final radius
    const finalRadius = Math.hypot(
      resolvedJava.xCoordinate,
      resolvedJava.yCoordinate
    )

    // It should still be within the inner circle
    expect(finalRadius).toBeLessThan(RADAR_CONFIG.circles.inner)

    // And it should not have drifted too far from its target (~46.5)
    // Allow some drift due to repulsion (e.g., up to 60)
    expect(finalRadius).toBeLessThan(60)
  })

  it('should strictly enforce minRadius', () => {
    // Create a blip with 1.0 confidence (should be at minRadius)
    const perfectBlip = calculateBlipPosition({
      confidence: 1.0,
      endAngle,
      index: 0,
      skillName: 'Perfect',
      startAngle,
      total: 1,
    })

    const resolved = resolveBlipCollisions({
      blips: [perfectBlip],
      startAngle,
      endAngle,
    })
    const result = resolved[0]
    expect(result).toBeDefined()
    if (!result) return

    const radius = Math.hypot(result.xCoordinate, result.yCoordinate)
    expect(radius).toBeGreaterThanOrEqual(RADAR_CONFIG.blips.minRadius)
  })
})
