'use client'

import { type JSX } from 'react'

import { useTranslations } from 'next-intl'

import type { PageFC } from '@/types/fc'
import type { Translations } from '@/types/i18n'

const LOADING_ELLIPSIS: string = '...'
const SYSTEM_INIT_TEXT: string = 'SYSTEM_INITIALIZATION'

const Loading: PageFC = (): JSX.Element => {
  const translations: Translations<'loading'> = useTranslations('loading')

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0B1021] text-[#E6F1FF]">
      {/* Blueprint Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4A90E2 1px, transparent 1px), linear-gradient(90deg, #4A90E2 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Technical Loader */}
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#4A90E2]/20 border-t-[#4A90E2]" />
          <div className="animate-spin-slow reverse absolute inset-4 rounded-full border-2 border-[#4A90E2]/20 border-b-[#4A90E2]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 animate-pulse bg-[#4A90E2] shadow-[0_0_10px_#4A90E2]" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="animate-pulse font-mono text-xl font-bold tracking-widest text-[#E6F1FF]">
            {translations('title').toUpperCase()}
            {LOADING_ELLIPSIS}
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#4A90E2]/50 to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#4A90E2]/60 uppercase">
            {SYSTEM_INIT_TEXT}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loading
