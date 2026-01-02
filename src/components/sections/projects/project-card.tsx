import { type JSX } from 'react'

import { Folder, GitFork, Star } from 'lucide-react'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintIcon } from '@/components/blueprint/blueprint-icon'
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
          <h3 className="font-mono text-lg font-bold tracking-tight text-blueprint-text">
            {name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 line-clamp-3 flex-grow font-mono text-xs leading-relaxed text-blueprint-muted">
        {description}
      </p>

      {/* Footer / Stats */}
      <div className="mt-auto flex items-center justify-between border-t border-brand/30 pt-4 font-mono text-xs text-brand/80 uppercase">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-brand opacity-70" />
            {language}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {stats.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {stats.forks}
          </span>
        </div>

        <a
          className="decoration-brand underline-offset-4 transition-colors hover:text-blueprint-text hover:underline"
          href={url}
          rel="noreferrer"
          target="_blank"
        >
          {viewProject} {'->'}
        </a>
      </div>
    </div>
  </BlueprintCard>
)
