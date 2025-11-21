import { type FC, type ReactElement } from 'react'

import { Text, View } from '@react-pdf/renderer'

import type { ResumeExperience, ResumeTranslations } from '@/types/resume'

import { styles } from './modern.styles'

interface ExperienceSectionProperties {
  readonly translations: ResumeTranslations
}

// eslint-disable-next-line max-lines-per-function
export const ExperienceSection: FC<ExperienceSectionProperties> = ({
  translations,
}: ExperienceSectionProperties): ReactElement => {
  const experiences: ResumeExperience[] = translations.raw(
    'resume.experience'
  ) as ResumeExperience[]

  // Use compact styles if there are more than 2 experience entries
  const isCompact: boolean = experiences.length > 2

  return (
    <>
      <Text style={styles.sectionTitleFirst}>
        {translations('resume.sectionTitles.experience')}
      </Text>
      <View style={styles.sectionDivider} />
      {experiences.map(
        (exp: ResumeExperience, index: number): ReactElement => (
          <View
            key={`${exp.company}-${index.toString()}`}
            style={
              isCompact ? styles.experienceItemCompact : styles.experienceItem
            }
          >
            <View
              style={isCompact ? styles.jobHeaderCompact : styles.jobHeader}
            >
              <Text
                style={isCompact ? styles.jobTitleCompact : styles.jobTitle}
              >
                {exp.title}
              </Text>
              <Text
                style={isCompact ? styles.dateTextCompact : styles.dateText}
              >
                {exp.startDate}
                {' - '}
                {exp.endDate}
              </Text>
            </View>
            <View style={styles.companyRow}>
              <Text
                style={
                  isCompact ? styles.companyTextCompact : styles.companyText
                }
              >
                {exp.company}
                {' • '}
                {exp.location}
              </Text>
            </View>
            {exp.achievements.map(
              (achievement: string, achievementIndex: number): ReactElement => (
                <Text
                  key={`achievement_${achievementIndex.toString()}`}
                  style={
                    isCompact ? styles.achievementCompact : styles.achievement
                  }
                >
                  {'• '}
                  {achievement}
                </Text>
              )
            )}
          </View>
        )
      )}
    </>
  )
}
