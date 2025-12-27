import { type JSX, Suspense } from 'react'

import dynamic from 'next/dynamic'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { LazyLoad } from '@/components/common/lazy-load'
import { RadarLoadingSkeleton } from '@/components/common/radar-loading-skeleton'
import type { FCStrict } from '@/types/fc'
import type { Skill } from '@/types/skill'

// Dynamically import TechRadar to reduce initial DOM size
// eslint-disable-next-line @typescript-eslint/typedef
const TechRadar = dynamic(
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  () =>
    // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/explicit-function-return-type
    import('@/components/sections/tech-radar/tech-radar').then((module_) => ({
      default: module_.TechRadar,
    })),
  {
    loading: (): JSX.Element => <RadarLoadingSkeleton />,
  }
)

interface SkillsRadarProperties {
  readonly buildTools: readonly Skill[]
  readonly frameworks: readonly Skill[]
  readonly infrastructure: readonly Skill[]
  readonly languages: readonly Skill[]
  readonly locale: string
}

export const SkillsRadar: FCStrict<SkillsRadarProperties> = ({
  buildTools,
  frameworks,
  infrastructure,
  languages,
  locale,
}: SkillsRadarProperties): JSX.Element => (
  <BlueprintCard
    className="relative hidden h-full items-center justify-center lg:flex"
    label="RADAR_SCAN"
    noPadding={true}
  >
    {/* Tech Radar (Hidden on small mobile if needed, but keeping logic similar) */}
    <div className="h-full w-full">
      <LazyLoad className="h-full w-full">
        <Suspense fallback={<RadarLoadingSkeleton />}>
          <TechRadar
            buildTools={buildTools}
            frameworks={frameworks}
            infrastructure={infrastructure}
            languages={languages}
            locale={locale}
          />
        </Suspense>
      </LazyLoad>
    </div>
  </BlueprintCard>
)
