export const E2E_PORT = 3100
export const E2E_BASE_URL = `http://localhost:${E2E_PORT}`

const DESKTOP_VIEWPORT_WIDTH = 1440
const DESKTOP_VIEWPORT_HEIGHT = 900
export const DESKTOP_VIEWPORT = {
  width: DESKTOP_VIEWPORT_WIDTH,
  height: DESKTOP_VIEWPORT_HEIGHT
}

export const TEST_TIMEOUT_MS = 60_000
export const EXPECT_TIMEOUT_MS = 15_000
export const WEB_SERVER_TIMEOUT_MS = 180_000
export const CI_RETRIES = 1
export const LOCAL_RETRIES = 0

export const TEST_NOW = new Date('2026-11-15T12:00:00')
export const SETTLE_MS = 3_000
export const SCROLL_OFFSET_PX = 120

export const MAX_DIFF_PIXEL_RATIO = 0.001
export const QUICK_TIMEOUT_MS = 2_000
export const ANIMATIONS_TIMEOUT_MS = 10_000
export const HOME_MAX_DIFF_PIXEL_RATIO = 0.01
