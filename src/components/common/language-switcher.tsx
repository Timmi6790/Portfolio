'use client'

import { type JSX } from 'react'

import { type Locale, useLocale } from 'next-intl'

import { Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/routing'
import type { FCStrict } from '@/types/fc'

export const LanguageSwitcher: FCStrict = (): JSX.Element => {
  const locale: Locale = useLocale()

  const pathname: string = usePathname()
  const router: ReturnType<typeof useRouter> = useRouter()

  const switchLanguage: () => void = (): void => {
    const newLocale: Locale = locale === 'en' ? 'de' : 'en'
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button
      className="clip-path-polygon fixed top-[var(--app-padding)] right-[var(--app-padding)] z-50 rounded-none border border-brand/30 bg-blueprint-bg/80 px-4 py-2 font-mono text-xs font-bold tracking-widest text-brand uppercase backdrop-blur-sm transition-all hover:border-brand hover:bg-brand/10 hover:text-blueprint-text"
      size="sm"
      variant="ghost"
      onClick={switchLanguage}
    >
      {/* Technical Corner Accents */}
      <span className="absolute top-0 left-0 h-1 w-1 border-t border-l border-brand" />
      <span className="absolute right-0 bottom-0 h-1 w-1 border-r border-b border-brand" />
      <Globe className="mr-2 h-3 w-3" />
      {locale === 'en' ? '[DE]' : '[EN]'}
    </Button>
  )
}
