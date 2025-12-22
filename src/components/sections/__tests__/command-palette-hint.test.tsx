import { render, screen, waitFor } from '@testing-library/react'
import { type JSX } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CommandPaletteHint } from '../command-palette-hint'

describe('CommandPaletteHint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with Cmd modifier on macOS using keyboard layout map', async () => {
    // Mock macOS user agent
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      writable: true,
    })

    // Mock Keyboard Layout Map API
    Object.defineProperty(window.navigator, 'keyboard', {
      configurable: true,
      value: {
        getLayoutMap: vi.fn().mockResolvedValue(
          new Map([
            ['MetaLeft', 'Cmd'],
            ['MetaRight', 'Cmd'],
          ])
        ),
      },
      writable: true,
    })

    const result: JSX.Element = (
      <CommandPaletteHint />
    ) as unknown as JSX.Element
    render(result)

    await waitFor(() => {
      const label: HTMLElement = screen.getByText('Cmd+K')
      expect(label).toBeDefined()
    })
  })

  it('renders with Strg modifier on German Windows keyboard', async () => {
    // Mock Windows user agent
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      writable: true,
    })

    // Mock German keyboard layout
    Object.defineProperty(window.navigator, 'keyboard', {
      configurable: true,
      value: {
        getLayoutMap: vi.fn().mockResolvedValue(
          new Map([
            ['ControlLeft', 'Strg'],
            ['ControlRight', 'Strg'],
          ])
        ),
      },
      writable: true,
    })

    const result: JSX.Element = (
      <CommandPaletteHint />
    ) as unknown as JSX.Element
    render(result)

    await waitFor(() => {
      const label: HTMLElement = screen.getByText('Strg+K')
      expect(label).toBeDefined()
    })
  })

  it('renders with Ctrl modifier on English Windows keyboard', async () => {
    // Mock Windows user agent
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      writable: true,
    })

    // Mock English keyboard layout
    Object.defineProperty(window.navigator, 'keyboard', {
      configurable: true,
      value: {
        getLayoutMap: vi.fn().mockResolvedValue(
          new Map([
            ['ControlLeft', 'Ctrl'],
            ['ControlRight', 'Ctrl'],
          ])
        ),
      },
      writable: true,
    })

    const result: JSX.Element = (
      <CommandPaletteHint />
    ) as unknown as JSX.Element
    render(result)

    await waitFor(() => {
      const label: HTMLElement = screen.getByText('Ctrl+K')
      expect(label).toBeDefined()
    })
  })

  it('returns null when keyboard API is not supported', () => {
    // Remove keyboard API support
    Object.defineProperty(window.navigator, 'keyboard', {
      configurable: true,
      value: undefined,
      writable: true,
    })

    const result: JSX.Element = (
      <CommandPaletteHint />
    ) as unknown as JSX.Element
    const { container } = render(result)

    // Should render nothing
    expect(container.firstChild).toBeNull()
  })

  it('returns null when keyboard API throws an error', async () => {
    // Mock keyboard API that throws
    Object.defineProperty(window.navigator, 'keyboard', {
      configurable: true,
      value: {
        getLayoutMap: vi.fn().mockRejectedValue(new Error('API error')),
      },
      writable: true,
    })

    const result: JSX.Element = (
      <CommandPaletteHint />
    ) as unknown as JSX.Element
    const { container } = render(result)

    await waitFor(() => {
      expect(container.firstChild).toBeNull()
    })
  })

  it('has correct styling classes when rendered', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      writable: true,
    })

    Object.defineProperty(window.navigator, 'keyboard', {
      configurable: true,
      value: {
        getLayoutMap: vi
          .fn()
          .mockResolvedValue(new Map([['ControlLeft', 'Ctrl']])),
      },
      writable: true,
    })

    const result: JSX.Element = (
      <CommandPaletteHint />
    ) as unknown as JSX.Element
    const { container } = render(result)

    await waitFor(() => {
      const label: Element | null = container.querySelector(
        '.writing-vertical-rl'
      )
      expect(label).toBeDefined()
      expect(label?.classList.contains('absolute')).toBe(true)
      expect(label?.classList.contains('bottom-20')).toBe(true)
      expect(label?.classList.contains('right-20')).toBe(true)
      expect(label?.classList.contains('font-mono')).toBe(true)
      expect(label?.classList.contains('select-none')).toBe(true)
    })
  })
})
