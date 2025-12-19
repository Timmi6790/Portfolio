import { type JSX, type ReactNode } from 'react'

import { ArrowLeft } from 'lucide-react'

import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import type { FCWithRequiredChildren } from '@/types/fc'

const END_MARKER: string = '// END_OF_FILE'

interface BlueprintLegalLayoutProperties {
  readonly title: string
}

const RETURN_TEXT: string = 'RETURN_TO_BASE'

export const BlueprintLegalLayout: FCWithRequiredChildren<
  BlueprintLegalLayoutProperties
> = ({
  children,
  title,
}: BlueprintLegalLayoutProperties & {
  readonly children: ReactNode
}): JSX.Element => {
  return (
    <BlueprintContainer
      className="min-h-screen"
      id="legal-page"
      overlay={
        <Button
          asChild={true}
          className="clip-path-polygon group fixed top-[var(--app-padding)] left-[var(--app-padding)] z-50 rounded-none border border-[#4A90E2]/30 bg-[#0B1021]/80 px-4 py-2 font-mono text-xs font-bold tracking-widest text-[#4A90E2] uppercase backdrop-blur-sm transition-all hover:border-[#4A90E2] hover:bg-[#4A90E2]/10 hover:text-[#E6F1FF]"
          size="sm"
          variant="ghost"
        >
          <Link className="flex items-center gap-2" href="/">
            {/* Technical Corner Accents */}
            <span className="absolute top-0 left-0 h-1 w-1 border-t border-l border-[#4A90E2]" />
            <span className="absolute right-0 bottom-0 h-1 w-1 border-r border-b border-[#4A90E2]" />
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            {RETURN_TEXT}
          </Link>
        </Button>
      }
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center pt-20 pb-12">
        <BlueprintSectionTitle sectionLabel="// COMPLIANCE_DOC" title={title} />

        <div className="relative mt-12 w-full border border-[#4A90E2]/30 bg-[#0B1021]/90 p-8 shadow-[0_0_50px_rgba(74,144,226,0.05)] backdrop-blur-sm md:p-12">
          {/* Decorative Corner Markers */}
          <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#4A90E2]" />
          <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#4A90E2]" />
          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#4A90E2]" />
          <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-[#4A90E2]" />

          {/* Content Area - Enforcing Sans-Serif for Readability */}
          <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-4 font-sans text-[#E6F1FF]/90 marker:text-[#4A90E2]">
            {children}
          </div>
        </div>

        <div className="mt-8 font-mono text-[10px] tracking-widest text-[#4A90E2]/40 uppercase">
          {END_MARKER}
        </div>
      </div>
    </BlueprintContainer>
  )
}
