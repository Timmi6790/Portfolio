export interface Skill {
  readonly confidence: number
  readonly name: string
}

export interface SiteConfig {
  readonly description: string
  readonly email: string
  readonly featuredRepos: readonly string[]
  readonly fullName: string
  readonly github: string
  readonly githubUsername: string
  readonly jobTitle: string
  readonly linkedin?: string
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
  readonly title: string
  readonly twitter: string
  readonly url: string
  readonly username: string
}

export const siteConfig: SiteConfig = {
  description:
    'Portfolio of Tim - Software Developer specializing in Java, learning Rust and Next.js. Open-source contributor and passionate about building great software.',
  email: 'contact@timmi6790.de',
  featuredRepos: [
    'cloudflare-access-webhook-redirect',
    's3-bucket-perma-link',
    'Portfolio',
    'helm-charts',
  ],
  fullName: 'Tim',
  github: 'https://github.com/Timmi6790',
  githubUsername: 'Timmi6790',

  jobTitle: 'Software Developer',
  linkedin: '',
  location: 'Germany',
  name: 'Tim',
  resumeDirectory: 'resume',
  seo: {
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
  },

  skills: {
    buildTools: [
      { confidence: 0.8, name: 'Maven' },
      { confidence: 0.9, name: 'Gradle' },
      { confidence: 0.9, name: 'Git' },
      { confidence: 0.9, name: 'GitHub Actions' },
      { confidence: 0.85, name: 'pnpm' },
    ],
    frameworks: [
      { confidence: 0.8, name: 'Spring Boot' },
      { confidence: 0.85, name: 'Next.js' },
      { confidence: 0.8, name: 'React' },
      { confidence: 0.8, name: 'Tailwind CSS' },
      { confidence: 0.75, name: 'gRPC' },
    ],
    infrastructure: [
      { confidence: 0.85, name: 'Docker' },
      { confidence: 0.8, name: 'Kubernetes' },
      { confidence: 0.8, name: 'ArgoCD' },
      { confidence: 0.75, name: 'Linux' },
      { confidence: 0.8, name: 'PostgreSQL' },
      { confidence: 0.75, name: 'TimescaleDB' },
      { confidence: 0.65, name: 'MongoDB' },
      { confidence: 0.6, name: 'Redis' },
    ],
    languages: [
      { confidence: 0.95, name: 'Java' },
      { confidence: 0.8, name: 'TypeScript' },
      { confidence: 0.7, name: 'JavaScript' },
      { confidence: 0.7, name: 'Rust' },
      { confidence: 0.3, name: 'Python' },
      { confidence: 0.25, name: 'Lua' },
    ],
    resumeMinimumConfidence: 0.6,
    sectionSideMinimumConfidence: 0.6,
  },
  title: 'Tim - Software Developer',

  twitter: '@Timmi6790',

  url: 'https://timmi6790.de',
  username: 'Timmi6790',
}
