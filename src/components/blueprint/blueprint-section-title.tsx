import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

import { MeasurementLine } from './measurement-line'

interface BlueprintSectionTitleProperties {
  readonly greeting?: string
  readonly sectionLabel?: string
  readonly subtitle?: string
  readonly title: string
}

export const BlueprintSectionTitle: FCStrict<
  BlueprintSectionTitleProperties
> = ({
  greeting,
  sectionLabel = '// SECTION_HEADER',
  subtitle,
  title,
}: BlueprintSectionTitleProperties): JSX.Element => (
  <div className="relative z-10 mx-auto max-w-4xl p-12 text-center">
    {/* Framing Box for text */}
    <div className="absolute inset-0 border border-[#4A90E2]/30" />
    <div className="absolute inset-0 scale-[1.02] border border-[#4A90E2]/10" />

    {/* Section Identifier */}
    <div className="absolute -top-3 left-4 bg-[#0B1021] px-2 font-mono text-[10px] tracking-[0.2em] text-[#4A90E2] uppercase">
      {sectionLabel}
    </div>

    {/* Title Block */}
    <div className="flex flex-col items-center gap-2">
      {Boolean(greeting) && (
        <span className="mb-2 block font-mono text-xl tracking-[0.3em] text-[#4A90E2] uppercase sm:text-2xl">
          {greeting}
        </span>
      )}
      <h2 className="font-mono text-4xl font-bold tracking-tighter text-[#E6F1FF] [text-shadow:0_0_15px_rgba(74,144,226,0.3)] sm:text-6xl">
        {title.toUpperCase()}
      </h2>
      <div className="my-4 h-px w-32 bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent" />
      {Boolean(subtitle) && (
        <p className="font-mono text-lg tracking-widest text-[#88B0D6] uppercase sm:text-2xl">
          {subtitle}
        </p>
      )}
    </div>

    {/* Measurements around the box */}
    <MeasurementLine
      className="-top-8 left-0"
      label="ZONE_WIDTH"
      width="100%"
    />
    <MeasurementLine
      className="top-0 -right-8"
      label="HEIGHT"
      orientation="vertical"
      width="100%"
    />
  </div>
)
