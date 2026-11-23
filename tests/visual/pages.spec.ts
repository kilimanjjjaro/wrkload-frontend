import type { Page } from '@playwright/test'
import { ADMIN, PARTNER, PASSWORDS, PROJECTS, TRIAL } from '../constants/fixtures'
import { HOME_MAX_DIFF_PIXEL_RATIO } from '../constants/e2e'
import { FakeApi } from '../utils/fake-api'
import { expect, logIn, test, useLightTheme } from '../utils/fixtures'
import {
  freezeTime,
  prepareRealTime,
  scrollToText,
  scrollToTop,
  settle,
  settleRealTime
} from '../utils/visual'

test.skip(
  process.platform !== 'win32',
  'The reference screenshots are captured on Windows'
)

const ANIMATED_IMAGES = 'img[alt="Not found image"]'

const MARQUEE_ROWS = 'section > div.overflow-hidden.whitespace-nowrap'

const HOME_SECTIONS = [
  ['hero', undefined],
  ['features', 'Your best way to control your work'],
  ['stats', 'All you need in one blink!'],
  ['dark-mode', 'Discover the Dark Side of wrkload!']
] as const

const capture = async (page: Page, name: string) => {
  await scrollToTop(page)
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    mask: [page.locator(ANIMATED_IMAGES)]
  })
}

const open = async (page: Page, path: string) => {
  await freezeTime(page)
  await page.goto(path)
  await settle(page)
}

const card = (page: Page, title: string) =>
  page.locator('article').filter({ hasText: title })

const editCard = async (page: Page, title: string) => {
  await card(page, title).hover()
  await card(page, title).locator('div.cursor-pointer.bg-yellow').click()
  await settle(page)
}

const deleteCard = async (page: Page, title: string) => {
  await card(page, title).hover()
  await card(page, title).locator('div.cursor-pointer.bg-red').click()
  await settle(page)
}

const closeModal = async (page: Page) => {
  await page.getByRole('button', { name: 'Close' }).filter({ visible: true }).click()
  await settle(page)
}

const fill = async (page: Page, fields: Record<string, string>) => {
  for (const [name, value] of Object.entries(fields)) {
    await page.locator(`[name="${name}"]`).fill(value)
  }
}

test.describe('public pages', () => {
  for (const theme of ['dark', 'light'] as const) {
    test(`home in ${theme} mode`, async ({ page, api }) => {
      void api
      if (theme === 'light') await useLightTheme(page)
      await prepareRealTime(page)
      await page.goto('/')
      await settleRealTime(page)

      for (const [section, heading] of HOME_SECTIONS) {
        if (heading !== undefined) await scrollToText(page, heading)
        await expect(page).toHaveScreenshot(`home-${theme}-${section}.png`, {
          mask: [page.locator(MARQUEE_ROWS)],
          maxDiffPixelRatio: HOME_MAX_DIFF_PIXEL_RATIO
        })
      }
    })
  }

  for (const [name, path] of [
    ['login', '/login'],
    ['registry', '/registry'],
    ['remember-password', '/remember-password'],
    ['resend-confirmation-account-link', '/resend-confirmation-account-link'],
    ['change-password', '/change-password'],
    ['delete-account', '/delete-account'],
    ['reset-password', '/reset-password/uid/valid-token'],
    ['confirm-account', '/confirm-account/valid-token'],
    ['confirm-account-error', '/confirm-account/used-token'],
    ['not-found', '/missing-page']
  ] as const) {
    test(name, async ({ page, api }) => {
      void api
      await open(page, path)
      await capture(page, name)
    })
  }

  test('login in light mode', async ({ page, api }) => {
    void api
    await useLightTheme(page)
    await open(page, '/login')
    await capture(page, 'login-light')
  })
})

