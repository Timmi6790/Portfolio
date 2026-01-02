import { type JSX } from 'react'

import { BlueprintCorners } from '@/components/blueprint/blueprint-decoration'
import { BlueprintText } from '@/components/blueprint/blueprint-text'
import { siteConfig } from '@/data/config'
import type { FCStrict } from '@/types/fc'

interface ViewAllButtonProperties {
  readonly label: string
}

const VIEW_ALL_ARROW: string = '->'

export const ViewAllButton: FCStrict<ViewAllButtonProperties> = ({
  label,
}: ViewAllButtonProperties): JSX.Element => (
  <div className="mt-12 flex justify-center">
    <a
      className="group relative inline-flex items-center justify-center"
      href={siteConfig.socials.github}
      rel="noreferrer"
      target="_blank"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-sm bg-brand/20 blur-md transition-all duration-300 group-hover:bg-brand/40" />

      {/* Button Content */}
      <BlueprintText
        as="div"
        className="group-hover:shadow-[0_0_15px_color-mix(in srgb, var(--brand), transparent 70%)] relative flex items-center gap-2 border border-brand bg-blueprint-bg/90 px-8 py-3 text-sm tracking-wider text-brand backdrop-blur-sm transition-all duration-300 group-hover:text-blueprint-text hover:bg-brand/10"
        uppercase={true}
        variant="brand"
      >
        <span>{label}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {VIEW_ALL_ARROW}
        </span>
      </BlueprintText>

      {/* Corner Accents */}
      <BlueprintCorners
        className="-top-[1px] -right-[1px] -bottom-[1px] -left-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)]"
        variant="bracket"
      />
    </a>
  </div>
)
