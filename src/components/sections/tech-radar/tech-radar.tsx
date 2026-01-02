'use server'

import { type JSX } from 'react'

import type { Locale } from 'next-intl'

import { getTranslations } from 'next-intl/server'

import {
  QUADRANT_ANGLES,
  RADAR_CONFIG,
} from '@/components/sections/tech-radar/config'
import { RadarBackground } from '@/components/sections/tech-radar/radar-background'
import { RadarDefs } from '@/components/sections/tech-radar/radar-defs'
import { RadarLabels } from '@/components/sections/tech-radar/radar-labels'
import TechRadarInteractive from '@/components/sections/tech-radar/tech-radar-interactive'
import { TechRadarTooltipLoader } from '@/components/sections/tech-radar/tech-radar-loader'
import { generateBlipsForCategory } from '@/lib/tech-radar-utilities/generators'
import type { AsyncPageFC } from '@/types/fc'
import type { Translations } from '@/types/i18n'
import { type Skill } from '@/types/skill'
import type {
  Blip,
  QuadrantAngleType,
  TechRadarQuadrant,
} from '@/types/tech-radar'

import { HoverProvider } from './hover-context'

interface TechRadarProperties {
  readonly buildTools: readonly Skill[]
  readonly frameworks: readonly Skill[]
  readonly infrastructure: readonly Skill[]
  readonly languages: readonly Skill[]
  readonly locale: Locale
}

// eslint-disable-next-line max-lines-per-function
export const TechRadar: AsyncPageFC<TechRadarProperties> = async ({
  buildTools,
  frameworks,
  infrastructure,
  languages,
  locale,
}: TechRadarProperties): Promise<JSX.Element> => {
  const translations: Translations<'skills'> = await getTranslations({
    locale,
    namespace: 'skills',
  })

  const quadrants: Record<TechRadarQuadrant, QuadrantAngleType> = {
    buildTools: QUADRANT_ANGLES.buildTools,
    frameworks: QUADRANT_ANGLES.frameworks,
    infrastructure: QUADRANT_ANGLES.infrastructure,
    languages: QUADRANT_ANGLES.languages,
  }

  const allBlips: Blip[] = [
    ...generateBlipsForCategory({
      config: quadrants.languages,
      items: languages,
      quadrantKey: 'languages',
    }),
    ...generateBlipsForCategory({
      config: quadrants.frameworks,
      items: frameworks,
      quadrantKey: 'frameworks',
    }),
    ...generateBlipsForCategory({
      config: quadrants.buildTools,
      items: buildTools,
      quadrantKey: 'buildTools',
    }),
    ...generateBlipsForCategory({
      config: quadrants.infrastructure,
      items: infrastructure,
      quadrantKey: 'infrastructure',
    }),
  ]

  const { animation, circles, labels, viewBox }: typeof RADAR_CONFIG =
    RADAR_CONFIG

  return (
    <HoverProvider>
      <div className="relative mx-auto flex h-full w-full items-center justify-center">
        <svg
          className="h-full w-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          style={{ contain: 'content' }}
          viewBox={`${String(viewBox.min)} ${String(viewBox.min)} ${String(viewBox.width)} ${String(viewBox.height)}`}
        >
          <RadarDefs circles={circles} />
          <RadarBackground
            animation={animation}
            circles={circles}
            viewBox={viewBox}
          />
          <RadarLabels labels={labels} translations={translations} />

          {/* Interactive blips - SSR'd for performance */}
          <TechRadarInteractive blips={allBlips} />
        </svg>

        {/* Tooltip - Lazy loaded client component */}
        <TechRadarTooltipLoader blips={allBlips} />

        {/* Center hub */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </HoverProvider>
  )
}