test.describe('auth states', () => {
  test('login error', async ({ page, api }) => {
    void api
    await open(page, '/login')
    await fill(page, { email: PARTNER.email, password: 'wrong-password' })
    await page.getByRole('button', { name: 'Login' }).click()
    await settle(page)
    await capture(page, 'login-error')
  })

  test('trial login', async ({ page, api, isMobile }) => {
    void api
    await open(page, '/')
    await page
      .getByRole('button', { name: 'Try now!' })
      .and(page.locator(isMobile ? '.md\\:hidden' : '.md\\:flex'))
      .click()
    await page.waitForURL('**/login')
    await settle(page)
    await capture(page, 'login-trial')
  })

  test('registry success', async ({ page, api }) => {
    void api
    await open(page, '/registry')
    await fill(page, {
      username: 'Dave',
      email: 'dave@wrkload.test',
      password: 'dave-password',
      confirmPassword: 'dave-password'
    })
    await settle(page)
    await capture(page, 'registry-filled')
    await page.getByRole('button', { name: 'Registry' }).click()
    await settle(page)
    await capture(page, 'registry-success')
  })

  test('registry error', async ({ page, api }) => {
    void api
    await open(page, '/registry')
    await fill(page, {
      username: 'Alice',
      email: PARTNER.email,
      password: 'alice-password',
      confirmPassword: 'alice-password'
    })
    await page.getByRole('button', { name: 'Registry' }).click()
    await settle(page)
    await capture(page, 'registry-error')
  })

  test('remember password success', async ({ page, api }) => {
    void api
    await open(page, '/remember-password')
    await fill(page, { email: PARTNER.email })
    await page.getByRole('button', { name: 'Submit' }).click()
    await settle(page)
    await capture(page, 'remember-password-success')
  })

  test('remember password error', async ({ page, api }) => {
    void api
    await open(page, '/remember-password')
    await fill(page, { email: TRIAL.email })
    await page.getByRole('button', { name: 'Submit' }).click()
    await settle(page)
    await capture(page, 'remember-password-error')
  })

  test('delete account error', async ({ page, api }) => {
    void api
    await open(page, '/delete-account')
    await fill(page, { email: PARTNER.email, password: 'wrong-password' })
    await page.getByRole('button', { name: 'Submit' }).click()
    await settle(page)
    await capture(page, 'delete-account-error')
  })

  test('reset password success', async ({ page, api }) => {
    void api
    await open(page, '/reset-password/uid/valid-token')
    await fill(page, {
      newPassword: 'new-password-1',
      confirmNewPassword: 'new-password-1'
    })
    await page.getByRole('button', { name: 'Submit' }).click()
    await settle(page)
    await capture(page, 'reset-password-success')
  })

  test('change password steps', async ({ page, api }) => {
    void api
    await logIn(page, PARTNER)
    await open(page, '/change-password')
    await fill(page, { currentPassword: PASSWORDS[PARTNER.email] })
    await page.getByRole('button', { name: 'Next' }).click()
    await settle(page)
    await capture(page, 'change-password-new')
  })
})

test.describe('tasks', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page, PARTNER)
  })

  test('list with stats', async ({ page, api }) => {
    void api
    await open(page, '/tasks')
    await capture(page, 'tasks')
  })

  test('list in light mode', async ({ page, api }) => {
    void api
    await useLightTheme(page)
    await open(page, '/tasks')
    await capture(page, 'tasks-light')
  })

  test('list without stats', async ({ page, api }) => {
    void api
    await page.addInitScript(() => {
      window.localStorage.setItem('showStats', 'false')
    })
    await open(page, '/tasks')
    await capture(page, 'tasks-without-stats')
  })

  test('modals', async ({ page, api }) => {
    void api
    await open(page, '/tasks')

    await page.getByRole('button', { name: 'Add task' }).click()
    await settle(page)
    await capture(page, 'tasks-add')
    await closeModal(page)

    await editCard(page, 'Landing page')
    await capture(page, 'tasks-update')
    await closeModal(page)
    await settle(page)

    await deleteCard(page, 'Checkout flow')
    await capture(page, 'tasks-delete')
  })

  test('search modal', async ({ page, api }) => {
    void api
    await open(page, '/tasks')
    await page.getByRole('button', { name: 'Search task' }).click()
    await settle(page)
    await capture(page, 'tasks-search-modal')
  })

  test('date filter', async ({ page, api }) => {
    void api
    await open(page, '/tasks')
    await page.getByRole('button', { name: 'Filter' }).first().click()
    await settle(page)
    await capture(page, 'tasks-date-filter')
  })

  test('project selector', async ({ page, api }) => {
    void api
    await open(page, '/tasks')
    await page.getByText('Agency Site', { exact: true }).first().click()
    await settle(page)
    await capture(page, 'tasks-project-selector')
  })

  test('empty project', async ({ page, api }) => {
    void api
    await open(page, '/tasks')
    await page.getByText('Agency Site', { exact: true }).first().click()
    await page.getByRole('listitem').filter({ hasText: 'Branding' }).click()
    await settle(page)
    await capture(page, 'tasks-empty')
  })

  test('without projects', async ({ page }) => {
    await new FakeApi({ projects: [] }).install(page)
    await open(page, '/tasks')
    await capture(page, 'tasks-without-projects')
  })

  test('search results', async ({ page, api }) => {
    void api
    await open(page, '/tasks/search?project=Agency%20Site&query=form')
    await capture(page, 'tasks-search')
  })

  test('search without results', async ({ page, api }) => {
    void api
    await open(page, '/tasks/search?project=Agency%20Site&query=nothing')
    await capture(page, 'tasks-search-empty')
  })

  test('dashboard tab', async ({ page, api }) => {
    void api
    await open(page, '/tasks')
    await page.getByRole('img', { name: PARTNER.username }).click()
    await settle(page)
    await capture(page, 'dashboard-tab')
  })
})

