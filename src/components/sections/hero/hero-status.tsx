import { type JSX } from 'react'

import { BlueprintLabel } from '@/components/blueprint/blueprint-label'
import { StatusIndicator } from '@/components/blueprint/status-indicator'
import type { FCStrict } from '@/types/fc'

const LOCATION_LABEL: string = 'LOCATION_VECTOR'
const MISSION_LABEL: string = 'CURRENT_MISSION'

interface HeroStatusProperties {
  readonly location: string
  readonly tagline: string
}

export const HeroStatus: FCStrict<HeroStatusProperties> = ({
  location,
  tagline,
}: HeroStatusProperties): JSX.Element => (
  <div className="mt-16 grid w-full max-w-5xl grid-cols-1 items-center gap-6 font-mono text-xs tracking-widest text-brand/80 uppercase sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
    {/* Detail Block A - Aligned to End (Right) of Left Column */}
    <div className="shadow-[0_0_10px_color-mix(in srgb, var(--brand), transparent 90%)] flex w-full flex-col gap-2 justify-self-center border-l-2 border-brand bg-brand/5 py-2 pl-4 text-left sm:max-w-[280px] sm:justify-self-end">
      <BlueprintLabel as="span" className="text-[10px] font-bold text-brand">
        {LOCATION_LABEL}
      </BlueprintLabel>
      <span className="text-sm font-bold text-blueprint-text">{location}</span>
    </div>

    <div className="mx-auto hidden h-8 w-8 shrink-0 rotate-45 items-center justify-center border border-brand bg-blueprint-bg sm:flex">
      <StatusIndicator className="h-3 w-3 bg-brand shadow-[0_0_8px_#60A5FA]" />
    </div>

    {/* Detail Block B - Aligned to Start (Left) of Right Column */}
    <div className="shadow-[0_0_10px_color-mix(in srgb, var(--brand), transparent 90%)] flex w-full flex-col gap-2 justify-self-center border-r-2 border-brand bg-brand/5 py-2 pr-4 text-right sm:max-w-[280px] sm:justify-self-start">
      <BlueprintLabel as="span" className="text-[10px] font-bold text-brand">
        {MISSION_LABEL}
      </BlueprintLabel>
      <span className="flex items-center justify-end gap-3 text-sm font-bold text-blueprint-text">
        {tagline}
      </span>
    </div>
  </div>
)
