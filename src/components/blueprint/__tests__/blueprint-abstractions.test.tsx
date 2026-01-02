// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Folder } from 'lucide-react'

import { BlueprintIcon } from '@/components/blueprint/blueprint-icon'
import { StatusIndicator } from '@/components/blueprint/status-indicator'
import { BlueprintTechButton } from '@/components/blueprint/blueprint-tech-button'

// Mock next/link
vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// Mock BlueprintCorners
vi.mock('@/components/blueprint/blueprint-decoration', () => ({
  BlueprintCorners: () => <svg data-testid="blueprint-corners" />,
}))

describe('BlueprintIcon', () => {
  it('renders with default classes', () => {
    const { container } = render(<BlueprintIcon icon={Folder} />)
    // lucide icons render an svg
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-5 w-5 text-brand')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <BlueprintIcon className="text-red-500" icon={Folder} />
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-red-500')
  })
})

describe('StatusIndicator', () => {
  it('renders with animate-pulse and rounded-full', () => {
    const { container } = render(<StatusIndicator />)
    const div = container.firstChild
    expect(div).toHaveClass('animate-pulse rounded-full')
  })

  it('accepts custom className', () => {
    const { container } = render(<StatusIndicator className="bg-red-500" />)
    const div = container.firstChild
    expect(div).toHaveClass('bg-red-500')
  })
})

describe('BlueprintTechButton', () => {
  it('renders as button by default', () => {
    render(<BlueprintTechButton>Click Me</BlueprintTechButton>)
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
    expect(screen.getByTestId('blueprint-corners')).toBeInTheDocument()
  })

  it('renders as link when href is provided', () => {
    render(<BlueprintTechButton href="/test">Link Me</BlueprintTechButton>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveTextContent('Link Me')
    expect(screen.getByTestId('blueprint-corners')).toBeInTheDocument()
  })

  it('handles onClick', async () => {
    const handleClick = vi.fn()
    render(
      <BlueprintTechButton onClick={handleClick}>Click Me</BlueprintTechButton>
    )
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
