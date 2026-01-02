import { type JSX } from 'react'

import {
  ExperienceCard,
  type ExperienceItemProperties,
} from '@/components/sections/experience/experience-card'
import type { FCStrict } from '@/types/fc'

interface ExperienceListProperties {
  readonly experienceData: readonly ExperienceItemProperties[]
}

export const ExperienceList: FCStrict<ExperienceListProperties> = ({
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

            {/* Card with Horizontal Connector */}
            <ExperienceCard {...experience} />
          </div>
        )
      )}
    </div>
  </div>
)
