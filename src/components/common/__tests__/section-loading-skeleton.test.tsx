import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SectionLoadingSkeleton } from '@/components/common/section-loading-skeleton'

describe('SectionLoadingSkeleton', () => {
  it('renders with default minHeight', () => {
    const { container } = render(<SectionLoadingSkeleton />)
    const skeleton = container.querySelector('div')

    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass(
      'w-full',
      'animate-pulse',
      'bg-blueprint-card-bg/50'
    )
    expect(skeleton).toHaveStyle({ minHeight: '60vh' })
  })

  it('renders with custom minHeight', () => {
    const { container } = render(<SectionLoadingSkeleton minHeight="40vh" />)
    const skeleton = container.querySelector('div')

    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveStyle({ minHeight: '40vh' })
  })

  it('has correct styling classes', () => {
    const { container } = render(<SectionLoadingSkeleton />)
    const skeleton = container.querySelector('div')

    expect(skeleton).toHaveClass('w-full')
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('bg-blueprint-card-bg/50')
  })
})
