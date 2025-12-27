import { render } from '@testing-library/react'
import { type ComponentType } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { createLazySection } from '@/lib/create-lazy-section'

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  default: vi.fn((_loader, options) => {
    // Return a mock component that renders the loading state for testing
    const MockComponent = (_props: object) => {
      if (options?.loading) {
        return options.loading()
      }
      return <div data-testid="mock-component">Mock Component</div>
    }
    return MockComponent
  }),
}))

// Mock the SectionLoadingSkeleton
vi.mock('@/components/common/section-loading-skeleton', () => ({
  SectionLoadingSkeleton: ({ minHeight }: { readonly minHeight?: string }) => (
    <div data-testid="section-skeleton" data-min-height={minHeight ?? '60vh'}>
      Loading Skeleton
    </div>
  ),
}))

describe('createLazySection', () => {
  it('creates a lazy component with default loading skeleton', () => {
    const mockLoader = vi.fn(() =>
      Promise.resolve({ default: () => <div>Test</div> })
    )
    const LazyComponent: ComponentType = createLazySection(mockLoader)

    const { getByTestId } = render(<LazyComponent />)
    const skeleton = getByTestId('section-skeleton')

    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-min-height', '60vh')
  })

  it('creates a lazy component with custom minHeight', () => {
    const mockLoader = vi.fn(() =>
      Promise.resolve({ default: () => <div>Test</div> })
    )
    const LazyComponent: ComponentType = createLazySection(mockLoader, '40vh')

    const { getByTestId } = render(<LazyComponent />)
    const skeleton = getByTestId('section-skeleton')

    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-min-height', '40vh')
  })

  it('handles undefined minHeight correctly', () => {
    const mockLoader = vi.fn(() =>
      Promise.resolve({ default: () => <div>Test</div> })
    )
    const LazyComponent: ComponentType = createLazySection(
      mockLoader,
      undefined
    )

    const { getByTestId } = render(<LazyComponent />)
    const skeleton = getByTestId('section-skeleton')

    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-min-height', '60vh')
  })

  it('returns a ComponentType', () => {
    const mockLoader = vi.fn(() =>
      Promise.resolve({ default: () => <div>Test</div> })
    )
    const LazyComponent = createLazySection(mockLoader)

    expect(typeof LazyComponent).toBe('function')
  })
})
