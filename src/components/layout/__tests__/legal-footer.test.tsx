import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LegalFooter } from '../legal-footer'

// Mock next-intl
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}))

// Mock routing Link
vi.mock('@/i18n/routing', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Link: ({ children, href, prefetch, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock environment
vi.mock('@/environment', () => ({
  environment: {
    NEXT_PUBLIC_REVISION: 'abc1234',
  },
}))

describe('LegalFooter', () => {
  it('renders footer', async () => {
    const Component = await LegalFooter({ locale: 'en' })
    render(Component)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeDefined()
  })

  it('renders imprint link', async () => {
    const Component = await LegalFooter({ locale: 'en' })
    render(Component)

    expect(screen.getByText(/imprint.title/i)).toBeDefined()
  })

  it('renders privacy link', async () => {
    const Component = await LegalFooter({ locale: 'en' })
    render(Component)

    expect(screen.getByText(/privacy.title/i)).toBeDefined()
  })

  it('renders copyright and version', async () => {
    const Component = await LegalFooter({ locale: 'en' })
    render(Component)

    expect(screen.getByText(/ALL_RIGHTS_RESERVED/i)).toBeDefined()
    expect(screen.getByText(/vabc1234/i)).toBeDefined()
  })
})
