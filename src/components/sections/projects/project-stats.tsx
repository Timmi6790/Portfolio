import { type JSX } from 'react'

import { BlueprintText } from '@/components/blueprint/blueprint-text'
import { Card } from '@/components/ui/card'
import type { FCStrict } from '@/types/fc'

interface ProjectStatsProperties {
  readonly stats: {
    readonly forks: number
    readonly repositories: number
    readonly stars: number
  }
}

const REPO_TEXT: string = 'Repositories'
const STARS_TEXT: string = 'Total Stars'
const FORKS_TEXT: string = 'Total Forks'

export const ProjectStats: FCStrict<ProjectStatsProperties> = ({
  stats,
}: ProjectStatsProperties): JSX.Element => (
  <div className="mt-8 grid w-full grid-cols-3 gap-4 md:w-2/3 lg:w-1/2">
    <Card className="flex flex-col items-center justify-center border-brand/30 bg-blueprint-bg/50 p-4">
      <BlueprintText className="text-3xl font-bold text-blueprint-text">
        {stats.repositories}
      </BlueprintText>
      <BlueprintText
        as="span"
        className="text-[10px]"
        uppercase={true}
        variant="muted"
      >
        {REPO_TEXT}
      </BlueprintText>
    </Card>
    <Card className="flex flex-col items-center justify-center border-brand/30 bg-blueprint-bg/50 p-4">
      <BlueprintText className="text-3xl font-bold text-blueprint-text">
        {stats.stars}
      </BlueprintText>
      <BlueprintText
        as="span"
        className="text-[10px]"
        uppercase={true}
        variant="muted"
      >
        {STARS_TEXT}
      </BlueprintText>
    </Card>
    <Card className="flex flex-col items-center justify-center border-brand/30 bg-blueprint-bg/50 p-4">
      <BlueprintText className="text-3xl font-bold text-blueprint-text">
        {stats.forks}
      </BlueprintText>
      <BlueprintText
        as="span"
        className="text-[10px]"
        uppercase={true}
        variant="muted"
      >
        {FORKS_TEXT}
      </BlueprintText>
    </Card>
  </div>
)
