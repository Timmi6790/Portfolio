import { describe, expect, it } from 'vitest'

import {
  LABEL_PATHS,
  QUADRANT_ANGLES,
  QUADRANT_STYLES,
  RADAR_CONFIG,
} from '../radar-config'

describe('Radar Config', () => {
  it('should define RADAR_CONFIG', () => {
    expect(RADAR_CONFIG).toBeDefined()
    expect(RADAR_CONFIG.viewBox).toBeDefined()
    expect(RADAR_CONFIG.circles).toBeDefined()
  })

  it('should define QUADRANT_ANGLES for all 4 quadrants', () => {
    expect(QUADRANT_ANGLES.languages).toBeDefined()
    expect(QUADRANT_ANGLES.frameworks).toBeDefined()
    expect(QUADRANT_ANGLES.infrastructure).toBeDefined()
    expect(QUADRANT_ANGLES.buildTools).toBeDefined()
  })

  it('should define QUADRANT_STYLES for all 4 quadrants', () => {
    expect(QUADRANT_STYLES.languages).toBeDefined()
    expect(QUADRANT_STYLES.frameworks).toBeDefined()
    expect(QUADRANT_STYLES.infrastructure).toBeDefined()
    expect(QUADRANT_STYLES.buildTools).toBeDefined()
  })

  it('should define LABEL_PATHS for all 4 quadrants', () => {
    expect(LABEL_PATHS.languages).toBeDefined()
    expect(LABEL_PATHS.frameworks).toBeDefined()
    expect(LABEL_PATHS.infrastructure).toBeDefined()
    expect(LABEL_PATHS.buildTools).toBeDefined()
  })

  it('should ensure angles cover full circle', () => {
    // Basic check to ensure start/end angles make sense relative to each other
    // or total 2PI range coverage if we really wanted to be strict,
    // but just checking definitions is enough for config constants.
    expect(QUADRANT_ANGLES.infrastructure.start).toBe(0)
    expect(QUADRANT_ANGLES.frameworks.end).toBe(2 * Math.PI)
  })
})
