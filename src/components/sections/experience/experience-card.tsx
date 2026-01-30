import { type JSX } from 'react'

import { Calendar, MapPin } from 'lucide-react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintText } from '@/components/blueprint/blueprint-text'
import type { FCStrict } from '@/types/fc'

export interface ExperienceItemProperties {
  readonly achievements: readonly string[]
  readonly company: string
  readonly duration: string
  readonly index: number
  readonly location: string
  readonly role: string
}

const ARROW_MARKER: string = '>'

interface AchievementsListProperties {
  readonly achievements: readonly string[]
  readonly company: string
}

const AchievementsList: FCStrict<AchievementsListProperties> = ({
  achievements,
  company,
}: AchievementsListProperties): JSX.Element => (
  <ul className="list-none space-y-3">
    {achievements.map(
      (achievement: string, index: number): JSX.Element => (
        <li
          className="flex gap-4 font-mono text-sm leading-relaxed text-blueprint-muted"
          key={`${company.replaceAll(' ', '_')}-${index.toString()}`}
        >
          <span aria-hidden="true" className="mt-1 text-brand select-none">
            {ARROW_MARKER}
          </span>
          <BlueprintText
            as="span"
            className="text-sm tracking-normal normal-case"
            variant="muted"
          >
            {achievement}
          </BlueprintText>
        </li>
      )
    )}
  </ul>
)

// eslint-disable-next-line max-lines-per-function
export const ExperienceCard: FCStrict<ExperienceItemProperties> = ({
  achievements,
  company,
  duration,
  index,
  location,
  role,
}: ExperienceItemProperties): JSX.Element => {
  const nodeLabel: string = `EXPERIENCE_NODE_${String(index + 1).padStart(2, '0')}`

  return (
    <div className="relative pl-0 md:pl-16">
      {/* Horizontal Connector Trace (Sleek) */}
      <div className="absolute top-[3.5rem] left-0 hidden h-px w-8 bg-linear-to-r from-brand/60 to-brand/20 md:block md:w-16">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-brand/20 blur-[1px]" />
      </div>

      <BlueprintCard
        className="relative bg-blueprint-card-bg/90 backdrop-blur-md"
        label={nodeLabel}
      >
        {/* Card Header */}
        <div className="mb-6 flex flex-col gap-4 border-b border-brand/20 pb-4 md:flex-row md:items-start md:justify-between">
          <div>
            <BlueprintText
              as="h3"
              className="text-lg font-bold tracking-tight text-blueprint-text"
              uppercase={true}
            >
              {role}
            </BlueprintText>
            <BlueprintText className="text-sm" uppercase={true} variant="brand">
              {company}
            </BlueprintText>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <BlueprintText
              className="flex items-center gap-2 text-xs"
              uppercase={true}
              variant="brand"
            >
              <Calendar className="h-3 w-3" /> {duration}
            </BlueprintText>
            {/* eslint-disable-next-line react/jsx-no-literals */}
            <span className="sr-only"> - </span>
            <BlueprintText
              className="flex items-center gap-2 text-xs"
              uppercase={true}
              variant="brand"
            >
              <MapPin className="h-3 w-3" /> {location}
            </BlueprintText>
          </div>
        </div>

        <AchievementsList achievements={achievements} company={company} />
      </BlueprintCard>
    </div>
  )
}
