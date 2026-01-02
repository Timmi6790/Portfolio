import { type JSX } from 'react'

import { Folder, GitFork, Star } from 'lucide-react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintIcon } from '@/components/blueprint/blueprint-icon'
import { BlueprintText } from '@/components/blueprint/blueprint-text'
import type { FCStrict } from '@/types/fc'

interface ProjectCardProperties {
  readonly description: string
  readonly language: string
  readonly name: string
  readonly stats: {
    readonly forks: number
    readonly stars: number
  }
  readonly url: string
  readonly viewProject: string
}

interface ProjectCardFooterProperties {
  readonly language: string
  readonly stats: {
    readonly forks: number
    readonly stars: number
  }
  readonly url: string
  readonly viewProject: string
}

const ProjectCardFooter: FCStrict<ProjectCardFooterProperties> = ({
  language,
  stats,
  url,
  viewProject,
}: ProjectCardFooterProperties): JSX.Element => (
  <div className="mt-auto flex items-center justify-between border-t border-brand/30 pt-4">
    <div className="flex items-center gap-4">
      <BlueprintText
        as="span"
        className="flex items-center gap-1 text-xs"
        uppercase={true}
        variant="brand"
      >
        <div className="h-2 w-2 rounded-full bg-brand opacity-70" />
        {language}
      </BlueprintText>
      <BlueprintText
        as="span"
        className="flex items-center gap-1 text-xs"
        uppercase={true}
        variant="brand"
      >
        <Star className="h-3 w-3" />
        {stats.stars}
      </BlueprintText>
      <BlueprintText
        as="span"
        className="flex items-center gap-1 text-xs"
        uppercase={true}
        variant="brand"
      >
        <GitFork className="h-3 w-3" />
        {stats.forks}
      </BlueprintText>
    </div>

    <BlueprintText
      as="a"
      className="text-xs decoration-brand underline-offset-4 transition-colors hover:text-blueprint-text hover:underline"
      href={url}
      rel="noreferrer"
      target="_blank"
      uppercase={true}
      variant="brand"
    >
      {viewProject} {'->'}
    </BlueprintText>
  </div>
)

export const BlueprintProjectCard: FCStrict<ProjectCardProperties> = ({
  description,
  language,
  name,
  stats,
  url,
  viewProject,
}: ProjectCardProperties): JSX.Element => (
  <BlueprintCard
    className="flex h-full flex-col"
    label="REPO_DATA"
    noPadding={true}
  >
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <BlueprintIcon icon={Folder} />
          <BlueprintText
            as="h3"
            className="text-lg font-bold tracking-tight text-blueprint-text"
            uppercase={true}
          >
            {name}
          </BlueprintText>
        </div>
      </div>

      {/* Description */}
      <BlueprintText
        as="p"
        className="mb-6 line-clamp-3 flex-grow text-xs leading-relaxed tracking-normal normal-case"
        variant="muted"
      >
        {description}
      </BlueprintText>

      {/* Footer / Stats */}
      <ProjectCardFooter
        language={language}
        stats={stats}
        url={url}
        viewProject={viewProject}
      />
    </div>
  </BlueprintCard>
)
