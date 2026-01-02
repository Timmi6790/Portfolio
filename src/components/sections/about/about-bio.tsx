import { type JSX, type ReactNode } from 'react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintText } from '@/components/blueprint/blueprint-text'
import { CompetencyBadge } from '@/components/sections/about/competency-badge'
import type { FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'

interface AboutBioProperties {
  readonly competencies: readonly string[]
  readonly summary: ReactNode
  readonly translations: Translations<'about'>
}

export const AboutBio: FCStrict<AboutBioProperties> = ({
  competencies,
  summary,
  translations,
}: AboutBioProperties): JSX.Element => (
  <BlueprintCard className="mt-8" label="BIO_DATA_LOG">
    <div className="flex flex-col gap-12 text-center">
      {/* Summary Text */}
      <div className="font-mono text-sm leading-relaxed tracking-wide text-blueprint-muted md:text-base">
        {summary}
      </div>

      {/* Competencies */}
      <div className="flex flex-col items-center gap-6">
        <BlueprintText
          as="h3"
          className="border border-brand/30 bg-brand/5 px-4 py-1 text-xs font-bold text-blueprint-text"
          uppercase={true}
        >
          {translations('competenciesLabel')}
        </BlueprintText>

        <div className="flex max-w-3xl flex-wrap justify-center gap-2">
          {competencies.map(
            (competency: string): JSX.Element => (
              <CompetencyBadge key={competency} label={competency} />
            )
          )}
        </div>
      </div>
    </div>
  </BlueprintCard>
)
