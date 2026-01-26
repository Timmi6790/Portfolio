import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest'
import React from 'react'

import { vi } from 'vitest'

/**
 * Light mocks for Next modules commonly imported by components.
 * Extend as needed.
 */
vi.mock('next/navigation', () => {
  const push = vi.fn()
  const replace = vi.fn()
  const prefetch = vi.fn()
  const back = vi.fn()
  const refresh = vi.fn()

  return {
    usePathname: () => '/',
    useRouter: () => ({ back, prefetch, push, refresh, replace }),
    useSearchParams: () => new URLSearchParams(),
  }
})

// Mock server-only
vi.mock('server-only', () => ({}))

// Render <Image> as a plain <img>
vi.mock('next/image', () => {
  return {
    default: (properties: any) => {
      const { alt, src, ...rest } = properties ?? {}
      const resolved = typeof src === 'string' ? src : src?.src
      return React.createElement('img', { alt, src: resolved, ...rest })
    },
  }
})

// Render <Link> as a plain <a>
vi.mock('next/link', () => {
  return {
    default: (properties: any) =>
      React.createElement('a', { ...properties }, properties.children),
  }
})

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock PointerEvent
if (!global.PointerEvent) {
  class PointerEvent extends Event {
    button: number
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
    altKey: boolean
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params)
      this.button = params.button ?? 0
      this.ctrlKey = params.ctrlKey ?? false
      this.metaKey = params.metaKey ?? false
      this.shiftKey = params.shiftKey ?? false
      this.altKey = params.altKey ?? false
    }
  }
  global.PointerEvent = PointerEvent as any
}

// Mock HTMLElement methods
if (typeof window !== 'undefined') {
  Object.assign(window.HTMLElement.prototype, {
    scrollIntoView: vi.fn(),
    releasePointerCapture: vi.fn(),
    hasPointerCapture: vi.fn(),
  })
}

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    const t: any = (key: string) => key
    t.rich = (key: string) => key
    t.raw = (key: string) => key
    t.markup = (key: string) => key
    t.has = () => true
    return t
  }),
  setRequestLocale: vi.fn(),
}))

// Mock @/lib/config
vi.mock('@/lib/config', () => ({
  SKILL_RENDER_AREAS: {
    RESUME: 'resume',
    SECTION: 'section',
    TECH_RADAR: 'tech-radar',
  },
  siteConfig: {
    contribution: { yearsToShow: 5 },
    description: 'Test Description',
    email: 'test@example.com',
    fullName: 'Test Full Name',
    jobTitle: 'Test Job Title',
    experience: [
      {
        company: 'Test Company',
        from: '2020',
        location: 'Test Location',
        title: 'Test Title',
        to: 'Present',
      },
    ],
    featuredRepos: [],
    legals: {
      address: 'Test Address',
      cloudflare: { address: '', policyUrl: '' },
      hosting: { address: '', name: '', policyUrl: '' },
      imprintLastChange: new Date(),
      logRetentionDays: 7,
      privacyPolicyLastChange: new Date(),
      secondContact: '',
      vatId: '',
    },
    location: 'Test Location',
    name: 'Test Name',
    resumeDirectory: 'resume',
    seo: { keywords: ['Test', 'Keywords'] },
    skills: {
      buildTools: [],
      frameworks: [],
      infrastructure: [],
      languages: [],
      resumeMinimumConfidence: 0.6,
      sectionSideMinimumConfidence: 0.6,
    },
    socials: {
      github: 'https://github.com/test',
      githubUsername: 'testuser',
      linkedin: 'https://linkedin.com/in/testuser',
    },
    title: 'Test Title',
    url: 'https://test.com',
    username: 'testuser',
  },
}))

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
}
