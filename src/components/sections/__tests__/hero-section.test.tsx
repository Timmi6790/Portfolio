import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'

import { HeroSection } from '../hero-section'

// Mock overrides if necessary
vi.mock('@/lib/config', () => ({
  siteConfig: {
    email: 'test@example.com',
    fullName: 'Test Name',
    socials: {
      github: 'https://github.com/test',
    },
  },
}))

describe('HeroSection', () => {
  it('renders hero content', async () => {
    const Component = await HeroSection({ locale: 'en-US' })
    render(Component)

    // Check for actual rendered content
    // Note: BlueprintTitle transforms title to uppercase in JS or CSS
    expect(screen.getByText(/test name/i)).toBeDefined()
    expect(screen.getByText(/personalInfo.jobTitle/i)).toBeDefined()
    expect(screen.getByText('// MAIN_ENTRY_POINT')).toBeDefined()

    // Check for links
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink.getAttribute('href')).toBe('https://github.com/test')

    const emailLink = screen.getByRole('link', { name: /contact/i })
    expect(emailLink.getAttribute('href')).toBe('mailto:test@example.com')
  })
})
