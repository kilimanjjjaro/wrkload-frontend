import { test as base, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { E2E_BASE_URL } from '../constants/e2e'
import type { FixtureUser } from '../constants/fixtures'
import { FakeApi, accessTokenFor } from './fake-api'

export interface BrowserError {
  text: string
  url: string
}

export const test = base.extend<{
  api: FakeApi
  browserErrors: BrowserError[]
}>({
  api: [
    async ({ page }, provide) => {
      const api = new FakeApi()
      await api.install(page)
      await provide(api)
    },
    { auto: true }
  ],
  browserErrors: [
    async ({ page }, provide) => {
      const errors: BrowserError[] = []

      page.on('console', (message) => {
        if (message.type() !== 'error') return
        errors.push({ text: message.text(), url: message.location().url })
      })

      page.on('pageerror', (error) => {
        errors.push({ text: `Uncaught: ${error.message}`, url: '' })
      })

      await provide(errors)
    },
    { auto: true }
  ]
})

export { expect }

export const logIn = async (page: Page, user: FixtureUser) => {
  await page.context().addCookies([
    { name: 'isLogged', value: 'true', url: E2E_BASE_URL },
    { name: 'accessToken', value: accessTokenFor(user), url: E2E_BASE_URL }
  ])
  await page.addInitScript((storedUser) => {
    if (window.localStorage.getItem('user') === null) {
      window.localStorage.setItem('user', storedUser)
    }
  }, JSON.stringify({
    _id: user._id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    role: user.role
  }))
}

export const useLightTheme = async (page: Page) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('darkMode', 'false')
  })
}

const EXPECTED_ERRORS = ['/_vercel/insights/script.js']

export const unexpectedErrors = (errors: BrowserError[]) =>
  errors.filter(
    (error) =>
      !EXPECTED_ERRORS.some(
        (expected) => error.url.includes(expected) || error.text.includes(expected)
      )
  )

export const visit = async (page: Page, path: string) => {
  const response = await page.goto(path)
  await page.waitForLoadState('networkidle')
  return response
}

export const fill = async (page: Page, fields: Record<string, string>) => {
  await Object.entries(fields).reduce(async (previous, [name, value]) => {
    await previous
    await page.locator(`[name="${name}"]`).fill(value)
  }, Promise.resolve())
}
