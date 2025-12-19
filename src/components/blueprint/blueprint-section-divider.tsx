import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

interface BlueprintSectionDividerProperties {
  readonly label: string
}

const MARKER: string = '//'

export const BlueprintSectionDivider: FCStrict<
  BlueprintSectionDividerProperties
> = ({ label }: BlueprintSectionDividerProperties): JSX.Element => (
  <div className="mx-auto mt-16 w-full max-w-xs border-t border-[#4A90E2]/20 pt-8 text-center font-mono text-[10px] tracking-[0.3em] text-[#4A90E2]/40 uppercase">
    {MARKER} {label}
  </div>
)
