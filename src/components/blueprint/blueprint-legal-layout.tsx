import { type JSX } from 'react'

import { ArrowLeft } from 'lucide-react'

import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintCorners } from '@/components/blueprint/blueprint-decoration'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { BlueprintTechButton } from '@/components/blueprint/blueprint-tech-button'
import type { FCWithRequiredChildren, WithRequiredChildren } from '@/types/fc'

const END_MARKER: string = '// END_OF_FILE'

interface BlueprintLegalLayoutProperties extends WithRequiredChildren {
  readonly title: string
}

const RETURN_TEXT: string = 'RETURN_TO_BASE'

export const BlueprintLegalLayout: FCWithRequiredChildren<
  BlueprintLegalLayoutProperties
> = ({ children, title }: BlueprintLegalLayoutProperties): JSX.Element => {
  return (
    <BlueprintContainer
      className="min-h-screen"
      id="legal-page"
      overlay={
        <BlueprintTechButton
          className="fixed top-[var(--app-padding)] left-[var(--app-padding)] text-xs"
          href="/"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          {RETURN_TEXT}
        </BlueprintTechButton>
      }
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center pt-20 pb-12">
        <BlueprintSectionTitle sectionLabel="// COMPLIANCE_DOC" title={title} />

        <div className="shadow-[0_0_50px_color-mix(in srgb, var(--brand), transparent 95%)] relative mt-12 w-full border border-brand/30 bg-blueprint-bg/90 p-8 backdrop-blur-sm md:p-12">
          {/* Decorative Corner Markers */}
          <BlueprintCorners />

          {/* Content Area - Enforcing Sans-Serif for Readability */}
          <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-4 font-sans text-blueprint-text/90 marker:text-brand">
            {children}
          </div>
        </div>

        <div className="mt-8 font-mono text-[10px] tracking-widest text-brand/40 uppercase">
          {END_MARKER}
        </div>
      </div>
    </BlueprintContainer>
  )
}
