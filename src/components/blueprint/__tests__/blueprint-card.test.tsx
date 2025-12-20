import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BlueprintCard } from '../blueprint-card'

describe('BlueprintCard', () => {
  it('renders children correctly', () => {
    render(<BlueprintCard>Test Content</BlueprintCard>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders the label when provided', () => {
    render(<BlueprintCard label="TEST_LABEL">Test Content</BlueprintCard>)
    expect(screen.getByText('TEST_LABEL')).toBeInTheDocument()
  })

  it('applies padding by default', () => {
    const { container } = render(<BlueprintCard>Test Content</BlueprintCard>)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toHaveClass('p-8')
  })

  it('removes padding when noPadding is true', () => {
    const { container } = render(
      <BlueprintCard noPadding={true}>Test Content</BlueprintCard>
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).not.toHaveClass('p-8')
  })

  it('applies custom className', () => {
    const { container } = render(
      <BlueprintCard className="custom-class">Test Content</BlueprintCard>
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
