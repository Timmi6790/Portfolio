import { type JSX } from 'react'

import { cn } from '@/lib/utilities'
import type { FCStrict } from '@/types/fc'

interface StatusIndicatorProperties {
  readonly className?: string
}

export const StatusIndicator: FCStrict<StatusIndicatorProperties> = ({
  className,
}: StatusIndicatorProperties): JSX.Element => (
  <div className={cn('animate-pulse rounded-full', className)} />
)
