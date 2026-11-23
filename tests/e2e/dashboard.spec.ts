import type { Page } from '@playwright/test'
import { ADMIN, PARTNER, TRIAL } from '../constants/fixtures'
import {
  AGENCY_SITE_TASK_CARDS,
  ALL_USER_CARDS,
  FIRST_REQUEST,
  LAST_REQUEST,
  MOBILE_APP_TASK_CARDS,
  NO_ELEMENTS,
  NO_TASKS,
  PARTNER_PROJECT_CARDS,
  QUICK_TIMEOUT_MS,
  SINGLE_ELEMENT,
  SINGLE_REQUEST
} from '../constants/e2e'
import { FakeApi } from '../utils/fake-api'
import { expect, logIn, test, visit } from '../utils/fixtures'

const card = (page: Page, title: string) =>
  page.locator('article').filter({ hasText: title })

const openCardAction = async (
  page: Page,
  title: string,
  action: 'edit' | 'delete'
) => {
  await card(page, title).hover()
  await card(page, title)
    .locator(
      action === 'edit'
        ? 'div.cursor-pointer.bg-yellow'
        : 'div.cursor-pointer.bg-red'
    )
    .click()
}

const visibleButton = (page: Page, name: string) =>
  page.getByRole('button', { name, exact: true }).filter({ visible: true })

