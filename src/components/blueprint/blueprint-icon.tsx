import { type JSX } from 'react'

import { cn } from '@/lib/utilities'
import type { FCStrict } from '@/types/fc'

import type { LucideIcon } from 'lucide-react'

interface BlueprintIconProperties {
  readonly className?: string
  readonly icon: LucideIcon
}

export const BlueprintIcon: FCStrict<BlueprintIconProperties> = ({
  className,
  icon,
}: BlueprintIconProperties): JSX.Element => {
  const Icon: LucideIcon = icon
  return <Icon className={cn('h-5 w-5 text-brand', className)} />
}
