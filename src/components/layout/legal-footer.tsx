'use server'

import { type JSX } from 'react'

import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/routing'
import { siteConfig } from '@/lib/config'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

type LegalFooterProperties = LocalePageProperties

export const LegalFooter: AsyncPageFC<LegalFooterProperties> = async ({
  locale,
}: LegalFooterProperties): Promise<JSX.Element> => {
  const translations: Translations<''> = await getTranslations({ locale })
  const currentYear: number = new Date().getFullYear()
  const revision: string | undefined = process.env['NEXT_PUBLIC_REVISION']

  return (
    <footer className="mt-8 flex flex-col items-center gap-2 pb-8 text-center text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>
          {translations('common.footer.copyright', {
            name: siteConfig.fullName,
            year: currentYear,
          })}
        </span>
        {/* eslint-disable-next-line react/jsx-no-literals */}
        <span className="hidden sm:inline">•</span>
        <span>{`v${revision ?? ''}`}</span>
      </div>
      <nav aria-label="Legal navigation" className="flex justify-center gap-4">
        <Link
          className="transition-colors hover:text-primary hover:underline"
          href="/imprint"
          prefetch={false}
        >
          {translations('imprint.title')}
        </Link>
        <Link
          className="transition-colors hover:text-primary hover:underline"
          href="/privacy"
          prefetch={false}
        >
          {translations('privacy.title')}
        </Link>
      </nav>
    </footer>
  )
}
