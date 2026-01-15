import { test, fc } from '@fast-check/vitest'
import { cleanup, renderHook, act } from '@testing-library/react'
import { afterEach, describe, expect, vi } from 'vitest'

import { HoverProvider, useHover } from '../hover-context'

describe('HoverContext Fuzzy Tests', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  test.prop([
    fc.option(fc.string(), { nil: null }),
    fc.option(fc.string(), { nil: null }),
  ])(
    'should handle setting hovered blip to any string or null',
    (firstBlip, secondBlip) => {
      cleanup()

      // We use renderHook to test the context hook wrapped in the provider
      const { result } = renderHook(() => useHover(), {
        wrapper: HoverProvider,
      })

      // Initial state should be null
      expect(result.current.hoveredBlip).toBeNull()

      // Update to first value
      act(() => {
        result.current.setHoveredBlip(firstBlip)
      })
      expect(result.current.hoveredBlip).toBe(firstBlip)

      // Update to second value
      act(() => {
        result.current.setHoveredBlip(secondBlip)
      })
      expect(result.current.hoveredBlip).toBe(secondBlip)
    }
  )

  test('should throw error when used outside provider', () => {
    cleanup()
    // Suppress console.error solely for this test as React logs the error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useHover())
    }).toThrow('useHover must be used within HoverProvider')

    spy.mockRestore()
  })
})
