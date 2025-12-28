import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CloudflareWebAnalytics } from '../cloudflare-web-analytics'
import { environment } from '@/environment'

// Mock environment
vi.mock('@/environment', () => ({
  environment: {
    NODE_ENV: 'production',
    NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN: 'test-token',
  },
}))

// Mock next/script
vi.mock('next/script', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => <script {...props} />,
}))

describe('CloudflareWebAnalytics', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders script with correct token in production', () => {
    // Default mock is production + token
    const { container } = render(<CloudflareWebAnalytics />)

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const script = container.querySelector('script')
    expect(script).toBeInTheDocument()
    expect(script).toHaveAttribute('src', '/cf/rum/script.js')
    expect(script).toHaveAttribute(
      'data-cf-beacon',
      '{"send":"/cf/rum/beacon","token":"test-token"}'
    )
  })

  it('does not render if not in production', () => {
    // Override NODE_ENV
    environment.NODE_ENV = 'development'

    const { container } = render(<CloudflareWebAnalytics />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toBeNull()

    // Reset for other tests
    environment.NODE_ENV = 'production'
  })

  it('does not render if token is missing', () => {
    // Override Token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(environment as any).NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN = undefined

    const { container } = render(<CloudflareWebAnalytics />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toBeNull()

    // Reset
    environment.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN = 'test-token'
  })
})
