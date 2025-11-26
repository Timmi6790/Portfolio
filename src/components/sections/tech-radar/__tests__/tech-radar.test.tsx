import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TechRadar } from '../tech-radar'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}))

const mockSkills = {
  languages: [
    { name: 'TypeScript', confidence: 0.9 },
    { name: 'JavaScript', confidence: 0.8 },
  ],
  frameworks: [
    { name: 'React', confidence: 0.85 },
    { name: 'Next.js', confidence: 0.8 },
  ],
  infrastructure: [
    { name: 'Docker', confidence: 0.7 },
    { name: 'Kubernetes', confidence: 0.65 },
  ],
  buildTools: [
    { name: 'Git', confidence: 0.85 },
    { name: 'Maven', confidence: 0.75 },
  ],
}

describe('TechRadar', () => {
  it('renders without crashing', async () => {
    const Component = await TechRadar({ locale: 'en', ...mockSkills })
    const { container } = render(Component)

    expect(container).toBeDefined()
  })

  it('renders SVG element', async () => {
    const Component = await TechRadar({ locale: 'en', ...mockSkills })
    const { container } = render(Component)

    const svg = container.querySelector('svg')
    expect(svg).toBeDefined()
  })

  it('renders quadrant labels', async () => {
    const Component = await TechRadar({ locale: 'en', ...mockSkills })
    render(Component)

    expect(screen.getByText('languages')).toBeDefined()
    expect(screen.getByText('frameworks')).toBeDefined()
    expect(screen.getByText('infrastructure')).toBeDefined()
    expect(screen.getByText('buildTools')).toBeDefined()
  })

  it('renders correct viewBox', async () => {
    const Component = await TechRadar({ locale: 'en', ...mockSkills })
    const { container } = render(Component)

    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('-100 -100 200 200')
  })

  it('renders background circles', async () => {
    const Component = await TechRadar({ locale: 'en', ...mockSkills })
    const { container } = render(Component)

    const circles = container.querySelectorAll('circle')
    expect(circles.length).toBeGreaterThan(0)
  })
})
