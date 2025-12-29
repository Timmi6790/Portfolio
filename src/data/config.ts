import { skills } from '@/data/skills'
import type { Skill } from '@/types/skill'

export interface SiteConfig {
  readonly contribution: {
    readonly yearsToShow: number
  }
  readonly description: string
  readonly email: string
  readonly featuredRepos: readonly string[]
  readonly fullName: string
  readonly jobTitle: string
  readonly legals: {
    readonly address: string
    readonly cloudflare: {
      readonly address: string
      readonly policyUrl: string
    }
    readonly hosting: {
      readonly name: string
      readonly address: string
      readonly policyUrl: string
    }
    readonly imprintLastChange: Date
    readonly logRetentionDays: number
    readonly sentryRetentionDays: number
    readonly privacyPolicyLastChange: Date
    readonly secondContact: string
    readonly sentry: {
      readonly address: string
      readonly policyUrl: string
    }
    readonly vatId: string
  }
  readonly location: string
  readonly name: string
  readonly resumeDirectory: string
  readonly seo: {
    readonly keywords: readonly string[]
  }
  readonly skills: {
    readonly resumeMinimumConfidence: number
    readonly sectionSideMinimumConfidence: number
    readonly languages: readonly Skill[]
    readonly frameworks: readonly Skill[]
    readonly buildTools: readonly Skill[]
    readonly infrastructure: readonly Skill[]
  }
  readonly socials: {
    readonly github: string
    readonly githubUsername: string
    readonly linkedin?: string
  }
  readonly title: string
  readonly url: string
  readonly username: string
}

export const siteConfig: SiteConfig = {
  contribution: { yearsToShow: 5 },
  description:
    'Portfolio of Tim - Software Developer specializing in Java, learning Rust and Next.js. Open-source contributor and passionate about building great software.',
  email: 'contact@tim-schoenle.de',
  featuredRepos: [
    'cloudflare-access-webhook-redirect',
    's3-bucket-perma-link',
    'Portfolio',
    'helm-charts',
  ],
  fullName: 'Tim Schönle',
  jobTitle: 'Software Developer',
  legals: {
    address:
      'tim-schoenle.de – Tim Schönle\n' +
      'c/o Online-Impressum.de #5279\n' +
      'Europaring 90\n' +
      '53757 Sankt Augustin',
    cloudflare: {
      address:
        'Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA',
      policyUrl: 'https://www.cloudflare.com/privacypolicy/',
    },
    hosting: {
      address: 'Daimlerstraße 25, 76185 Karlsruhe, Germany',
      name: 'netcup GmbH',
      policyUrl: 'https://www.netcup.de/kontakt/datenschutzerklaerung.php',
    },
    imprintLastChange: new Date('2025-12-15'),
    logRetentionDays: 7,
    privacyPolicyLastChange: new Date('2025-12-29'),
    secondContact:
      'https://mein.online-impressum.de/tim-schoenle-de/#Zweiter_Kontaktweg',
    sentry: {
      address: '45 Fremont Street, 8th Floor, San Francisco, CA 94105, USA',
      policyUrl: 'https://sentry.io/privacy/',
    },
    sentryRetentionDays: 90,
    vatId: 'DE347101415',
  },
  location: 'Germany',
  name: 'Tim',
  resumeDirectory: 'resume',
  seo: {
    keywords: [
      'Tim',
      'Software Developer',
      'Java',
      'Rust',
      'Next.js',
      'Portfolio',
      'Open Source',
      'Germany',
    ],
  },
  skills: {
    ...skills,
  },
  socials: {
    github: 'https://github.com/timschoenle',
    githubUsername: 'timschoenle',
    linkedin: 'https://www.linkedin.com/in/tim-schoenle',
  },
  title: 'Tim Schönle - Software Developer',

  url: 'https://tim-schoenle.de',
  username: 'timschoenle',
}
