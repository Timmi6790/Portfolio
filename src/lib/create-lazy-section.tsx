import { type ComponentType, type JSX } from 'react'

import dynamic, { type Loader } from 'next/dynamic'

import { SectionLoadingSkeleton } from '@/components/common/section-loading-skeleton'

/**
 * Creates a lazy-loaded section component with consistent loading behavior
 */
export function createLazySection<P = object>(
  loader: Loader<P>,
  minHeight?: string
): ComponentType<P> {
  // Next.js requires options to be object literals, so we conditionally create them inline
  if (minHeight !== undefined) {
    return dynamic(loader, {
      loading: (): JSX.Element => (
        <SectionLoadingSkeleton minHeight={minHeight} />
      ),
    })
  }

  return dynamic(loader, {
    loading: (): JSX.Element => <SectionLoadingSkeleton />,
  })
}
