import type { JSX } from 'react'

import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import AboutSection from '@/components/sections/about-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ensureLocaleFromParameters } from '@/i18n/locale'
import type { Translations } from '@/types/i18n'

interface OfflinePageProperties {
  readonly params: Promise<{ locale: Locale }>
}

export async function generateMetadata({
  params,
}: OfflinePageProperties): Promise<Metadata> {
  const { locale }: { locale: Locale } = await params
  const translations: Translations<'offline'> = await getTranslations({
    locale,
    namespace: 'offline',
  })

  return {
    title: translations('offlineMetaTitle'),
  }
}

const OfflinePage: (
  properties: OfflinePageProperties
) => Promise<JSX.Element> = async ({
  params,
}: OfflinePageProperties): Promise<JSX.Element> => {
  const locale: Locale = await ensureLocaleFromParameters(params)

  setRequestLocale(locale)

  const translations: Translations<'offline'> = await getTranslations({
    locale,
    namespace: 'offline',
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
        <h1 className="text-2xl font-bold">{translations('title')}</h1>
        <p>{translations('description')}</p>
      </div>
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
    </main>
  )
}

export default OfflinePage
