import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectStats } from '@/components/sections/projects/project-stats'

describe('ProjectStats', (): void => {
  const mockStats: { forks: number; repositories: number; stars: number } = {
    forks: 10,
    repositories: 5,
    stars: 20,
  }

  it('renders all stats correctly', (): void => {
    render(<ProjectStats stats={mockStats} />)

    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Repositories')).toBeInTheDocument()

    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('Total Stars')).toBeInTheDocument()

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Total Forks')).toBeInTheDocument()
  })

  it('renders with correct typography classes', (): void => {
    render(<ProjectStats stats={mockStats} />)

    // Check for BlueprintText classes
    const repoLabel: HTMLElement = screen.getByText('Repositories')
    expect(repoLabel).toHaveClass('uppercase', 'tracking-widest', 'font-mono')
  })
})
