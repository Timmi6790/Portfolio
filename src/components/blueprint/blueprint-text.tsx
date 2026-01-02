import { type ElementType, type JSX } from 'react'

import { cn } from '@/lib/utilities'
import type { FCWithRequiredChildren, WithRequiredChildren } from '@/types/fc'

interface BlueprintTextProperties extends WithRequiredChildren {
  /** The element type to render (default: 'span'). */

  readonly as?: ElementType
  readonly className?: string
  readonly [key: string]: unknown
  /** Whether to force uppercase and wide tracking (default: false). */
  readonly uppercase?: boolean
  /** Visual variant of the text color/style. */
  readonly variant?: 'brand' | 'default' | 'muted'
}

type VariantType = NonNullable<BlueprintTextProperties['variant']>

const VARIANTS: Record<VariantType, string> = {
  brand: 'text-brand',
  default: 'text-blueprint-text',
  muted: 'text-blueprint-muted',
}

/**
 * Standardized typography component for the "Blueprint" aesthetic.
 * Base style is `font-mono`.
 * Use `uppercase` prop for `uppercase tracking-widest` (labels, buttons).
 */
export const BlueprintText: FCWithRequiredChildren<BlueprintTextProperties> = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  as = 'span',
  children,
  className,
  uppercase = false,
  variant = 'default',
  ...properties
}: BlueprintTextProperties): JSX.Element => {
  const Component: ElementType = as
  // eslint-disable-next-line security/detect-object-injection
  const variantClass: string = VARIANTS[variant]

  return (
    <Component
      className={cn(
        'font-mono',
        uppercase ? 'tracking-widest uppercase' : 'tracking-normal',
        variantClass,
        className
      )}
      {...properties}
    >
      {children}
    </Component>
  )
}