test.describe('tasks', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page, PARTNER)
  })

  test('lists the tasks of the first project with its stats', async ({
    page,
    api
  }) => {
    await visit(page, '/tasks')

    await expect(page.locator('article')).toHaveCount(AGENCY_SITE_TASK_CARDS)
    await expect(card(page, 'Landing page')).toContainText('12-11-2026')
    await expect(card(page, 'Landing page')).toContainText('02:30')
    await expect(page.getByText('hours worked').first()).toBeVisible()
    await expect(page.getByText('Page 1 of 1')).toBeVisible()
    expect(api.requestsTo('GET', '/tasks')[FIRST_REQUEST].query).toEqual({
      project: 'Agency Site',
      limit: '11',
      page: '1'
    })
  })

  test('switches the project and remembers it', async ({ page, api }) => {
    await visit(page, '/tasks')
    await page.getByText('Agency Site', { exact: true }).first().click()
    await page.getByRole('listitem').filter({ hasText: 'Mobile App' }).click()

    await expect(card(page, 'Onboarding screens')).toBeVisible()
    await expect(page.locator('article')).toHaveCount(MOBILE_APP_TASK_CARDS)
    expect(
      await page.evaluate(() => window.localStorage.getItem('selectedProject'))
    ).toBe('Mobile App')
    expect(
      api.requestsTo('GET', '/tasks').map(({ query }) => query.project)
    ).toContain('Mobile App')
  })

  test('hides the stats and remembers it', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The stats button shows its text from md')
    await visit(page, '/tasks')
    await visibleButton(page, 'Hide stats').click()

    await expect(page.getByText('hours worked')).toHaveCount(NO_ELEMENTS)
    expect(
      await page.evaluate(() => window.localStorage.getItem('showStats'))
    ).toBe('false')
  })

  test('adds a task to the selected project', async ({ page, api }) => {
    await visit(page, '/tasks')
    await page.getByRole('button', { name: 'Add task' }).click()
    await page
      .locator('[name="title"]')
      .filter({ visible: true })
      .fill('Newsletter')
    await page
      .locator('[name="timing"]')
      .filter({ visible: true })
      .fill('01:15')
    await page
      .locator('[name="deliveredAt"]')
      .filter({ visible: true })
      .fill('2026-11-14')
    await page
      .locator('[name="description"]')
      .filter({ visible: true })
      .fill('Monthly product updates.')
    await visibleButton(page, 'Submit').click()

    await expect(card(page, 'Newsletter')).toBeVisible()
    expect(api.requestsTo('POST', '/tasks')[FIRST_REQUEST].body).toEqual({
      title: 'Newsletter',
      project: 'Agency Site',
      timing: '01:15',
      deliveredAt: '2026-11-14',
      description: 'Monthly product updates.'
    })
  })

  test('adds the first task to an empty project', async ({ page, api }) => {
    await visit(page, '/tasks')
    await page.getByText('Agency Site', { exact: true }).first().click()
    await page.getByRole('listitem').filter({ hasText: 'Branding' }).click()
    await page.getByRole('button', { name: 'Add task' }).first().click()
    await page.locator('[name="title"]').filter({ visible: true }).fill('Logo')
    await page
      .locator('[name="timing"]')
      .filter({ visible: true })
      .fill('02:00')
    await page
      .locator('[name="deliveredAt"]')
      .filter({ visible: true })
      .fill('2026-11-14')
    await visibleButton(page, 'Submit').click()

    await expect(card(page, 'Logo')).toBeVisible()
    expect(api.requestsTo('POST', '/tasks')[FIRST_REQUEST].body).toMatchObject({
      title: 'Logo',
      project: 'Branding'
    })
  })

  test.fail('confirms the added task', async ({ page }) => {
    await visit(page, '/tasks')
    await page.getByRole('button', { name: 'Add task' }).click()
    await page
      .locator('[name="title"]')
      .filter({ visible: true })
      .fill('Newsletter')
    await page
      .locator('[name="timing"]')
      .filter({ visible: true })
      .fill('01:15')
    await page
      .locator('[name="deliveredAt"]')
      .filter({ visible: true })
      .fill('2026-11-14')
    await visibleButton(page, 'Submit').click()

    await expect(page.getByText('Task added successfully!')).toBeVisible({
      timeout: QUICK_TIMEOUT_MS
    })
  })

  test.fail(
    'adds tasks to the remembered project after a reload',
    async ({ page, api }) => {
      await page.addInitScript(() => {
        window.localStorage.setItem('selectedProject', 'Mobile App')
      })
      await visit(page, '/tasks')
      await expect(card(page, 'Onboarding screens')).toBeVisible()
      await page.getByRole('button', { name: 'Add task' }).click()
      await page
        .locator('[name="title"]')
        .filter({ visible: true })
        .fill('Release notes')
      await page
        .locator('[name="timing"]')
        .filter({ visible: true })
        .fill('01:00')
      await page
        .locator('[name="deliveredAt"]')
        .filter({ visible: true })
        .fill('2026-11-14')
      await visibleButton(page, 'Submit').click()

      await expect(card(page, 'Release notes')).toBeVisible()
      expect(
        api.requestsTo('POST', '/tasks')[FIRST_REQUEST].body
      ).toMatchObject({ project: 'Mobile App' })
      await expect(card(page, 'Onboarding screens')).toBeVisible()
    }
  )

  test.fail('confirms the updated task', async ({ page }) => {
    await visit(page, '/tasks')
    await openCardAction(page, 'Landing page', 'edit')
    await page
      .locator('[name="title"]')
      .filter({ visible: true })
      .fill('Landing page v2')
    await visibleButton(page, 'Update').click()

    await expect(page.getByText('Task updated successfully!')).toBeVisible({
      timeout: QUICK_TIMEOUT_MS
    })
  })

  test('updates a task', async ({ page, api }) => {
    await visit(page, '/tasks')
    await openCardAction(page, 'Landing page', 'edit')
    const title = page.locator('[name="title"]').filter({ visible: true })
    await expect(title).toHaveValue('Landing page')
    await title.fill('Landing page v2')
    await visibleButton(page, 'Update').click()

    await expect(card(page, 'Landing page v2')).toBeVisible()
    expect(
      api.requestsTo('PATCH', '/tasks/64c000000000000000000001')[FIRST_REQUEST]
        .body
    ).toMatchObject({ title: 'Landing page v2', project: 'Agency Site' })
  })

  test('deletes a task', async ({ page, api }) => {
    await visit(page, '/tasks')
    await openCardAction(page, 'Checkout flow', 'delete')
    await visibleButton(page, 'Delete').click()

    await expect(page.getByText('Task deleted successfully!')).toBeVisible()
    await expect(card(page, 'Checkout flow')).toHaveCount(NO_ELEMENTS)
    expect(
      api.requestsTo('DELETE', '/tasks/64c000000000000000000002')
    ).toHaveLength(SINGLE_REQUEST)
  })

  test('searches the tasks of the project', async ({ page, api }) => {
    await visit(page, '/tasks')
    await page.getByRole('button', { name: 'Search task' }).click()
    await page.locator('[name="query"]').filter({ visible: true }).fill('form')
    await visibleButton(page, 'Search').click()

    await page.waitForURL('**/tasks/search?project=Agency%20Site&query=form')
    await expect(
      page.getByRole('heading', { name: 'Search results for: form' })
    ).toBeVisible()
    await expect(card(page, 'Contact form')).toBeVisible()
    expect(api.requestsTo('GET', '/tasks').at(LAST_REQUEST)?.query).toEqual({
      project: 'Agency Site',
      search: 'form',
      limit: '8',
      page: '1'
    })
  })

  test.fail('searches text with special characters', async ({ page, api }) => {
    await visit(page, '/tasks')
    await page.getByRole('button', { name: 'Search task' }).click()
    await page.locator('[name="query"]').filter({ visible: true }).fill('R&D')
    await visibleButton(page, 'Search').click()

    await expect(
      page.getByRole('heading', { name: 'Search results for: R&D' })
    ).toBeVisible({ timeout: QUICK_TIMEOUT_MS })
    expect(
      api.requestsTo('GET', '/tasks').at(LAST_REQUEST)?.query
    ).toMatchObject({
      project: 'Agency Site',
      search: 'R&D'
    })
  })

  test('asks for a project when there are none', async ({ page }) => {
    await new FakeApi({ projects: [] }).install(page)
    await visit(page, '/tasks')

    await expect(
      page.getByText("To create tasks, you need a project. Let's create one!")
    ).toBeVisible()
  })
})

