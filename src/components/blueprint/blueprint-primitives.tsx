import { type ElementType, type JSX, type ReactNode } from 'react'

import type { FCStrict, FCWithRequiredChildren } from '@/types/fc'

interface BlueprintSectionWrapperProperties {
  readonly children: ReactNode
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

interface BlueprintHeadingProperties {
  readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined
  readonly children: ReactNode
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

interface BlueprintSubheadingProperties {
  readonly children: ReactNode
  readonly className?: string
}

export const BlueprintSubheading: FCWithRequiredChildren<
  BlueprintSubheadingProperties
> = ({ children, className }: BlueprintSubheadingProperties): JSX.Element => (
  <span
    className={`mb-2 block font-mono text-xl tracking-[0.3em] text-brand uppercase sm:text-2xl ${className ?? ''}`}
  >
    {children}
  </span>
)

interface BlueprintLabelTextProperties {
  readonly children: ReactNode
  readonly className?: string
}

export const BlueprintLabelText: FCWithRequiredChildren<
  BlueprintLabelTextProperties
> = ({ children, className }: BlueprintLabelTextProperties): JSX.Element => (
  <span
    className={`font-mono text-sm tracking-widest text-blueprint-muted uppercase ${className ?? ''}`}
  >
    {children}
  </span>
)

interface BlueprintTinyLabelProperties {
  readonly children: ReactNode
  readonly className?: string
}

export const BlueprintTinyLabel: FCWithRequiredChildren<
  BlueprintTinyLabelProperties
> = ({ children, className }: BlueprintTinyLabelProperties): JSX.Element => (
  <div
    aria-hidden="true"
    className={`font-mono text-[10px] tracking-[0.2em] text-brand uppercase ${className ?? ''}`}
  >
    {children}
  </div>
)
