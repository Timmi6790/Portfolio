'use client'

import { type JSX } from 'react'

import { type Locale, useLocale } from 'next-intl'

import { Globe } from 'lucide-react'

import { BlueprintTechButton } from '@/components/blueprint/blueprint-tech-button'
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
    <BlueprintTechButton
      className="fixed top-[var(--app-padding)] right-[var(--app-padding)]"
      onClick={switchLanguage}
    >
      <Globe className="mr-2 h-3 w-3" />
      {locale === 'en' ? '[DE]' : '[EN]'}
    </BlueprintTechButton>
  )
}
