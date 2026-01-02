'use server'

import { type JSX } from 'react'

import { getTranslations } from 'next-intl/server'

import { PerformanceMonitor } from '@/components/features/dev-tools/performance-monitor'
import { GridPattern } from '@/components/ui/grid-pattern'
import { siteConfig } from '@/data/config'
import { environment } from '@/environment'
import { Link } from '@/i18n/routing'
import type { AsyncPageFC, FCStrict } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

/* ── constants ─────────────────────────────────────────────────────────── */

const COMMENT_MARKER: string = '//'
const COPYRIGHT_MARKER: string = '©'
const RIGHTS_TEXT: string = ':: ALL_RIGHTS_RESERVED'
const SYSTEM_PREFIX: string = 'SYS_READY :: v'

/* ── subcomponents ─────────────────────────────────────────────────────── */

interface SystemStatusProperties {
  readonly revision: string
}

const SystemStatus: FCStrict<SystemStatusProperties> = ({
  revision,
}: SystemStatusProperties): JSX.Element => (
  <div className="inline-flex items-center gap-2">
    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
    <span className="font-mono text-[10px] text-brand-readable">
      {SYSTEM_PREFIX}
      {revision}
    </span>
  </div>
)

interface FooterContentProperties {
  readonly currentYear: number
  readonly revision: string
}

const FooterContent: FCStrict<FooterContentProperties> = ({
  currentYear,
  revision,
}: FooterContentProperties): JSX.Element => (
  <div className="order-2 mt-8 flex flex-col gap-4 text-center md:absolute md:left-[var(--app-padding)] md:order-1 md:mt-0 md:items-start md:text-left">
    <div className="flex flex-col gap-1">
      <div className="text-[10px] font-bold tracking-widest text-brand uppercase">
        {COMMENT_MARKER} {siteConfig.fullName}
      </div>
      <div className="text-[10px] text-brand/80">
        {COPYRIGHT_MARKER} {currentYear} {RIGHTS_TEXT}
      </div>
    </div>
    <SystemStatus revision={revision} />
  </div>
)

interface FooterNavigationProperties {
  readonly translations: Translations<''>
}

const FooterNavigation: FCStrict<FooterNavigationProperties> = ({
  translations,
}: FooterNavigationProperties): JSX.Element => (
  <nav
    aria-label="Legal navigation"
    className="order-1 flex items-center gap-px border border-brand/20 bg-blueprint-bg/50 backdrop-blur-md md:order-2"
  >
    <Link
      className="group relative px-8 py-3 transition-all hover:bg-brand/10"
      href="/imprint"
      prefetch={false}
    >
      <span className="font-mono text-xs tracking-wider text-brand-readable transition-colors group-hover:text-brand">
        {translations('imprint.title').toUpperCase()}
      </span>
      {/* Corner Accent */}
      <span className="absolute top-0 left-0 h-1 w-1 border-t border-l border-brand opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>

    <div className="h-4 w-px bg-brand/20" />

    <Link
      className="group relative px-8 py-3 transition-all hover:bg-brand/10"
      href="/privacy"
      prefetch={false}
    >
      <span className="font-mono text-xs tracking-wider text-brand-readable transition-colors group-hover:text-brand">
        {translations('privacy.title').toUpperCase()}
      </span>
      {/* Corner Accent */}
      <span className="absolute right-0 bottom-0 h-1 w-1 border-r border-b border-brand opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  </nav>
)

/* ── main ──────────────────────────────────────────────────────────────── */

type LegalFooterProperties = LocalePageProperties

export const LegalFooter: AsyncPageFC<LegalFooterProperties> = async ({
  locale,
}: LegalFooterProperties): Promise<JSX.Element> => {
  const translations: Translations<''> = await getTranslations({ locale })
  const currentYear: number = new Date().getFullYear()
  const revision: string = environment.NEXT_PUBLIC_REVISION ?? '1.0.0'

  return (
    <footer className="relative w-full overflow-hidden border-t border-brand/30 bg-blueprint-bg text-blueprint-text">
      {/* Blueprint Grid Background */}
      <GridPattern className="stroke-brand/100 opacity-[0.03]" size={40} />

      {/* Technical Top Border Details */}
      <div className="absolute top-0 left-0 h-px w-full bg-brand/30">
        <div className="absolute top-0 left-[10%] h-2 w-px bg-brand" />
        <div className="absolute top-0 left-[20%] h-1 w-px bg-brand/50" />
        <div className="absolute top-0 right-[10%] h-2 w-px bg-brand" />
        <div className="absolute top-0 right-[20%] h-1 w-px bg-brand/50" />
        <div className="absolute top-0 left-1/2 h-[1px] w-24 -translate-x-1/2 bg-brand shadow-[0_0_10px_#60A5FA]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-12 md:h-32 md:py-0">
        <FooterContent currentYear={currentYear} revision={revision} />
        <FooterNavigation translations={translations} />

        {/* Performance Monitor (Bottom Right) */}
        <div className="hidden md:absolute md:right-[var(--app-padding)] md:bottom-4 md:block lg:bottom-auto">
          <PerformanceMonitor />
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
    </footer>
  )
}
