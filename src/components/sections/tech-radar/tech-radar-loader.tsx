'use client'

import React, { type JSX } from 'react'

import dynamic from 'next/dynamic'

import type { TechRadarTooltipProperties } from '@/components/sections/tech-radar/tech-radar-tooltip'
import type { Blip } from '@/types/tech-radar'

const TechRadarTooltip: React.ComponentType<TechRadarTooltipProperties> =
  dynamic(
    async (): Promise<React.ComponentType<TechRadarTooltipProperties>> => {
      const module_: {
        default: React.ComponentType<TechRadarTooltipProperties>
      } = await import('./tech-radar-tooltip')
      return module_.default
    },
    {
      ssr: false,
    }
  )

interface TechRadarLoaderProperties {
  readonly blips: readonly Blip[]
}

export const TechRadarTooltipLoader: React.FC<TechRadarLoaderProperties> = ({
  blips,
}: TechRadarLoaderProperties): JSX.Element => <TechRadarTooltip blips={blips} />
