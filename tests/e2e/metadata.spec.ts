import { test, expect } from '@playwright/test'

test('viewport, OG, and Twitter metadata present', async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}/`)

  const viewport = page.locator('meta[name="viewport"]')
  await expect(viewport).toHaveAttribute('content', /width=device-width/)

  // Open Graph
  await expect(
    page.locator('meta[property="og:image"], meta[name="og:image"]')
  ).toHaveAttribute('content', /\/og-image\.jpg$/)

  // Twitter
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    /summary_large_image/
  )
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    /\/og-image\.jpg$/
  )
})
