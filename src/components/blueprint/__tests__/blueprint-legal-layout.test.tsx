import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { BlueprintLegalLayout } from '../blueprint-legal-layout'

// Mock next-intl/routing Link
vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock BlueprintSectionTitle
vi.mock('../blueprint-section-title', () => ({
  BlueprintSectionTitle: ({ title }: { title: string }) => <h1>{title}</h1>,
}))

describe('BlueprintLegalLayout', () => {
  it('renders children and title correctly', () => {
    render(
      <BlueprintLegalLayout title="Legal Page">
        <p>Legal Content</p>
      </BlueprintLegalLayout>
    )

    expect(screen.getByText('Legal Page')).toBeInTheDocument()
    expect(screen.getByText('Legal Content')).toBeInTheDocument()
  })

  it('renders return to base button', () => {
    render(
      <BlueprintLegalLayout title="Legal Page">
        <p>Content</p>
      </BlueprintLegalLayout>
    )
    expect(screen.getByText('RETURN_TO_BASE')).toBeInTheDocument()
  })
})
