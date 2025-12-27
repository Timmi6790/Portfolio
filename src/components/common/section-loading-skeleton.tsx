import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

interface SectionLoadingSkeletonProperties {
  readonly minHeight?: string
}

export const SectionLoadingSkeleton: FCStrict<
  SectionLoadingSkeletonProperties
> = ({ minHeight = '60vh' }: SectionLoadingSkeletonProperties): JSX.Element => (
  <div
    className="w-full animate-pulse bg-blueprint-card-bg/50"
    style={{ minHeight }}
  />
)
