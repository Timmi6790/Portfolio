import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PerformanceMonitor } from '../performance-monitor'

// Mock useReportWebVitals
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let reportCallback: (metric: any) => void = () => {}
vi.mock('next/web-vitals', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useReportWebVitals: (cb: any) => {
    reportCallback = cb
  },
}))

// Mock window.performance
const mockGetEntriesByType = vi.fn()
Object.defineProperty(window, 'performance', {
  value: {
    getEntriesByType: mockGetEntriesByType,
  },
  writable: true,
})

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    mockGetEntriesByType.mockReturnValue([])
    reportCallback = () => {}
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<PerformanceMonitor />)
    expect(screen.getByText('SYS_METRICS :: LIVE')).toBeInTheDocument()
    expect(screen.getByText('GATHERING_DATA...')).toBeInTheDocument()
  })

  it('renders metrics when reported', async () => {
    render(<PerformanceMonitor />)

    await act(async () => {
      reportCallback({ name: 'LCP', value: 1200 })
      reportCallback({ name: 'CLS', value: 0.05 })
    })

    expect(screen.getByText('LCP')).toBeInTheDocument()
    expect(screen.getByText(/1200/)).toBeInTheDocument()
    expect(screen.getByText('CLS')).toBeInTheDocument()
    expect(screen.getByText(/0.05/)).toBeInTheDocument()
  })

  it('renders load time if navigation timing is available', () => {
    mockGetEntriesByType.mockReturnValue([
      {
        loadEventEnd: 200,
        startTime: 100,
        toJSON: () => {},
      } as PerformanceNavigationTiming,
    ])

    render(<PerformanceMonitor />)

    expect(screen.getByText('LOAD')).toBeInTheDocument()
    expect(screen.getByText(/100/)).toBeInTheDocument()
  })

  it('colors metrics correctly based on thresholds', async () => {
    render(<PerformanceMonitor />)

    await act(async () => {
      reportCallback({ name: 'LCP', value: 3000 })
    })

    const lcpValue = screen.getByText(/3000/)
    // eslint-disable-next-line testing-library/no-node-access
    expect(lcpValue).toHaveClass('text-red-400')
  })
})
