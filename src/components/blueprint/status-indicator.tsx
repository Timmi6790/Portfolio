import { type JSX, memo, type MemoExoticComponent } from 'react'

import { cn } from '@/lib/utilities'
import type { FCStrict } from '@/types/fc'

interface StatusIndicatorProperties {
  readonly className?: string
}

export const StatusIndicator: MemoExoticComponent<
  FCStrict<StatusIndicatorProperties>
> = memo(
  ({ className }: StatusIndicatorProperties): JSX.Element => (
    <div className={cn('animate-pulse rounded-full', className)} />
  )
)

StatusIndicator.displayName = 'StatusIndicator'
