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

export const QUICK_TIMEOUT_MS = 2_000

export const NO_ELEMENTS = 0
export const SINGLE_ELEMENT = 1
export const FIRST_REQUEST = 0
export const LAST_REQUEST = -1
export const SINGLE_REQUEST = 1
export const NO_TASKS = 0

export const AGENCY_SITE_TASK_CARDS = 4
export const MOBILE_APP_TASK_CARDS = 2
export const PARTNER_PROJECT_CARDS = 3
export const ALL_USER_CARDS = 4
