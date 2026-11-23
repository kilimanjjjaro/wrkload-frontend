import { ADMIN, PARTNER } from '../constants/fixtures'
import { HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND } from '../constants/api'
import { expect, logIn, test, unexpectedErrors, visit } from '../utils/fixtures'

const PUBLIC_PAGES = [
  {
    path: '/',
    title: 'wrkload',
    heading: 'Work, load your time and go have fun!'
  },
  { path: '/login', title: 'Login - wrkload', heading: 'Welcome again!' },
  {
    path: '/registry',
    title: 'Registry - wrkload',
    heading: 'Nice to meet you!'
  },
  {
    path: '/remember-password',
    title: 'Remember password - wrkload',
    heading: 'Remember password'
  },
  {
    path: '/resend-confirmation-account-link',
    title: 'Resend confirmation account link - wrkload',
    heading: 'Resend confirmation account link'
  },
  {
    path: '/change-password',
    title: 'Change password - wrkload',
    heading: 'Change password'
  },
  {
    path: '/delete-account',
    title: 'Delete account - wrkload',
    heading: 'Delete account'
  },
  {
    path: '/reset-password/uid/valid-token',
    title: 'Reset password - wrkload',
    heading: 'Reset password'
  }
] as const

const DASHBOARD_PAGES = [
  { path: '/tasks', title: 'Tasks - wrkload', heading: 'Tasks of' },
  { path: '/projects', title: 'Projects - wrkload', heading: 'Projects' },
  { path: '/users', title: 'Users - wrkload', heading: 'Users' },
  { path: '/profile', title: 'Profile - wrkload', heading: 'Profile' }
] as const

test.describe('public pages render without errors', () => {
  for (const { path, title, heading } of PUBLIC_PAGES) {
    test(path, async ({ page, browserErrors }) => {
      const response = await visit(page, path)

      expect(response?.status()).toBe(HTTP_STATUS_OK)
      await expect(page).toHaveTitle(title)
      await expect(
        page.getByRole('heading', { name: heading }).first()
      ).toBeVisible()
      expect(unexpectedErrors(browserErrors)).toEqual([])
    })
  }

  test('the meta description and Open Graph data', async ({ page }) => {
    await visit(page, '/')

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      "wrkload is a web app where you can track what you've worked on in a simple and organized way."
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://wrkload.vercel.app/images/og.jpg'
    )
  })

  test('loads the vercel analytics script', async ({ page }) => {
    const analytics = page.waitForRequest('**/_vercel/insights/script.js')
    await visit(page, '/')

    expect((await analytics).method()).toBe('GET')
  })

  test('unknown pages answer 404', async ({ page }) => {
    const response = await visit(page, '/missing-page')

    expect(response?.status()).toBe(HTTP_STATUS_NOT_FOUND)
  })

  test('unknown pages show the app not found page', async ({ page }) => {
    await visit(page, '/missing-page')

    await expect(
      page.getByRole('heading', { name: 'Page Not Found' })
    ).toBeVisible()
    await expect(
      page.getByRole('img', { name: 'Not found image' })
    ).toBeVisible()
  })
})

test.describe('dashboard pages render without errors', () => {
  for (const { path, title, heading } of DASHBOARD_PAGES) {
    test(path, async ({ page, browserErrors }) => {
      await logIn(page, path === '/users' ? ADMIN : PARTNER)
      const response = await visit(page, path)

      expect(response?.status()).toBe(HTTP_STATUS_OK)
      await expect(page).toHaveTitle(title)
      await expect(
        page.getByRole('heading', { name: heading }).first()
      ).toBeVisible()
      await page.waitForLoadState('networkidle')
      expect(unexpectedErrors(browserErrors)).toEqual([])
    })
  }
})
