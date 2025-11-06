export interface SiteConfig {
  readonly name: string
  readonly fullName: string
  readonly description: string
  readonly username: string
  readonly title: string
  readonly email: string
  readonly github: string
  readonly twitter: string
  readonly url: string
  readonly githubUsername: string
  readonly featuredRepos: readonly string[]
  readonly seo: {
    readonly keywords: readonly string[]
  }
  readonly skills: {
    readonly expertise: readonly string[]
    readonly learning: readonly string[]
    readonly tools: readonly string[]
  }
}

export const siteConfig: SiteConfig = {
  name: 'Tim',
  fullName: 'Tim Schönle',
  description:
    'Portfolio of Tim - Software Developer specializing in Java, learning Rust and Next.js. Open-source contributor and passionate about building great software.',
  username: 'Timmi6790',
  title: 'Tim - Software Developer',

  email: 'contact@timmi6790.de',
  github: 'https://github.com/Timmi6790',
  twitter: '@Timmi6790',
  url: 'https://timmi6790.de',

  githubUsername: 'Timmi6790',
  featuredRepos: [
    'cloudflare-access-webhook-redirect',
    's3-bucket-perma-link',
    'helm-charts',
  ],

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
    expertise: ['Java', 'Spring Boot', 'Maven', 'Gradle'],
    learning: ['Rust', 'Next.js', 'React', 'TypeScript'],
    tools: ['Git', 'GitHub', 'Docker', 'Linux'],
  },
}
