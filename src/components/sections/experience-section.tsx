import { type JSX } from 'react'

import { Calendar, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionDivider } from '@/components/blueprint/blueprint-section-divider'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import type { AsyncPageFC, FCStrict } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

/* ── types ─────────────────────────────────────────────────────────────── */

interface ExperienceItemProperties {
  readonly achievements: readonly string[]
  readonly company: string
  readonly duration: string
  readonly index: number
  readonly location: string
  readonly role: string
}

type ExperienceSectionProperties = LocalePageProperties

/* ── subcomponents ─────────────────────────────────────────────────────── */

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

const ExperienceCard: FCStrict<ExperienceItemProperties> = ({
  achievements,
  company,
  duration,
  index,
  location,
  role,
}: ExperienceItemProperties): JSX.Element => {
  const nodeLabel: string = `EXPERIENCE_NODE_${String(index + 1).padStart(2, '0')}`

  return (
    <div className="relative pl-8 md:pl-16">
      {/* Horizontal Connector Trace (Sleek) */}
      <div className="absolute top-[3.5rem] left-0 hidden h-px w-8 bg-gradient-to-r from-brand/60 to-brand/20 md:block md:w-16">
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
          <div className="flex flex-col gap-1 font-mono text-xs tracking-widest text-brand/70 uppercase md:items-end">
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

interface ExperienceListProperties {
  readonly experienceData: readonly ExperienceItemProperties[]
}

const ExperienceList: FCStrict<ExperienceListProperties> = ({
  experienceData,
}: ExperienceListProperties): JSX.Element => (
  <div className="relative mt-12 w-full">
    {/* Main Vertical Trace Line (Sleek Gradient) */}
    <div className="absolute top-0 bottom-0 left-[2px] hidden w-px bg-gradient-to-b from-transparent via-brand/50 to-transparent md:left-[0px] md:block">
      {/* Subtle Glow */}
      <div className="absolute inset-0 w-full bg-brand/20 blur-[1px]" />
    </div>

    <div className="space-y-12">
      {experienceData.map(
        (experience: ExperienceItemProperties, index: number): JSX.Element => (
          <div
            className="relative"
            key={`${experience.company.replaceAll(' ', '_')}-${index.toString()}`}
          >
            {/* Node Marker (Sleek Orb) */}
            <div className="absolute top-[3.25rem] -left-[5px] z-10 hidden h-2.5 w-2.5 rounded-full border border-brand bg-blueprint-bg shadow-[0_0_8px_#60A5FA] md:-left-[5px] md:block">
              {/* Inner Pulse */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-brand/30" />
            </div>

            {/* Mobile Timeline (Simplified) */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-brand/30 md:hidden" />
            <div className="absolute top-8 -left-[4px] z-10 h-2.5 w-2.5 rounded-full border border-brand bg-blueprint-bg md:hidden" />

            {/* Card with Horizontal Connector */}
            <ExperienceCard {...experience} />
          </div>
        )
      )}
    </div>
  </div>
)

/* ── main ──────────────────────────────────────────────────── */

const mapExperienceData: (
  raw: readonly {
    readonly achievements: string[]
    readonly company: string
    readonly endDate: string
    readonly location: string
    readonly startDate: string
    readonly title: string
  }[]
) => ExperienceItemProperties[] = (
  raw: readonly {
    readonly achievements: string[]
    readonly company: string
    readonly endDate: string
    readonly location: string
    readonly startDate: string
    readonly title: string
  }[]
): ExperienceItemProperties[] => {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw.map(
    (
      item: {
        readonly achievements: string[]
        readonly company: string
        readonly endDate: string
        readonly location: string
        readonly startDate: string
        readonly title: string
      },
      index: number
    ): ExperienceItemProperties => ({
      achievements: item.achievements,
      company: item.company,
      duration: `${item.startDate} - ${item.endDate}`,
      index,
      location: item.location,
      role: item.title,
    })
  )
}

export const ExperienceSection: AsyncPageFC<
  ExperienceSectionProperties
> = async ({ locale }: ExperienceSectionProperties): Promise<JSX.Element> => {
  const resumeTranslations: Translations<'resume'> = await getTranslations({
    locale,
    namespace: 'resume',
  })

  // Fetch experience array directly from translations
  const rawExperience: {
    readonly achievements: string[]
    readonly company: string
    readonly endDate: string
    readonly location: string
    readonly startDate: string
    readonly title: string
  }[] = resumeTranslations.raw('experience') as {
    readonly achievements: string[]
    readonly company: string
    readonly endDate: string
    readonly location: string
    readonly startDate: string
    readonly title: string
  }[]

  const experienceData: ExperienceItemProperties[] =
    mapExperienceData(rawExperience)

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
