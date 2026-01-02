import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CARD_VARIANTS,
  CARD_DECORATIONS,
  CARD_HOVERS,
} from '@/components/ui/card'

describe('Card', () => {
  it('renders all subcomponents correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Card Content</CardContent>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('applies interactive variant classes', () => {
    render(<Card variant={CARD_VARIANTS.INTERACTIVE}>Interactive Card</Card>)
    const card = screen.getByText('Interactive Card').closest('div')
    expect(card).toHaveClass('group', 'relative', 'overflow-hidden')
  })

  it('applies premium variant classes', () => {
    render(<Card variant={CARD_VARIANTS.PREMIUM}>Premium Card</Card>)
    const card = screen.getByText('Premium Card').closest('div')
    expect(card).toHaveClass('backdrop-blur-sm')
  })

  it('applies decoration classes', () => {
    render(<Card decorative={CARD_DECORATIONS.PATTERN}>Pattern Card</Card>)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('opacity-50')
  })

  it('applies hover effect classes', () => {
    render(<Card hover={CARD_HOVERS.INTENSE}>Hover Card</Card>)
    const card = screen.getByText('Hover Card').closest('div')
    expect(card).toHaveClass('hover:scale-105', 'hover:shadow-2xl')
  })

  it('merges custom verify classes', () => {
    render(<Card className="custom-class">Custom Class Card</Card>)
    const card = screen.getByText('Custom Class Card').closest('div')
    expect(card).toHaveClass('custom-class')
  })
})
