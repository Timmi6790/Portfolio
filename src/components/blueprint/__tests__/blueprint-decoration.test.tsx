// @vitest-environment happy-dom
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  BlueprintCorners,
  BlueprintSideDecoration,
} from '@/components/blueprint/blueprint-decoration'

describe('BlueprintCorners', () => {
  it('renders correctly with default variant "all"', () => {
    const { container } = render(<BlueprintCorners />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    // 4 paths for 4 corners (nested SVGs or main paths)
    // My implementation has 1 top-left path, + 3 nested SVGs with 1 path each = 4 paths total?
    // Let's verify the implementation logic:
    // All paths have className="stroke-brand"
    expect(container.querySelectorAll('.stroke-brand')).toHaveLength(4)
  })

  it('renders correctly with variant "bracket"', () => {
    const { container } = render(<BlueprintCorners variant="bracket" />)
    // Bracket has Top-Left (1 path) and Bottom-Right (1 path in nested SVG)
    expect(container.querySelectorAll('.stroke-brand')).toHaveLength(2)
  })

  it('renders correctly with variant "lines"', () => {
    const { container } = render(<BlueprintCorners variant="lines" />)
    // 4 line elements
    expect(container.querySelectorAll('line')).toHaveLength(4)
  })

  it('accepts custom strokeWidth', () => {
    const { container } = render(
      <BlueprintCorners strokeWidth={5} variant="lines" />
    )
    // Querying the first line to check stroke-width
    const line = container.querySelector('line')
    expect(line).toHaveAttribute('stroke-width', '5')
  })

  it('accepts custom className', () => {
    const { container } = render(<BlueprintCorners className="test-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('test-class')
  })
})

describe('BlueprintSideDecoration', () => {
  it('renders vertical orientation by default', () => {
    const { container } = render(<BlueprintSideDecoration />)
    const decoration = container.querySelector('svg')
    expect(decoration).toBeInTheDocument()
    expect(decoration).toHaveClass('h-16 w-1')
  })

  it('renders horizontal orientation', () => {
    const { container } = render(
      <BlueprintSideDecoration orientation="horizontal" />
    )
    const decoration = container.querySelector('svg')
    expect(decoration).toHaveClass('h-1 w-16')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <BlueprintSideDecoration className="test-class" />
    )
    const decoration = container.querySelector('svg')
    expect(decoration).toHaveClass('test-class')
  })
})
