import { type JSX } from 'react'

import { Calendar, MapPin } from 'lucide-react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
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
          <span>{achievement}</span>
        </li>
      )
    )}
  </ul>
)

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
            <h3 className="font-mono text-lg font-bold tracking-tight text-blueprint-text">
              {role}
            </h3>
            <div className="font-mono text-sm text-brand">{company}</div>
          </div>
          <div className="flex flex-col gap-1 font-mono text-xs tracking-widest text-brand-readable uppercase md:items-end">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" /> {duration}
            </div>
            {/* eslint-disable-next-line react/jsx-no-literals */}
            <span className="sr-only"> - </span>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" /> {location}
            </div>
          </div>
        </div>

        <AchievementsList achievements={achievements} company={company} />
      </BlueprintCard>
    </div>
  )
}