test.describe('trial account', () => {
  test('cannot add tasks', async ({ page }) => {
    await logIn(page, TRIAL)
    await new FakeApi({
      projects: [
        {
          _id: '64b000000000000000000009',
          name: 'Demo',
          authorId: TRIAL._id,
          createdAt: '2026-01-01T10:00:00-03:00',
          totalTasks: NO_TASKS
        }
      ]
    }).install(page)
    await visit(page, '/tasks')
    await page.getByRole('button', { name: 'Add task' }).first().click()
    await page.locator('[name="title"]').filter({ visible: true }).fill('Demo')
    await page
      .locator('[name="timing"]')
      .filter({ visible: true })
      .fill('01:00')
    await page
      .locator('[name="deliveredAt"]')
      .filter({ visible: true })
      .fill('2026-11-14')
    await visibleButton(page, 'Submit').click()

    await expect(
      page.getByText("You don't have permission to add tasks!")
    ).toBeVisible()
  })
})

test.describe('projects', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page, PARTNER)
  })

  test('lists the projects with the best project of last month', async ({
    page,
    api
  }) => {
    await visit(page, '/projects')

    await expect(page.locator('article')).toHaveCount(PARTNER_PROJECT_CARDS)
    await expect(card(page, 'Agency Site')).toContainText('4 tasks')
    await expect(page.getByText('Project of last month.')).toBeVisible()
    expect(api.requestsTo('GET', '/projects')[FIRST_REQUEST].query).toEqual({
      limit: '11',
      page: '1'
    })
  })

  test('adds, renames and deletes a project', async ({ page, api }) => {
    await visit(page, '/projects')

    await page.getByRole('button', { name: 'Add project' }).click()
    await page.locator('[name="name"]').filter({ visible: true }).fill('docs')
    await visibleButton(page, 'Submit').click()
    await expect(card(page, 'Docs')).toBeVisible()
    expect(api.requestsTo('POST', '/projects')[FIRST_REQUEST].body).toEqual({
      name: 'docs'
    })

    await openCardAction(page, 'Branding', 'edit')
    await page
      .locator('[name="name"]')
      .filter({ visible: true })
      .fill('Brand Book')
    await visibleButton(page, 'Update').click()
    await expect(card(page, 'Brand Book')).toBeVisible()

    await openCardAction(page, 'Brand Book', 'delete')
    await visibleButton(page, 'Delete').click()
    await expect(page.getByText('Project deleted successfully!')).toBeVisible()
    await expect(card(page, 'Brand Book')).toHaveCount(NO_ELEMENTS)
  })
})

