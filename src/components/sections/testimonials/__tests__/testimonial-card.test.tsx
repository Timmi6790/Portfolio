import type { ComponentProps, JSX } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TestimonialCard, type TestimonialItem } from '../testimonial-card'

/* eslint-disable react/jsx-no-literals */
/* eslint-disable next/no-img-element */

// Mock next/image to behave like a simple img
vi.mock('next/image', (): any => ({
  default: (properties: ComponentProps<'img'>): JSX.Element => (
    <img alt="mock" {...properties} />
  ),
}))

// Mock lucide-react
vi.mock('lucide-react', (): any => ({
  Quote: (): JSX.Element => <div data-testid="quote-icon">Quote</div>,
}))

describe('TestimonialCard', (): void => {
  const mockItem: TestimonialItem = {
    company: 'Tech Corp',
    image: '/avatar.jpg',
    name: 'John Doe',
    quote: 'Great service!',
    role: 'Engineer',
  }

  it('renders all fields correctly', (): void => {
    render(<TestimonialCard item={mockItem} />)

    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('Engineer')).toBeDefined()
    expect(screen.getByText('Tech Corp')).toBeDefined()
    const quote: HTMLElement = screen.getByText(/“Great service!”/)
    expect(quote).toHaveClass('italic', 'text-blueprint-muted', 'font-sans')
    expect(quote).toHaveTextContent(`“${mockItem.quote}”`)
    expect(screen.getByTestId('quote-icon')).toBeDefined()
  })

  it('renders image with correct alt text', (): void => {
    render(<TestimonialCard item={mockItem} />)
    const img: HTMLElement = screen.getByRole('img', {
      name: 'John Doe avatar',
    })
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toBe('/avatar.jpg')
  })

  it('uses placeholder if image is empty string', (): void => {
    const itemWithoutImage: TestimonialItem = { ...mockItem, image: '' }
    render(<TestimonialCard item={itemWithoutImage} />)
    const img: HTMLElement = screen.getByRole('img', {
      name: 'John Doe avatar',
    })
    expect(img.getAttribute('src')).toBe('/placeholder.svg')
  })
})
