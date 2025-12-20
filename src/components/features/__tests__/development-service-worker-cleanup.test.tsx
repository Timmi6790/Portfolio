import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { DevelopmentServiceWorkerGuard } from '../development-service-worker-cleanup'

// Mock environment
vi.mock('@/environment', () => ({
  environment: {
    NODE_ENV: 'development',
  },
}))

describe('DevelopmentServiceWorkerGuard', () => {
  let mockGetRegistrations: any
  let mockUnregister: any
  let mockReload: any

  beforeEach(() => {
    mockUnregister = vi.fn().mockResolvedValue(true)
    mockGetRegistrations = vi
      .fn()
      .mockResolvedValue([{ unregister: mockUnregister }])

    // Mock navigator.serviceWorker
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        getRegistrations: mockGetRegistrations,
      },
      writable: true,
    })

    // Mock window.location.reload
    mockReload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing', () => {
    const { container } = render(<DevelopmentServiceWorkerGuard />)
    expect(container.firstChild).toBeNull()
  })

  it('cleans up service workers in development', async () => {
    render(<DevelopmentServiceWorkerGuard />)

    // Wait for useEffect
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(mockGetRegistrations).toHaveBeenCalled()
    expect(mockUnregister).toHaveBeenCalled()
    // Cannot easily test window.reload in jsdom without more complex mocking,
    // but verifying unregister is the main goal
  })
})
