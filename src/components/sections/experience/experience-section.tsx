import { type JSX } from 'react'

import { type createFormatter } from 'next-intl'

import { getFormatter, getTranslations } from 'next-intl/server'

import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionDivider } from '@/components/blueprint/blueprint-section-divider'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { type ExperienceItemProperties } from '@/components/sections/experience/experience-card'
import { ExperienceList } from '@/components/sections/experience/experience-list'
import { mapExperienceData } from '@/components/sections/experience/experience-utilities'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'
import type { ResumeExperience } from '@/types/resume'

export type ExperienceSectionProperties = LocalePageProperties

export const ExperienceSection: AsyncPageFC<
  ExperienceSectionProperties
> = async ({ locale }: ExperienceSectionProperties): Promise<JSX.Element> => {
  const resumeTranslations: Translations<'resume'> = await getTranslations({
    locale,
    namespace: 'resume',
  })

  // Fetch experience array directly from translations
  const rawExperience: ResumeExperience[] = resumeTranslations.raw(
    'experience'
  ) as ResumeExperience[]

  // Cast to unknown first to avoid overlap issues if strict
  const format: ReturnType<typeof createFormatter> = await getFormatter({
    locale,
  })

  const experienceData: ExperienceItemProperties[] = mapExperienceData({
    format: format,
    presentLabel: resumeTranslations('present'),
    raw: rawExperience,
  })

  const sectionTranslations: Translations<'experience'> = await getTranslations(
    {
      locale,
      namespace: 'experience',
    }
  )

  return (
    <BlueprintContainer id="experience" isLazy={true}>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <BlueprintSectionTitle
          sectionLabel="// CAREER_HISTORY"
          title={sectionTranslations('title')}
        />

        <ExperienceList experienceData={experienceData} />

        <BlueprintSectionDivider label="HISTORY_LOG_END" />
      </div>
    </BlueprintContainer>
  )
}

export default ExperienceSection
