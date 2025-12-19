import { type JSX, type ReactNode } from 'react'

import type { FCWithRequiredChildren } from '@/types/fc'

import { BlueprintLabel } from './blueprint-label'
import { BlueprintCardBackground } from './blueprint-primitives'
import { MeasurementLine } from './measurement-line'

interface BlueprintCardProperties {
  readonly children: ReactNode
  readonly className?: string
  readonly label?: string
  readonly noPadding?: boolean
}

export const BlueprintCard: FCWithRequiredChildren<BlueprintCardProperties> = ({
  children,
  className,
  label,
  noPadding = false,
}: BlueprintCardProperties): JSX.Element => (
  <div
    className={`relative ${noPadding ? '' : 'p-8 md:p-12'} w-full ${className ?? ''}`}
  >
    {/* Technical Frame for Content */}
    <BlueprintCardBackground />

    {/* Corner Markers */}
    <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-brand" />
    <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-brand" />
    <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-brand" />
    <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-brand" />

    {/* Side Decoration */}
    <div className="absolute top-12 left-0 h-16 w-1 bg-brand/40" />
    <div className="absolute right-0 bottom-12 h-16 w-1 bg-brand/40" />

    {Boolean(label) && (
      <BlueprintLabel className="absolute -top-3 left-[var(--app-padding)] border border-brand/30 bg-blueprint-bg px-2 font-mono text-xs tracking-widest text-brand uppercase">
        {label}
      </BlueprintLabel>
    )}

    <div className="relative z-10 flex h-full flex-col gap-8">{children}</div>

    {/* Bottom Measurement */}
    <MeasurementLine className="bottom-4 left-0 opacity-30" width="100%" />
  </div>
)
