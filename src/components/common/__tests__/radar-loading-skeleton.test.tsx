import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RadarLoadingSkeleton } from '@/components/common/radar-loading-skeleton'

describe('RadarLoadingSkeleton', () => {
  it('renders loading skeleton', () => {
    const { container } = render(<RadarLoadingSkeleton />)
    const wrapper = container.querySelector('div')

    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass(
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center'
    )
  })

  it('renders pulsing circle', () => {
    const { container } = render(<RadarLoadingSkeleton />)
    const wrapper = container.firstChild as HTMLElement
    const circle = wrapper.firstChild as HTMLElement

    expect(circle).toBeInTheDocument()
    expect(circle).toHaveClass(
      'h-32',
      'w-32',
      'animate-pulse',
      'rounded-full',
      'bg-brand/10'
    )
  })

  it('has correct structure', () => {
    const { container } = render(<RadarLoadingSkeleton />)

    // Check wrapper div
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('flex', 'h-full', 'w-full')

    // Check inner circle div
    const circle = wrapper.firstChild as HTMLElement
    expect(circle).toHaveClass('animate-pulse', 'rounded-full')
  })
})
