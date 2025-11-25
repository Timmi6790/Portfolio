import { type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import { siteConfig, type Skill } from '@/lib/config'
import type { FCStrict } from '@/types/fc'
import type { ResumeTranslations } from '@/types/resume'

import { styles } from './modern.styles'

interface SkillSectionProperties {
  readonly skills: readonly Skill[]
  readonly title: string
}

const SkillSection: FCStrict<SkillSectionProperties> = ({
  skills,
  title,
}: SkillSectionProperties): ReactElement => (
  <>
    <Text style={styles.contactLabel}>{title}</Text>
    <View style={styles.skillsContainer}>
      {skills
        .filter(
          (skill: Skill): boolean =>
            skill.confidence >= siteConfig.skills.resumeMinimumConfidence
        )
        .toSorted(
          (skillOne: Skill, skillTwo: Skill): number =>
            skillTwo.confidence - skillOne.confidence
        )
        .map(
          (skill: Skill): ReactElement => (
            <Text key={skill.name} style={styles.skillTag}>
              {skill.name}
            </Text>
          )
        )}
    </View>
  </>
)

interface SkillsSectionProperties {
  readonly translations: ResumeTranslations
}

export const SkillsSection: FCStrict<SkillsSectionProperties> = ({
  translations,
}: SkillsSectionProperties): ReactElement => (
  <>
    <Text style={styles.sectionTitle}>
      {translations('resume.sectionTitles.skills')}
    </Text>
    <View style={styles.sectionDivider} />

    <SkillSection
      skills={siteConfig.skills.languages}
      title={translations('resume.sectionTitles.skillsSubTypes.languages')}
    />

    <SkillSection
      skills={siteConfig.skills.frameworks}
      title={translations('resume.sectionTitles.skillsSubTypes.frameworks')}
    />

    <SkillSection
      skills={siteConfig.skills.buildTools}
      title={translations('resume.sectionTitles.skillsSubTypes.buildTools')}
    />

    <SkillSection
      skills={siteConfig.skills.infrastructure}
      title={translations('resume.sectionTitles.skillsSubTypes.infrastructure')}
    />
  </>
)
