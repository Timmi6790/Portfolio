import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { type JSX } from 'react'

import { getTranslations } from 'next-intl/server'

import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { ContactColumns } from '@/components/sections/contact/contact-cards'
import { TransmissionEnd } from '@/components/sections/contact/contact-decoration'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

export type ContactSectionProperties = LocalePageProperties

export const ContactSection: AsyncPageFC<ContactSectionProperties> = async ({
  locale,
}: ContactSectionProperties): Promise<JSX.Element> => {
  const translations: Translations<'contact'> = await getTranslations({
    locale,
    namespace: 'contact',
  })
  const commonTranslations: Translations<'common'> = await getTranslations({
    locale,
    namespace: 'common',
  })

  let fingerprint: string | undefined
  try {
    const fingerprintPath: string = path.join(
      process.cwd(),
      'public/resume-fingerprint.json'
    )
    const fileContent: string = await readFile(fingerprintPath, 'utf8')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: { fingerprint: string } = JSON.parse(fileContent)
    fingerprint = data.fingerprint
  } catch {
    // Fingerprint file missing or invalid - verification disabled
  }

  return (
    <BlueprintContainer id="contact" isLazy={true}>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <BlueprintSectionTitle
          sectionLabel="// COMMUNICATION_CHANNELS"
          title={translations('title')}
        />

        <ContactColumns
          fingerprint={fingerprint}
          languageName={commonTranslations('languageName')}
          locale={locale}
          translations={translations}
        />

        <TransmissionEnd />
      </div>
    </BlueprintContainer>
  )
}

export default ContactSection
