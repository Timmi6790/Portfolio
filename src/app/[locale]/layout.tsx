import type React from 'react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../globals.css'
import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { CookieBanner } from '@/components/cookie-banner'
import { CommandPalette } from '@/components/command-palette'
import { EasterEggs } from '@/components/easter-eggs'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NextIntlClientProvider, hasLocale, type Locale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/config'
import { LegalFooter } from '@/components/legal-footer'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

const geist = Geist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist-mono',
})
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-source-serif',
})

// Dynamic metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: 'Tim - Software Developer Portfolio',
      template: '%s | Tim - Software Developer',
    },
    description:
      'Portfolio of Tim (Timmi6790) - Software Developer specializing in Java, learning Rust and Next.js. Open-source contributor and passionate about building great software.',
    keywords: [
      'Tim',
      'Timmi6790',
      'Software Developer',
      'Java',
      'Rust',
      'Next.js',
      'Portfolio',
      'Open Source',
      'Germany',
    ],
    authors: [{ name: 'Tim', url: siteConfig.url }],
    creator: 'Tim (Timmi6790)',
    publisher: 'Tim (Timmi6790)',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? ['de_DE'] : ['en_US'],
      url: `https://${siteConfig.url}/${locale}`,
      title: 'Tim - Software Developer Portfolio',
      description:
        'Portfolio of Tim (Timmi6790) - Software Developer specializing in Java, learning Rust and Next.js',
      siteName: 'Tim Portfolio',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Tim - Software Developer Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tim - Software Developer Portfolio',
      description:
        'Portfolio of Tim (Timmi6790) - Software Developer specializing in Java, learning Rust and Next.js',
      images: ['/og-image.png'],
      creator: '@Timmi6790',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        de: `${siteConfig.url}/de`,
      },
    },
  }
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geist.variable} ${geistMono.variable} ${sourceSerif.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider defaultTheme="dark">
            <ThemeToggle />
            <LanguageSwitcher />
            <CommandPalette />
            <EasterEggs />
            {children}
            <CookieBanner />
            <LegalFooter locale={locale} />
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
