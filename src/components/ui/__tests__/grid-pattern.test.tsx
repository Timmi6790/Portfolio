import { describe, expect, it } from 'vitest'

import { render } from '@testing-library/react'

import { GridPattern } from '../grid-pattern'

describe('GridPattern', () => {
  it('renders an svg element', () => {
    const { container } = render(<GridPattern />)
    const pattern = container.firstChild as HTMLElement
    expect(pattern.tagName).toBe('svg')
  })

  it('applies base classes', () => {
    const { container } = render(<GridPattern />)
    const pattern = container.firstChild as HTMLElement
    expect(pattern.getAttribute('class')).toContain('absolute')
    expect(pattern.getAttribute('class')).toContain('inset-0')
    expect(pattern.getAttribute('class')).toContain('-z-10')
  })

  it('contains pattern definition', () => {
    const { container } = render(<GridPattern />)
    const defs = container.querySelector('defs')
    expect(defs).toBeInTheDocument()
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toBeInTheDocument()
  })

  it('uses default size of 32px when not specified', () => {
    const { container } = render(<GridPattern />)
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toHaveAttribute('width', '32')
    expect(patternElement).toHaveAttribute('height', '32')
  })

  it('uses custom size when provided', () => {
    const { container } = render(<GridPattern size={24} />)
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toHaveAttribute('width', '24')
    expect(patternElement).toHaveAttribute('height', '24')
  })

  it('uses default offset of 0 when not specified', () => {
    const { container } = render(<GridPattern />)
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toHaveAttribute('x', '0')
    expect(patternElement).toHaveAttribute('y', '0')
  })

  it('uses custom offsetX when provided', () => {
    const { container } = render(<GridPattern offsetX={10} />)
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toHaveAttribute('x', '10')
    expect(patternElement).toHaveAttribute('y', '0')
  })

  it('uses custom offsetY when provided', () => {
    const { container } = render(<GridPattern offsetY={20} />)
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toHaveAttribute('x', '0')
    expect(patternElement).toHaveAttribute('y', '20')
  })

  it('uses both custom offset values when provided', () => {
    const { container } = render(<GridPattern offsetX={10} offsetY={20} />)
    const patternElement = container.querySelector('pattern')
    expect(patternElement).toHaveAttribute('x', '10')
    expect(patternElement).toHaveAttribute('y', '20')
  })

  it('applies custom className when provided', () => {
    const { container } = render(<GridPattern className="custom-pattern" />)
    const pattern = container.firstChild as HTMLElement
    expect(pattern.getAttribute('class')).toContain('custom-pattern')
  })

  it('merges custom className with base classes', () => {
    const { container } = render(<GridPattern className="opacity-50" />)
    const pattern = container.firstChild as HTMLElement
    expect(pattern.getAttribute('class')).toContain('absolute')
    expect(pattern.getAttribute('class')).toContain('opacity-50')
  })
})
