import { type createFormatter } from 'next-intl'

import { type ExperienceItemProperties } from '@/components/sections/experience/experience-card'
import type { ResumeExperience } from '@/types/resume'

interface MapExperienceDataProperties {
  readonly format: ReturnType<typeof createFormatter>
  readonly presentLabel: string
  readonly raw: readonly ResumeExperience[]
}

interface DateValue {
  readonly month: number
  readonly year: number
}

interface FormatDurationProperties {
  readonly end: DateValue | null
  readonly format: ReturnType<typeof createFormatter>
  readonly presentLabel: string
  readonly start: DateValue
}

const isValidDate: (date: DateValue) => boolean = (
  date: DateValue
): boolean => {
  return date.year > 0 && date.month > 0 && date.month <= 12
}

const formatDuration: (properties: FormatDurationProperties) => string = ({
  end,
  format,
  presentLabel,
  start,
}: FormatDurationProperties): string => {
  if (!isValidDate(start)) {
    throw new Error('Invalid start date of ' + JSON.stringify(start))
  }

  const startDate: Date = new Date(Date.UTC(start.year, start.month - 1, 1))
  const formattedStart: string = format.dateTime(startDate, {
    month: 'short',
    year: 'numeric',
  })

  if (end === null) {
    return `${formattedStart} - ${presentLabel}`
  }

  if (!isValidDate(end)) {
    throw new Error('Invalid end date of ' + JSON.stringify(end))
  }

  const endDate: Date = new Date(Date.UTC(end.year, end.month - 1, 1))
  const formattedEnd: string = format.dateTime(endDate, {
    month: 'short',
    year: 'numeric',
  })

  return `${formattedStart} - ${formattedEnd}`
}

export const mapExperienceData: (
  properties: MapExperienceDataProperties
) => ExperienceItemProperties[] = ({
  format,
  presentLabel,
  raw,
}: MapExperienceDataProperties): ExperienceItemProperties[] => {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw.map(
    (item: ResumeExperience, index: number): ExperienceItemProperties => ({
      achievements: item.achievements,
      company: item.company,
      duration: formatDuration({
        end: item.end,
        format,
        presentLabel,
        start: item.start,
      }),
      index,
      location: item.location,
      role: item.title,
    })
  )
}
