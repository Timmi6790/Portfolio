import { type JSX, type ReactNode } from 'react'

import type { FCStrict, FCWithRequiredChildren } from '@/types/fc'

import { BlueprintGrid } from './blueprint-grid'
import { BlueprintSectionWrapper } from './blueprint-primitives'

interface BlueprintContainerProperties {
  readonly children: ReactNode
  readonly className?: string
  readonly id?: string
  readonly overlay?: ReactNode
}

interface BlueprintRulerProperties {
  readonly className?: string
}

const RULER_PATH: string =
  'M0 0v8 M4 0v4 M8 0v4 M12 0v4 M16 0v4 M20 0v8 M24 0v4 M28 0v4 M32 0v4 M36 0v4 M40 0v8 M44 0v4 M48 0v4 M52 0v4 M56 0v4 M60 0v8 M64 0v4 M68 0v4 M72 0v4 M76 0v4 M80 0v8'

const BlueprintRuler: FCStrict<BlueprintRulerProperties> = ({
  className,
}: BlueprintRulerProperties): JSX.Element => (
  <svg
    aria-hidden="true"
    className={`absolute h-2 w-24 overflow-visible ${className ?? ''}`}
  >
    <path
      className="stroke-brand/40"
      d={RULER_PATH}
      fill="none"
      strokeWidth="1"
    />
  </svg>
)

export const BlueprintContainer: FCWithRequiredChildren<
  BlueprintContainerProperties & { readonly isLazy?: boolean }
> = ({
  children,
  className,
  id: componentId,
  isLazy = false, // Default to eager loading
  overlay,
}: BlueprintContainerProperties & {
  readonly isLazy?: boolean
}): JSX.Element => (
  <BlueprintSectionWrapper
    className={className ?? ''}
    componentId={componentId}
    isLazy={isLazy}
  >
    <BlueprintGrid />

    {/* Outer Frame with dimensions / ticks */}
    <div className="pointer-events-none absolute inset-[var(--app-padding)] border-[0.5px] border-brand/30 select-none">
      {/* Corner Ticks */}
      <div className="absolute top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 border-r border-brand" />
      <div className="absolute top-0 right-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 border-l border-brand" />
      <div className="absolute bottom-0 left-0 h-2 w-2 -translate-x-1/2 translate-y-1/2 border-r border-brand" />
      <div className="absolute right-0 bottom-0 h-2 w-2 translate-x-1/2 translate-y-1/2 border-l border-brand" />

      {/* Scale/Ruler markings on edges - SVG optimization to reduce DOM size */}
      <BlueprintRuler className="top-0 left-10" />
      <BlueprintRuler className="right-10 bottom-0 rotate-180" />
    </div>

    {/* Content */}
    <div className="relative z-10 container px-[var(--app-padding)]">
      {children}
    </div>

    {/* Overlay Elements (positioned relative to section) */}
    {overlay}
  </BlueprintSectionWrapper>
)
