// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { HeroStatus } from '../hero-status'

// Mock StatusIndicator
vi.mock('@/components/blueprint/status-indicator', () => ({
  StatusIndicator: ({ className }: any) => (
    <div data-testid="status-indicator" className={className} />
  ),
}))

// Mock BlueprintLabel
vi.mock('@/components/blueprint/blueprint-label', () => ({
  BlueprintLabel: () => <div data-testid="blueprint-label" />,
}))

describe('HeroStatus', () => {
  it('renders status indicator', () => {
    render(<HeroStatus location="Test Location" tagline="" />)
    expect(screen.getByTestId('status-indicator')).toBeInTheDocument()
  })

  it('renders location label', () => {
    render(<HeroStatus location="Test Location" tagline="" />)
    expect(screen.getByText('Test Location')).toBeInTheDocument()
  })
})
