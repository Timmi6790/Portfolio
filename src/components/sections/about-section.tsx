import { type JSX, type ReactNode } from 'react'

import { type Locale } from 'next-intl'

import { getTranslations } from 'next-intl/server'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintSection } from '@/components/blueprint/blueprint-section'
import type { AsyncPageFC, FCStrict } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

type AboutSectionProperties = LocalePageProperties

interface CompetencyBadgeProperties {
  readonly label: string
}

interface AboutTranslations {
  readonly competencies: readonly string[]
  readonly summary: ReactNode
  readonly translations: Translations<'about'>
}

const OPEN_BRACKET: string = '['
const CLOSE_BRACKET: string = ']'

const CompetencyBadge: FCStrict<CompetencyBadgeProperties> = ({
  label,
}: CompetencyBadgeProperties): JSX.Element => (
  <div className="group relative overflow-hidden px-4 py-2 font-mono text-xs tracking-widest text-brand uppercase transition-all hover:text-blueprint-text">
    <span className="relative z-10 flex items-center gap-2">
      <span className="text-brand/50">{OPEN_BRACKET}</span>
      {label}
      <span className="text-brand/50">{CLOSE_BRACKET}</span>
    </span>
    {/* Hover highlight */}
    <div className="absolute inset-0 bg-brand/10 opacity-0 transition-opacity group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 h-px w-full bg-brand/30" />
  </div>
)

async function getAboutTranslations(
  locale: Locale
): Promise<AboutTranslations> {
  const translations: Translations<'about'> = await getTranslations({
    locale,
    namespace: 'about',
  })

  // Technical highlighting
  const summary: ReactNode = translations.rich('summary', {
    highlight: (chunks: ReactNode): JSX.Element => (
      <span className="border-b border-brand/30 bg-brand/10 px-1 font-bold text-blueprint-text">
        {chunks}
      </span>
    ),
  })

  const competencies: readonly string[] = translations.raw(
    'competencies'
  ) as string[]

  return { competencies, summary, translations }
}

export const AboutSection: AsyncPageFC<AboutSectionProperties> = async ({
  locale,
}: AboutSectionProperties): Promise<JSX.Element> => {
  const { competencies, summary, translations }: AboutTranslations =
    await getAboutTranslations(locale)

  return (
    <BlueprintSection
      dividerLabel="BIO_DATA_END"
      id="about"
      isLazy={true}
      sectionLabel="// PROFILE_CORE"
      title={translations('title')}
    >
      <BlueprintCard className="mt-8" label="BIO_DATA_LOG">
        <div className="flex flex-col gap-12 text-center">
          {/* Summary Text */}
          <div className="font-mono text-sm leading-relaxed tracking-wide text-blueprint-muted md:text-base">
            {summary}
          </div>

          {/* Competencies */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="border border-brand/30 bg-brand/5 px-4 py-1 font-mono text-xs font-bold tracking-[0.2em] text-blueprint-text uppercase">
              {translations('competenciesLabel')}
            </h3>

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
    </BlueprintSection>
  )
}

export default AboutSection
