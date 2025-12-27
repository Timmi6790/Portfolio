import { type JSX } from 'react'

import { getTranslations } from 'next-intl/server'

import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionDivider } from '@/components/blueprint/blueprint-section-divider'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { SkillsMatrix } from '@/components/sections/skills/skills-matrix'
import { SkillsRadar } from '@/components/sections/skills/skills-radar'
import { siteConfig } from '@/data/config'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'
import { type Skill } from '@/types/skill'

export type SkillsSectionProperties = LocalePageProperties

export const SkillsSection: AsyncPageFC<SkillsSectionProperties> = async ({
  locale,
}: SkillsSectionProperties): Promise<JSX.Element> => {
  const translations: Translations<'skills'> = await getTranslations({
    locale,
    namespace: 'skills',
  })

  const languages: readonly Skill[] = siteConfig.skills.languages
  const frameworks: readonly Skill[] = siteConfig.skills.frameworks
  const buildTools: readonly Skill[] = siteConfig.skills.buildTools
  const infrastructure: readonly Skill[] = siteConfig.skills.infrastructure

  return (
    <BlueprintContainer id="skills" isLazy={true}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <BlueprintSectionTitle
          sectionLabel="// TECH_STACK_ANALYSIS"
          title={translations('title')}
        />

        <div className="mt-8 grid w-full gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* Left Column: Tech Radar */}
          <SkillsRadar
            buildTools={buildTools}
            frameworks={frameworks}
            infrastructure={infrastructure}
            languages={languages}
            locale={locale}
          />

          {/* Right Column: Skill Lists */}
          <SkillsMatrix
            buildTools={buildTools}
            frameworks={frameworks}
            infrastructure={infrastructure}
            languages={languages}
            translations={translations}
          />
        </div>

        <BlueprintSectionDivider label="SYSTEM_ANALYSIS_COMPLETE" />
      </div>
    </BlueprintContainer>
  )
}

export default SkillsSection
