// This file ensures type-safe environment variables

// eslint-disable-next-line unicorn/prevent-abbreviations
declare global {
  namespace NodeJS {
    interface ProcessEnvironment {
      // Enable bundle analyzer
      readonly ANALYZE?: 'false' | 'true'

      // Git SHA, used during build time to determine worker revisions
      readonly GIT_SHA?: string

      // GitHub API Token (optional but recommended)
      readonly GITHUB_TOKEN?: string

      // Public revision
      readonly NEXT_PUBLIC_REVISION: string

      // Next.js built-in
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

// Export empty object to make this a module
// eslint-disable-next-line unicorn/require-module-specifiers
export {}
