import { test, fc } from '@fast-check/vitest'
import { describe, expect, vi } from 'vitest'

import { handlePaletteKey } from '../key-handlers'
import * as actions from '../../utils/actions'

// Mock dependencies
vi.mock('../../utils/actions', () => ({
  createPushHandler: vi.fn(() => vi.fn()),
  createOnSelectSection: vi.fn(() => vi.fn()),
  openNewTab: vi.fn(),
  sendMailTo: vi.fn(),
}))

// Mock config to avoid import issues or side effects
vi.mock('@/data/config', () => ({
  siteConfig: {
    email: 'test@example.com',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
}))

describe('Key Handlers Fuzzy Tests', () => {
  // Helper to create mock deps
  const createDeps = () => ({
    locale: 'en' as const,
    pathname: '/',
    router: { push: vi.fn(), replace: vi.fn(), back: vi.fn() } as any,
    run: vi.fn(),
  })

  test.prop([fc.string({ minLength: 1, maxLength: 5 })])(
    'should handle any key input without crashing',
    (key) => {
      const deps = createDeps()
      const handleRequest = vi.fn()

      expect(() => {
        handlePaletteKey(key, deps, handleRequest)
      }).not.toThrow()
    }
  )

  test.prop([fc.constantFrom('A', 'C', 'K', 'P', 'X')])(
    'should handle Section keys correctly',
    (key) => {
      const deps = createDeps()
      const handleRequest = vi.fn()

      handlePaletteKey(key, deps, handleRequest)

      // Should successfully call handleRequest with an action
      expect(handleRequest).toHaveBeenCalled()
      expect(actions.createOnSelectSection).toHaveBeenCalled()
    }
  )

  test.prop([fc.constantFrom('H', 'I', 'D')])(
    'should handle Navigation keys correctly',
    (key) => {
      const deps = createDeps()
      const handleRequest = vi.fn()

      handlePaletteKey(key, deps, handleRequest)

      expect(handleRequest).toHaveBeenCalled()
      expect(actions.createPushHandler).toHaveBeenCalled()
    }
  )

  test.prop([fc.constantFrom('E', 'G', 'L')])(
    'should handle Action keys correctly',
    (key) => {
      const deps = createDeps()
      const handleRequest = vi.fn()

      // For actions, handleRequest is called with a wrapper that calls run
      handlePaletteKey(key, deps, handleRequest)

      expect(handleRequest).toHaveBeenCalled()
      // We can't easily check internal run calls without executing the action,
      // but we verified the mapping triggers handleRequest
    }
  )

  test.prop([
    // Keys that definitely don't exist
    fc
      .string()
      .filter(
        (k) =>
          !['A', 'C', 'K', 'P', 'X', 'H', 'I', 'D', 'E', 'G', 'L'].includes(k)
      ),
  ])('should ignore unknown keys', (key) => {
    const deps = createDeps()
    const handleRequest = vi.fn()

    // Clean mocks
    vi.clearAllMocks()

    handlePaletteKey(key, deps, handleRequest)

    expect(handleRequest).not.toHaveBeenCalled()
  })
})
