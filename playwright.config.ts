import { defineConfig, devices } from '@playwright/test'

// eslint-disable-next-line eqeqeq
const isCI: boolean = process.env['CI'] != null

export default defineConfig({
  fullyParallel: true,
  globalSetup: './tests/global-setup.ts',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  reporter: [
    ['github'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  retries: isCI ? 2 : 0,
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm start',
    port: 3000,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
})
