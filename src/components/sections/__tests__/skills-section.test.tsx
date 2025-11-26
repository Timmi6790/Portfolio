import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillsSection } from '../skills-section'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}))

// Mock TechRadar component to avoid async rendering issues in tests
vi.mock('@/components/sections/tech-radar/tech-radar', () => ({
  TechRadar: vi.fn(() => <div data-testid="tech-radar-mock">TechRadar</div>),
}))

// Mock config
vi.mock('@/lib/config', () => ({
  SKILL_RENDER_AREAS: {
    RESUME: 'resume',
    SECTION: 'section',
    TECH_RADAR: 'tech-radar',
  },
  siteConfig: {
    skills: {
      languages: [
        { name: 'TypeScript', confidence: 0.9 },
        { name: 'Rust', confidence: 0.6 },
      ],
      frameworks: [
        { name: 'React', confidence: 0.85 },
        { name: 'Next.js', confidence: 0.8 },
      ],
      infrastructure: [
        { name: 'Docker', confidence: 0.7 },
        { name: 'Linux', confidence: 0.8 },
      ],
      buildTools: [
        { name: 'Git', confidence: 0.85 },
        { name: 'VS Code', confidence: 0.9 },
      ],
      sectionSideMinimumConfidence: 0,
      resumeMinimumConfidence: 0,
    },
  },
}))

describe('Skills_section', () => {
  it('renders section with title', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('title')).toBeDefined()
  })

  it('renders languages', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('TypeScript')).toBeDefined()
    expect(screen.getByText('Rust')).toBeDefined()
  })

  it('renders frameworks', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Next.js')).toBeDefined()
  })

  it('renders infrastructure', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Docker')).toBeDefined()
    expect(screen.getByText('Linux')).toBeDefined()
  })

  it('renders build tools', async () => {
    const Component = await SkillsSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Git')).toBeDefined()
    expect(screen.getByText('VS Code')).toBeDefined()
  })
})