test.describe('projects', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page, PARTNER)
  })

  test('list with stats', async ({ page, api }) => {
    void api
    await open(page, '/projects')
    await capture(page, 'projects')
  })

  test('modals', async ({ page, api }) => {
    void api
    await open(page, '/projects')

    await page.getByRole('button', { name: 'Add project' }).click()
    await settle(page)
    await capture(page, 'projects-add')
    await closeModal(page)

    await editCard(page, 'Mobile App')
    await capture(page, 'projects-update')
  })

  test('delete modal', async ({ page, api }) => {
    void api
    await open(page, '/projects')
    await deleteCard(page, 'Branding')
    await capture(page, 'projects-delete')
  })

  test('empty', async ({ page }) => {
    await new FakeApi({ projects: [] }).install(page)
    await open(page, '/projects')
    await capture(page, 'projects-empty')
  })

  test('search results', async ({ page, api }) => {
    void api
    await open(page, '/projects/search?query=site')
    await capture(page, 'projects-search')
  })
})

test.describe('users', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page, ADMIN)
  })

  test('list', async ({ page, api }) => {
    void api
    await open(page, '/users')
    await capture(page, 'users')
  })

  test('modals', async ({ page, api }) => {
    void api
    await open(page, '/users')
    await editCard(page, PARTNER.username)
    await capture(page, 'users-update')
  })

  test('delete modal', async ({ page, api }) => {
    void api
    await open(page, '/users')
    await deleteCard(page, PARTNER.username)
    await capture(page, 'users-delete')
  })

  test('search results', async ({ page, api }) => {
    void api
    await open(page, '/users/search?query=a')
    await capture(page, 'users-search')
  })
})

test.describe('profile', () => {
  test('profile', async ({ page, api }) => {
    void api
    await logIn(page, PARTNER)
    await open(page, '/profile')
    await capture(page, 'profile')
  })
})

test.describe('toasts', () => {
  const captureToast = async (page: Page, name: string) => {
    await expect(page.locator('[data-sonner-toast]')).toBeVisible()
    await expect(page).toHaveScreenshot(`${name}.png`, {
      mask: [page.locator(ANIMATED_IMAGES)]
    })
  }

  const confirmDelete = async (page: Page) => {
    await page.getByRole('button', { name: 'Delete' }).filter({ visible: true }).click()
    await settle(page)
  }

  test('success', async ({ page, api }) => {
    void api
    await logIn(page, PARTNER)
    await open(page, '/projects')
    await deleteCard(page, 'Branding')
    await confirmDelete(page)
    await captureToast(page, 'toast-success')
  })

  test('error', async ({ page }) => {
    await new FakeApi({
      projects: PROJECTS.map((project) => ({ ...project, authorId: TRIAL._id }))
    }).install(page)
    await logIn(page, TRIAL)
    await open(page, '/projects')
    await deleteCard(page, 'Branding')
    await confirmDelete(page)
    await captureToast(page, 'toast-error')
  })

  test('information', async ({ page, api }) => {
    void api
    await logIn(page, TRIAL)
    await open(page, '/users/search?query=a')
    await captureToast(page, 'toast-information')
  })
})
