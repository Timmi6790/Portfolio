'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { getPathname } from '@/i18n/routing'
import { type Route } from 'next'

export function LanguageSwitcher() {
  const locale = useLocale()

  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'de' : 'en'
    router.push(
      getPathname({
        href: pathname,
        locale: newLocale,
      }) as Route
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="fixed top-4 right-4 z-50 bg-transparent"
    >
      <Globe className="mr-2 h-4 w-4" />
      {locale === 'en' ? 'DE' : 'EN'}
    </Button>
  )
}
