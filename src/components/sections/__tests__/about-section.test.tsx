import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../about-section'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    return Object.assign(
      (key: string) => {
        if (key === 'competenciesLabel') {
          return 'Key Competencies'
        }
        return key
      },
      {
        raw: (key: string) => {
          if (key === 'competencies') {
            return [
              'Backend Architecture',
              'Cloud Native',
              'Open Source',
              'System Design',
            ]
          }
          return []
        },
        rich: (key: string, options?: any) => {
          if (options?.highlight) {
            return options.highlight(`highlighted-${key}`)
          }
          return key
        },
      }
    )
  }),
}))

describe('AboutSection', () => {
  it('renders section with title', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('title')).toBeDefined()
  })

  it('renders summary content', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    // The summary is rendered via the rich() call
    expect(screen.getByText('highlighted-summary')).toBeDefined()
  })

  it('renders competency badges', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Backend Architecture')).toBeDefined()
    expect(screen.getByText('Cloud Native')).toBeDefined()
    expect(screen.getByText('Open Source')).toBeDefined()
    expect(screen.getByText('System Design')).toBeDefined()
  })

  it('renders Key Competencies heading', async () => {
    const Component = await AboutSection({ locale: 'en' })
    render(Component)

    expect(screen.getByText('Key Competencies')).toBeDefined()
  })
})
