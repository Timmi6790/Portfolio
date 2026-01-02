import { type JSX } from 'react'

import { ArrowDown } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { BlueprintFrame } from '@/components/blueprint/blueprint-frame'
import { BlueprintLabel } from '@/components/blueprint/blueprint-label'
import { BlueprintSectionWrapper } from '@/components/blueprint/blueprint-primitives'
import { BlueprintSectionTitle } from '@/components/blueprint/blueprint-section-title'
import { HeroActions } from '@/components/sections/hero/hero-actions'
import { HeroStatus } from '@/components/sections/hero/hero-status'
import {
  DynamicCommandPaletteHint,
  DynamicScrollSnapPairController,
} from '@/components/sections/hero/loading-wrappers'
import { siteConfig } from '@/data/config'
import type { AsyncPageFC } from '@/types/fc'
import type { LocalePageProperties, Translations } from '@/types/i18n'

/* ── props ─────────────────────────────────────────────────────────────── */

type HeroSectionProperties = LocalePageProperties

/* ── main ──────────────────────────────────────────────────── */

const GRID_REF: string = 'GRID_REF_X-99'

export const HeroSection: AsyncPageFC<HeroSectionProperties> = async ({
  locale,
}: HeroSectionProperties): Promise<JSX.Element> => {
  const translations: Translations<string> = await getTranslations({ locale })
  const heroTranslations: Translations<'hero'> = await getTranslations({
    locale,
    namespace: 'hero',
  })

  return (
    <BlueprintSectionWrapper componentId="hero">
      <BlueprintFrame
        overlay={
          <div className="absolute bottom-[calc(var(--app-padding)+1rem)] left-1/2 z-20 -translate-x-1/2 animate-bounce cursor-pointer text-brand/50 transition-colors hover:text-brand">
            <a aria-label="Scroll to About Section" href="#about">
              <ArrowDown className="h-6 w-6" />
            </a>
          </div>
        }
      >
        <div className="relative z-10 container flex min-h-[60vh] flex-col items-center justify-center">
          {/* Floating tech markings */}
          <BlueprintLabel className="writing-vertical-rl absolute top-20 left-20 hidden font-mono text-[10px] text-brand/40 select-none md:block">
            {GRID_REF}
          </BlueprintLabel>
          <DynamicCommandPaletteHint />

          <BlueprintSectionTitle
            as="h1"
            greeting={heroTranslations('greeting')}
            sectionLabel="// MAIN_ENTRY_POINT"
            subtitle={translations('personalInfo.jobTitle')}
            title={siteConfig.fullName}
          />

          <HeroStatus
            location={heroTranslations('location', {
              country: translations('personalInfo.country'),
            })}
            tagline={heroTranslations('tagline')}
          />

          <HeroActions
            contactText={heroTranslations('contact')}
            githubLabel={translations('common.socials.github')}
          />
        </div>

        <DynamicScrollSnapPairController
          bottomSectionId="about"
          topSectionId="hero"
        />
      </BlueprintFrame>
    </BlueprintSectionWrapper>
  )
}

export default HeroSection
