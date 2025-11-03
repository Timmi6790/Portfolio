'use server'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { type Locale } from 'next-intl'

export async function BackToHome({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'imprint' })

  return (
    <Link href={`/`}>
      <Button variant="ghost" className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('backHome')}
      </Button>
    </Link>
  )
}
