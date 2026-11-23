import { defineConfig, devices } from '@playwright/test'
import {
  CI_RETRIES,
  DESKTOP_VIEWPORT,
  E2E_BASE_URL,
  E2E_PORT,
  EXPECT_TIMEOUT_MS,
  LOCAL_RETRIES,
  MAX_DIFF_PIXEL_RATIO,
  TEST_TIMEOUT_MS,
  WEB_SERVER_TIMEOUT_MS
} from './tests/constants/e2e'

const isCI = process.env.CI !== undefined

const desktop = { ...devices['Desktop Chrome'], viewport: DESKTOP_VIEWPORT }
const mobile = { ...devices['Pixel 7'] }

export default defineConfig({
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? CI_RETRIES : LOCAL_RETRIES,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  timeout: TEST_TIMEOUT_MS,
  expect: {
    timeout: EXPECT_TIMEOUT_MS,
    toHaveScreenshot: {
      maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
      animations: 'disabled',
      caret: 'hide'
    }
  },
  snapshotPathTemplate:
    '{testDir}/__screenshots__/{platform}/{projectName}/{arg}{ext}',
  use: {
    baseURL: E2E_BASE_URL,
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', testDir: './tests/e2e', use: desktop },
    { name: 'mobile', testDir: './tests/e2e', use: mobile },
    { name: 'visual-desktop', testDir: './tests/visual', use: desktop },
    { name: 'visual-mobile', testDir: './tests/visual', use: mobile }
  ],
  webServer: {
    command: `pnpm start --port ${E2E_PORT}`,
    url: E2E_BASE_URL,
    reuseExistingServer: !isCI,
    timeout: WEB_SERVER_TIMEOUT_MS
  }
})
