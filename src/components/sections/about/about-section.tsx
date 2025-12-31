import { type JSX, type ReactNode } from 'react'

import { type Locale } from 'next-intl'

import { getTranslations } from 'next-intl/server'

import { BlueprintSection } from '@/components/blueprint/blueprint-section'
import { AboutBio } from '@/components/sections/about/about-bio'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

type AboutSectionProperties = LocalePageProperties

interface AboutTranslations {
  readonly competencies: readonly string[]
  readonly summary: ReactNode
  readonly translations: Translations<'about'>
}

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
      lazyRootMargin="600px"
      sectionLabel="// PROFILE_CORE"
      title={translations('title')}
    >
      <AboutBio
        competencies={competencies}
        summary={summary}
        translations={translations}
      />
    </BlueprintSection>
  )
}

export default AboutSection
