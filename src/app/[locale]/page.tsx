import { type ComponentType, type JSX } from 'react'

import { type Locale } from 'next-intl'

import { setRequestLocale } from 'next-intl/server'

import { AboutSection } from '@/components/sections/about/about-section'
import type { ContactSectionProperties } from '@/components/sections/contact/contact-section'
import type { ExperienceSectionProperties } from '@/components/sections/experience/experience-section'
import { HeroSection } from '@/components/sections/hero/hero-section'
import type { ProjectsSectionProperties } from '@/components/sections/projects/projects-section'
import type { SkillsSectionProperties } from '@/components/sections/skills/skills-section'
import { ensureLocaleFromParameters } from '@/i18n/locale'
import { createLazySection } from '@/lib/create-lazy-section'
import type { UnparsedLocalePageProperties } from '@/types/i18n'
import type { PageParameters, RoutePageFC } from '@/types/page'

// Lazy load below-the-fold sections to reduce initial DOM size
const SkillsSection: ComponentType<SkillsSectionProperties> = createLazySection(
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  () => import('@/components/sections/skills/skills-section')
)

const ProjectsSection: ComponentType<ProjectsSectionProperties> =
  createLazySection(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    () => import('@/components/sections/projects/projects-section')
  )

const ExperienceSection: ComponentType<ExperienceSectionProperties> =
  createLazySection(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    () => import('@/components/sections/experience/experience-section')
  )

const ContactSection: ComponentType<ContactSectionProperties> =
  createLazySection(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    () => import('@/components/sections/contact/contact-section'),
    '40vh'
  )

type HomeProperties = UnparsedLocalePageProperties

const Home: RoutePageFC<HomeProperties> = async ({
  params,
}: PageParameters<HomeProperties>): Promise<JSX.Element> => {
  const locale: Locale = await ensureLocaleFromParameters(params)
  setRequestLocale(locale)

  return (
    <main className="bg-background">
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <SkillsSection locale={locale} />
      <ProjectsSection locale={locale} />
      <ExperienceSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
  )
}

export default Home
