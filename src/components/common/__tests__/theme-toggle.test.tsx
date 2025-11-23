import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

// Hoisted state so the mock can read/write it without module augmentation.
const { getTheme, setTheme, setThemeSpy } = vi.hoisted(() => {
  let theme: 'light' | 'dark' = 'light'
  const setThemeSpy = vi.fn<(t: 'light' | 'dark') => void>()
  return {
    getTheme: () => theme,
    setTheme: (t: 'light' | 'dark') => {
      theme = t
    },
    setThemeSpy,
  }
})

// Mock your theme provider: no redeclarations, no module augmentation.
vi.mock('@/components/common/theme-provider', () => {
  return {
    useTheme: () => ({ theme: getTheme(), setTheme: setThemeSpy }),
  }
})

// Mock the shadcn Button as a plain button that forwards props.
vi.mock('@/components/ui/button', () => {
  return {
    Button: (
      props: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }
    ) => <button {...props}>{props.children}</button>,
  }
})

// Import AFTER mocks so the component resolves mocked modules.
import { ThemeToggle } from '../theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    setTheme('light')
    setThemeSpy.mockClear()
  })

  it('renders with the correct aria-label', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: 'Toggle theme' })
    expect(button).toBeTruthy()
    expect(button.getAttribute('aria-label')).toBe('Toggle theme')
  })

  it('click toggles light → dark', () => {
    setTheme('light')
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))
    expect(setThemeSpy).toHaveBeenCalledTimes(1)
    expect(setThemeSpy).toHaveBeenLastCalledWith('dark')
  })

  it('click toggles dark → light', () => {
    setTheme('dark')
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))
    expect(setThemeSpy).toHaveBeenCalledTimes(1)
    expect(setThemeSpy).toHaveBeenLastCalledWith('light')
  })
})
