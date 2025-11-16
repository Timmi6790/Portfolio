import { test, expect } from '@playwright/test'

test('health endpoint is dynamic and uncacheable', async ({
  request,
  baseURL,
}) => {
  const res = await request.get(`${baseURL}/api/health`)
  expect(res.status()).toBe(200)

  const body = await res.json()
  expect(body.status).toBe('healthy')
  expect(typeof body.timestamp).toBe('string')

  const cache = res.headers()['cache-control'] ?? ''
  expect(cache.toLowerCase()).toContain('no-store')
})
