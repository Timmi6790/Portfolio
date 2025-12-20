/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable sonarjs/deprecation */
import { type JSX } from 'react'

import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { BlueprintCard } from '@/components/blueprint/blueprint-card'
import { BlueprintContainer } from '@/components/blueprint/blueprint-container'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { siteConfig } from '@/lib/config'
import type { AsyncPageFC, FCStrict } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

/* ── types ─────────────────────────────────────────────────────────────── */

const TRANSMISSION_END: string = ':: END_OF_TRANSMISSION ::'

interface ContactItemProperties {
  readonly href: string
  readonly icon: JSX.Element
  readonly label: string
  readonly subLabel?: string
}

/* ── subcomponents ─────────────────────────────────────────────────────── */

const ContactItem: FCStrict<ContactItemProperties> = ({
  href,
  icon,
  label,
  subLabel,
}: ContactItemProperties): JSX.Element => (
  <a
    className="group hover:shadow-[0_0_10px_color-mix(in srgb, var(--brand), transparent 90%)] relative flex items-center gap-4 border border-brand/30 bg-brand/5 p-4 transition-all hover:bg-brand/10"
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-none border border-brand bg-blueprint-bg text-brand shadow-[0_0_5px_#60A5FA]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="font-mono text-sm font-bold tracking-wide text-blueprint-text transition-colors group-hover:text-brand">
        {label}
      </span>
      {Boolean(subLabel) && (
        <span className="font-mono text-xs tracking-wider text-blueprint-muted uppercase">
          {subLabel}
        </span>
      )}
    </div>

    {/* Corner Accents */}
    <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-brand" />
    <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-brand" />
  </a>
)

interface ContactColumnsProperties {
  readonly locale: string
  readonly translations: Translations<'contact'>
}

const ContactColumns: FCStrict<ContactColumnsProperties> = ({
  locale,
  translations,
}: ContactColumnsProperties): JSX.Element => (
  <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
    {/* Direct Comms Column */}
    <BlueprintCard label="DIRECT_UPLINK" noPadding={true}>
      <div className="flex flex-col gap-4 p-6">
        <ContactItem
          href={`mailto:${siteConfig.email}`}
          icon={<Mail className="h-5 w-5" />}
          label={translations('email')}
          subLabel={siteConfig.email}
        />
        <ContactItem
          href={`/resume-${locale}.pdf`}
          icon={<Download className="h-5 w-5" />}
          label={translations('downloadResume')}
          subLabel={translations('pdfVersion', {
            language: locale === 'en' ? 'ENGLISH' : 'GERMAN',
          })}
        />
      </div>
    </BlueprintCard>

    {/* Network Column */}
    <BlueprintCard label="NETWORK_NODES" noPadding={true}>
      <div className="flex flex-col gap-4 p-6">
        <ContactItem
          href={siteConfig.socials.github}
          icon={<Github className="h-5 w-5" />}
          label={translations('github')}
          subLabel="SOURCE_CONTROL"
        />
        {Boolean(siteConfig.socials.linkedin) && (
          <ContactItem
            href={siteConfig.socials.linkedin ?? ''}
            icon={<Linkedin className="h-5 w-5" />}
            label={translations('linkedin')}
            subLabel="PROFESSIONAL_NET"
          />
        )}
      </div>
    </BlueprintCard>
  </div>
)

/* ── main ──────────────────────────────────────────────────── */

type ContactSectionProperties = LocalePageProperties

export const ContactSection: AsyncPageFC<ContactSectionProperties> = async ({
  locale,
}: ContactSectionProperties): Promise<JSX.Element> => {
  const translations: Translations<'contact'> = await getTranslations({
    locale,
    namespace: 'contact',
  })

  return (
    <BlueprintContainer id="contact" isLazy={true}>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <BlueprintSectionTitle
          sectionLabel="// COMMUNICATION_CHANNELS"
          title={translations('title')}
        />

        <ContactColumns locale={locale} translations={translations} />

        <div className="mt-16 text-center opacity-60 select-none">
          <svg
            aria-hidden="true"
            className="inline-block h-10 w-64 overflow-visible"
            role="img"
          >
            <rect
              className="fill-blueprint-bg stroke-brand/30"
              height="100%"
              rx="2"
              strokeWidth="1"
              width="100%"
              x="0"
              y="0"
            />
            <text
              className="fill-brand font-mono text-[10px] tracking-[0.2em] uppercase"
              dominantBaseline="middle"
              textAnchor="middle"
              x="50%"
              y="50%"
            >
              {TRANSMISSION_END}
            </text>
          </svg>
        </div>
      </div>
    </BlueprintContainer>
  )
}

export default ContactSection
