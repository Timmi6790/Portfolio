import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContactSection } from '../contact-section'

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Send: () => null,
  Mail: () => null,
  Github: () => null,
  Linkedin: () => null,
  Eye: () => null,
  FileText: () => null,
  GitBranch: () => null,
  MapPin: () => null,
}))

describe('ContactSection', () => {
  it('can be imported', async () => {
    const { ContactSection } = await import('../contact-section')
    expect(ContactSection).toBeDefined()
  })

  it('is a server component', async () => {
    const { ContactSection } = await import('../contact-section')
    expect(typeof ContactSection).toBe('function')
  })

  it('renders contact links', async () => {
    const Component = await ContactSection({ locale: 'en' })
    render(Component)

    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toBeDefined()
    expect(githubLink.getAttribute('href')).toContain('github.com')
  })
})
