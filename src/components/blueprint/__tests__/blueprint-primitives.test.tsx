import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  BlueprintCardBackground,
  BlueprintHeading,
  BlueprintLabelText,
  BlueprintSectionWrapper,
  BlueprintSubheading,
  BlueprintTinyLabel,
} from '../blueprint-primitives'

describe('BlueprintPrimitives', () => {
  describe('BlueprintSectionWrapper', () => {
    it('renders children correctly', () => {
      render(
        <BlueprintSectionWrapper>
          <div>Content</div>
        </BlueprintSectionWrapper>
      )
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <BlueprintSectionWrapper className="custom">
          Content
        </BlueprintSectionWrapper>
      )
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector('section')).toHaveClass('custom')
    })
  })

  describe('BlueprintCardBackground', () => {
    it('renders correctly', () => {
      const { container } = render(<BlueprintCardBackground />)
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.firstChild).toHaveClass('absolute')
    })
  })

  describe('BlueprintHeading', () => {
    it('renders as h2 by default', () => {
      const { container } = render(<BlueprintHeading>Title</BlueprintHeading>)
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector('h2')).toBeInTheDocument()
    })

    it('renders as specified element', () => {
      const { container } = render(
        <BlueprintHeading as="h1">Title</BlueprintHeading>
      )
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector('h1')).toBeInTheDocument()
    })
  })

  describe('BlueprintSubheading', () => {
    it('renders children', () => {
      render(<BlueprintSubheading>Subtitle</BlueprintSubheading>)
      expect(screen.getByText('Subtitle')).toBeInTheDocument()
    })
  })

  describe('BlueprintLabelText', () => {
    it('renders children', () => {
      render(<BlueprintLabelText>Label</BlueprintLabelText>)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })
  })

  describe('BlueprintTinyLabel', () => {
    it('renders children', () => {
      render(<BlueprintTinyLabel>Tiny</BlueprintTinyLabel>)
      expect(screen.getByText('Tiny')).toBeInTheDocument()
    })
  })
})
