import { describe, expect, it } from 'vitest'

import { logger } from '../logger'

describe('Logger', () => {
  it('should be defined', () => {
    expect(logger).toBeDefined()
  })

  it('should have info method', () => {
    expect(logger.info).toBeDefined()
    expect(typeof logger.info).toBe('function')
  })

  it('should have error method', () => {
    expect(logger.error).toBeDefined()
    expect(typeof logger.error).toBe('function')
  })

  it('should have warn method', () => {
    expect(logger.warn).toBeDefined()
    expect(typeof logger.warn).toBe('function')
  })

  it('should have debug method', () => {
    expect(logger.debug).toBeDefined()
    expect(typeof logger.debug).toBe('function')
  })
})
