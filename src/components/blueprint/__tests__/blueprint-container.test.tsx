import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BlueprintContainer } from '../blueprint-container'

describe('BlueprintContainer', () => {
  it('renders children correctly', () => {
    render(<BlueprintContainer>Test Content</BlueprintContainer>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies the correct id', () => {
    const { container } = render(
      <BlueprintContainer id="test-id">Test Content</BlueprintContainer>
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const section = container.querySelector('section')
    expect(section).toHaveAttribute('id', 'test-id')
  })

  it('renders overlay when provided', () => {
    render(
      <BlueprintContainer overlay={<div>Overlay Content</div>}>
        Test Content
      </BlueprintContainer>
    )
    expect(screen.getByText('Overlay Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <BlueprintContainer className="custom-class">
        Test Content
      </BlueprintContainer>
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })

  it('renders BlueprintGrid', () => {
    const { container } = render(
      <BlueprintContainer>Test Content</BlueprintContainer>
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('svg')).toBeInTheDocument() // Assuming BlueprintGrid renders an SVG or we check for specific grid class if known
  })
})
