import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BlueprintSection } from '../blueprint-section'

describe('BlueprintSection', () => {
  it('renders title and children', () => {
    render(
      <BlueprintSection id="test" sectionLabel="LABEL" title="Section Title">
        <p>Content</p>
      </BlueprintSection>
    )

    expect(screen.getByText(/Section Title/i)).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders divider when label provided', () => {
    const { container } = render(
      <BlueprintSection
        dividerLabel="DIVIDER"
        id="test"
        sectionLabel="LABEL"
        title="Title"
      >
        Content
      </BlueprintSection>
    )
    expect(container.textContent).toContain('DIVIDER')
  })
})
