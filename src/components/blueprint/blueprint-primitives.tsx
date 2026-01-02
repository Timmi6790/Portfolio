import { type ElementType, type JSX } from 'react'

import { BlueprintText } from '@/components/blueprint/blueprint-text'
import { cn } from '@/lib/utilities'
import type {
  FCStrict,
  FCWithRequiredChildren,
  WithRequiredChildren,
} from '@/types/fc'

interface BlueprintSectionWrapperProperties extends WithRequiredChildren {
  readonly className?: string | undefined
  readonly componentId?: string | undefined
  readonly isLazy?: boolean
}

export const BlueprintSectionWrapper: FCWithRequiredChildren<
  BlueprintSectionWrapperProperties
> = ({
  children,
  className,
  componentId,
  isLazy,
}: BlueprintSectionWrapperProperties): JSX.Element => (
  <section
    className={`relative flex min-h-screen w-full snap-start flex-col items-center justify-center overflow-hidden bg-blueprint-bg py-24 text-blueprint-text ${
      isLazy === true ? 'cv-section' : ''
    } ${className ?? ''}`}
    id={componentId}
  >
    {children}
  </section>
)

interface BlueprintCardBackgroundProperties {
  readonly className?: string
}

export const BlueprintCardBackground: FCStrict<
  BlueprintCardBackgroundProperties
> = ({ className }: BlueprintCardBackgroundProperties): JSX.Element => (
  <div
    className={`absolute inset-0 border border-brand/20 bg-blueprint-card-bg/90 backdrop-blur-md transition-colors ${className ?? ''}`}
  />
)

interface BlueprintHeadingProperties extends WithRequiredChildren {
  readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined
  readonly className?: string
}

export const BlueprintHeading: FCWithRequiredChildren<
  BlueprintHeadingProperties
> = ({
  as: headingAs = 'h2',
  children,
  className,
}: BlueprintHeadingProperties): JSX.Element => {
  const Component: ElementType = headingAs

  return (
    <Component
      className={`[text-shadow:0_0_15px_color-mix(in srgb, var(--brand), transparent 70%)] font-mono text-4xl font-bold tracking-tighter text-blueprint-text sm:text-6xl ${className ?? ''}`}
    >
      {children}
    </Component>
  )
}

interface BlueprintSubheadingProperties extends WithRequiredChildren {
  readonly className?: string
}

export const BlueprintSubheading: FCWithRequiredChildren<
  BlueprintSubheadingProperties
> = ({ children, className }: BlueprintSubheadingProperties): JSX.Element => (
  <BlueprintText
    as="h3"
    className={cn('text-sm font-bold text-brand', className)}
    uppercase={true}
    variant="brand"
  >
    {children}
  </BlueprintText>
)

interface BlueprintLabelTextProperties extends WithRequiredChildren {
  readonly className?: string
}

export const BlueprintLabelText: FCWithRequiredChildren<
  BlueprintLabelTextProperties
> = ({ children, className }: BlueprintLabelTextProperties): JSX.Element => (
  <BlueprintText
    as="span"
    className={cn('text-xs font-bold text-blueprint-text', className)}
    uppercase={true}
  >
    {children}
  </BlueprintText>
)

interface BlueprintTinyLabelProperties extends WithRequiredChildren {
  readonly className?: string
}

export const BlueprintTinyLabel: FCWithRequiredChildren<
  BlueprintTinyLabelProperties
> = ({ children, className }: BlueprintTinyLabelProperties): JSX.Element => (
  <BlueprintText
    as="span"
    className={cn('text-[10px] text-blueprint-muted', className)}
    uppercase={true}
    variant="muted"
  >
    {children}
  </BlueprintText>
)
