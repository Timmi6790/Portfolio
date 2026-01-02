import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import TechRadarTooltip from '@/components/sections/tech-radar/tech-radar-tooltip'
import type { Blip } from '@/types/tech-radar'

// Mock the context hook
vi.mock('@/components/sections/tech-radar/hover-context', (): any => ({
  useHover: (): { hoveredBlip: string } => ({ hoveredBlip: 'react' }),
}))

// Mock Config
vi.mock('@/components/sections/tech-radar/config', (): any => ({
  RADAR_CONFIG: {
    blips: { hoverScale: 1.5, size: 10 },
    viewBox: { height: 500, min: 0, width: 500 },
  },
}))

describe('TechRadarTooltip', (): void => {
  const mockBlips: Blip[] = [
    {
      angle: 0,
      iconName: 'react',
      id: 'react',
      name: 'React',
      quadrant: 'languages',
      radius: 0,
      xCoordinate: 100,
      yCoordinate: 100,
    },
  ]

  beforeEach((): void => {
    // Mock Element.prototype.getBoundingClientRect to return non-zero values
    Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: vi.fn(
        (): DOMRect =>
          ({
            bottom: 500,
            height: 500,
            left: 0,
            right: 500,
            toJSON: (): object => ({}),
            top: 0,
            width: 500,
            x: 0,
            y: 0,
          }) as DOMRect
      ),
    })
  })

  it('renders tooltip content correctly', (): void => {
    // Wrap in a div with an SVG so the hook finds it
    render(
      <div>
        <svg />
        <TechRadarTooltip blips={mockBlips} />
      </div>
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    // It should render "languages" but uppercased by CSS
    expect(screen.getByText('languages')).toBeInTheDocument()
  })

  it('uses BlueprintText for quadrants', (): void => {
    render(
      <div>
        <svg />
        <TechRadarTooltip blips={mockBlips} />
      </div>
    )
    const quadrant: HTMLElement = screen.getByText('languages')
    // Check that it uses the BlueprintText functionality (uppercase class)
    expect(quadrant).toHaveClass('uppercase', 'tracking-widest', 'font-mono')
  })
})
