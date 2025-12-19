'use client'

import type { JSX } from 'react'

import { useTranslations } from 'next-intl'

import { AlertOctagon, Home, RotateCcw } from 'lucide-react'
import Link from 'next/link'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import type { FCStrict, PageFC } from '@/types/fc'
import type { Translations } from '@/types/i18n'

const ERROR_CODE_404: string = '404'

interface NotFoundContentProperties {
  readonly translations: Translations<'notFound'>
}

const NotFoundContent: FCStrict<NotFoundContentProperties> = ({
  translations,
}: NotFoundContentProperties): JSX.Element => (
  <div className="flex flex-col items-center gap-6 text-center">
    {/* 404 Icon */}
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="absolute inset-0 animate-pulse rounded-full border border-amber-500/30" />
      <div className="absolute inset-2 rounded-full border border-amber-500/20" />
      <AlertOctagon className="h-10 w-10 text-amber-500" />
    </div>

    <div className="flex flex-col gap-2">
      <h1 className="font-mono text-4xl font-bold tracking-wider text-amber-500">
        {ERROR_CODE_404}
      </h1>
      <h2 className="font-mono text-xl font-bold tracking-widest text-[#E6F1FF] uppercase">
        {translations('title').toUpperCase()}
      </h2>
      <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <p className="font-mono text-sm text-[#88B0D6]">
        {translations('description')}
      </p>
    </div>

    <div className="mt-6 flex gap-4">
      <button
        className="flex items-center gap-2 border border-[#4A90E2] bg-[#4A90E2]/10 px-6 py-3 font-mono text-xs tracking-wider text-[#4A90E2] uppercase transition-all hover:bg-[#4A90E2]/20 hover:text-[#E6F1FF]"
        onClick={(): void => {
          window.location.reload()
        }}
      >
        <RotateCcw className="h-4 w-4" />
        {translations('retry')}
      </button>

      <Link
        className="flex items-center gap-2 border border-[#4A90E2]/30 bg-transparent px-6 py-3 font-mono text-xs tracking-wider text-[#4A90E2]/70 uppercase transition-all hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 hover:text-[#E6F1FF]"
        href="/"
      >
        <Home className="h-4 w-4" />
        {translations('home')}
      </Link>
    </div>
  </div>
)

const NotFound: PageFC = (): JSX.Element => {
  const translations: Translations<'notFound'> = useTranslations('notFound')

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0B1021] p-4 font-sans text-[#E6F1FF]">
      {/* Blueprint Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#4A90E2 1px, transparent 1px), linear-gradient(90deg, #4A90E2 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <BlueprintCard
          className="border-amber-500/30 p-8 md:p-12"
          label="SIGNAL LOST"
          noPadding={true}
        >
          <NotFoundContent translations={translations} />
        </BlueprintCard>
      </div>
    </div>
  )
}

export default NotFound
