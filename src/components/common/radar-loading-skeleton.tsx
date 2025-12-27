import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

export const RadarLoadingSkeleton: FCStrict = (): JSX.Element => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-32 w-32 animate-pulse rounded-full bg-brand/10" />
  </div>
)
