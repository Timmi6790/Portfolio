'use client'

import React, { type JSX } from 'react'

import type { Blip } from '@/types/tech-radar'

import { TechRadarBlips } from './tech-radar-blips'

interface TechRadarInteractiveProperties {
  readonly blips: readonly Blip[]
}

/**
 * Client-side component for rendering interactive blips inside SVG
 */
export const TechRadarInteractive: React.FC<TechRadarInteractiveProperties> = ({
  blips,
}: TechRadarInteractiveProperties): JSX.Element => {
  return <TechRadarBlips blips={blips} />
}