test.describe('project notifications', () => {
  test.beforeEach(async ({ page }) => {
    await logIn(page, PARTNER)
  })

  test.fail('confirms the added project', async ({ page }) => {
    await visit(page, '/projects')
    await page.getByRole('button', { name: 'Add project' }).click()
    await page.locator('[name="name"]').filter({ visible: true }).fill('docs')
    await visibleButton(page, 'Submit').click()

    await expect(page.getByText('Project added successfully!')).toBeVisible({
      timeout: QUICK_TIMEOUT_MS
    })
  })

  test.fail('confirms the updated project', async ({ page }) => {
    await visit(page, '/projects')
    await openCardAction(page, 'Branding', 'edit')
    await page
      .locator('[name="name"]')
      .filter({ visible: true })
      .fill('Brand Book')
    await visibleButton(page, 'Update').click()

    await expect(page.getByText('Project updated successfully!')).toBeVisible({
      timeout: QUICK_TIMEOUT_MS
    })
  })
})

test.describe('users', () => {
  test('shows every user to an admin', async ({ page }) => {
    await logIn(page, ADMIN)
    await visit(page, '/users')

    await expect(page.locator('article')).toHaveCount(ALL_USER_CARDS)
    await expect(card(page, 'Bob')).toContainText('Administrator')
    await expect(card(page, 'Alice')).toContainText('Partner')
    await expect(card(page, 'Trial')).toContainText('Trial user')
  })

  test('shows only the trial user to the trial account', async ({ page }) => {
    await logIn(page, TRIAL)
    await visit(page, '/users')

    await expect(page.locator('article')).toHaveCount(SINGLE_ELEMENT)
    await expect(card(page, 'Trial')).toBeVisible()
  })

  test('hides the users link from partners', async ({ page }) => {
    await logIn(page, PARTNER)
    await visit(page, '/tasks')
    await page.getByRole('img', { name: PARTNER.username }).click()

    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Users' })).toHaveCount(
      NO_ELEMENTS
    )
  })

  test('deletes a user', async ({ page, api }) => {
    await logIn(page, ADMIN)
    await visit(page, '/users')
    await openCardAction(page, 'Carol', 'delete')
    await visibleButton(page, 'Delete').click()

    await expect(page.getByText('User deleted successfully!')).toBeVisible()
    expect(
      api.requestsTo('DELETE', '/users/64a000000000000000000003')
    ).toHaveLength(SINGLE_REQUEST)
  })
})

test.describe('profile', () => {
  test('shows the user data and its links', async ({ page }) => {
    await logIn(page, PARTNER)
    await visit(page, '/profile')

    await expect(page.getByText(PARTNER.email)).toBeVisible()
    await visibleButton(page, 'Change password').click()
    await page.waitForURL('**/change-password')
  })

  test('rejects avatars of other types', async ({ page }) => {
    await logIn(page, PARTNER)
    await visit(page, '/profile')
    await page.locator('#upload-avatar').setInputFiles({
      name: 'avatar.gif',
      mimeType: 'image/gif',
      buffer: Buffer.from('GIF89a')
    })

    await expect(page.getByText('This file type is not allowed.')).toBeVisible()
  })
})
