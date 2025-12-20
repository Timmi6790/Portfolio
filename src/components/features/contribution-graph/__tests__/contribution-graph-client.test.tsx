import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ContributionGraphClient } from '../contribution-graph-client'
import type { ContributionCollection } from '@/models/github'

// Mock ContributionGraphView
vi.mock(
  '@/components/features/contribution-graph/contribution-graph-view',
  () => ({
    ContributionGraphView: ({ selectedYear, onYearChange }: any) => (
      <div>
        <div data-testid="selected-year">{selectedYear}</div>
        <button onClick={() => onYearChange(2023)}>Change Year</button>
      </div>
    ),
  })
)

const mockData: ContributionCollection = {
  2024: [{ date: '2024-01-01', count: 5, level: 1 }],
  2023: [{ date: '2023-01-01', count: 3, level: 1 }],
}

describe('ContributionGraphClient', () => {
  it('renders with initial year', () => {
    render(<ContributionGraphClient data={mockData} locale="en" />)
    // 2024 is the latest year, should be collected
    expect(screen.getByTestId('selected-year')).toHaveTextContent('2024')
  })

  it('updates selected year on interaction', () => {
    render(<ContributionGraphClient data={mockData} locale="en" />)

    fireEvent.click(screen.getByText('Change Year'))
    expect(screen.getByTestId('selected-year')).toHaveTextContent('2023')
  })
})
