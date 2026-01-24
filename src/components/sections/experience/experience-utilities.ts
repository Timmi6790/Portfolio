import { type createFormatter } from 'next-intl'

import { type ExperienceItemProperties } from '@/components/sections/experience/experience-card'
import type { ResumeExperience } from '@/types/resume'

interface MapExperienceDataProperties {
  readonly format: ReturnType<typeof createFormatter>
  readonly presentLabel: string
  readonly raw: readonly ResumeExperience[]
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
    (item: ResumeExperience, index: number): ExperienceItemProperties => {
      const startDate: Date = new Date(
        Date.UTC(item.start.year, item.start.month - 1, 1)
      )
      const start: string = format.dateTime(startDate, {
        month: 'short',
        year: 'numeric',
      })

      let end: string = presentLabel
      if (item.end !== null && item.end.year > 0 && item.end.month > 0) {
        const endDate: Date = new Date(
          Date.UTC(item.end.year, item.end.month - 1, 1)
        )
        end = format.dateTime(endDate, { month: 'short', year: 'numeric' })
      }

      return {
        achievements: item.achievements,
        company: item.company,
        duration: `${start} - ${end}`,
        index,
        location: item.location,
        role: item.title,
      }
    }
  )
}
