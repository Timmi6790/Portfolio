import { HeroSection } from '@/components/hero-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { ExperienceSection } from '@/components/experience-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import {
  getContributionData,
  getFeaturedProjects,
  getUserStats,
} from '@/lib/github'
import { siteConfig } from '@/lib/config'
import type { Metadata } from 'next'
import { AboutSection } from '@/components/about-section'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from 'next-intl'

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.name,
    description: siteConfig.description,
    alternates: {
      canonical: siteConfig.url,
      languages: {
        'en-US': `${siteConfig.url}/en`,
        'de-DE': `${siteConfig.url}/de`,
      },
    },
    openGraph: {
      type: 'website',
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [`${siteConfig.url}/og-image.jpg`],
    },
    other: {
      'application-ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.name,
        alternateName: siteConfig.username,
        url: siteConfig.url,
        image: `${siteConfig.url}/og-image.jpg`,
        sameAs: [siteConfig.github],
        jobTitle: siteConfig.title,
        worksFor: {
          '@type': 'Organization',
          name: 'Independent',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'DE',
        },
        email: siteConfig.email,
        knowsAbout: [
          'Java',
          'Rust',
          'Next.js',
          'Software Development',
          'Open Source',
        ],
      }),
    },
  }
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Fetch GitHub data in parallel for better performance
  const [projects, stats, contributionData] = await Promise.all([
    getFeaturedProjects(siteConfig.githubUsername, siteConfig.featuredRepos),
    getUserStats(siteConfig.githubUsername),
    getContributionData(siteConfig.githubUsername),
  ])

  return (
    <>
      <main className="bg-background h-screen snap-y snap-mandatory overflow-y-scroll">
        <HeroSection locale={locale} />
        <div className="snap-start">
          <AboutSection locale={locale} />
          <SkillsSection locale={locale} />
          <ProjectsSection
            locale={locale}
            githubUsername={siteConfig.githubUsername}
            projects={projects}
            stats={stats}
            contributionData={contributionData}
          />
          <ExperienceSection locale={locale} />
          <TestimonialsSection locale={locale} />
          <ContactSection locale={locale} />
        </div>
      </main>
    </>
  )
}
