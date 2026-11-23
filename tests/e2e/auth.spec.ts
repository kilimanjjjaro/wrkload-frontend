import type { Page } from '@playwright/test'
import {
  PARTNER,
  PASSWORDS,
  TRIAL,
  UNCONFIRMED
} from '../constants/fixtures'
import { QUICK_TIMEOUT_MS } from '../constants/e2e'
import { expect, logIn, test, visit } from '../utils/fixtures'

const fill = async (page: Page, fields: Record<string, string>) => {
  for (const [name, value] of Object.entries(fields)) {
    await page.locator(`[name="${name}"]`).fill(value)
  }
}

const cookieValue = async (page: Page, name: string) =>
  (await page.context().cookies()).find((cookie) => cookie.name === name)
    ?.value

test.describe('login', () => {
  test('logs in and goes to the tasks', async ({ page, api }) => {
    await visit(page, '/login')
    await fill(page, { email: PARTNER.email, password: PASSWORDS[PARTNER.email] })
    await page.getByRole('button', { name: 'Login' }).click()

    await page.waitForURL('**/tasks')
    expect(api.requestsTo('POST', '/auth/login')[0].body).toEqual({
      email: PARTNER.email,
      password: PASSWORDS[PARTNER.email]
    })
    expect(await cookieValue(page, 'isLogged')).toBe('true')
    expect(await cookieValue(page, 'accessToken')).toBeDefined()
    expect(
      await page.evaluate(() => window.localStorage.getItem('user'))
    ).toContain(PARTNER.username)
    await expect(page.getByText(`Welcome, ${PARTNER.username}!`)).toBeAttached()
  })

  for (const { name, email, password, message } of [
    {
      name: 'an unknown email',
      email: 'nobody@wrkload.test',
      password: 'any-password',
      message: 'No account associated with this email was found'
    },
    {
      name: 'a wrong password',
      email: PARTNER.email,
      password: 'wrong-password',
      message: 'The email or password are invalid'
    },
    {
      name: 'an unconfirmed account',
      email: UNCONFIRMED.email,
      password: PASSWORDS[UNCONFIRMED.email],
      message: 'This account has not been confirmed yet'
    }
  ]) {
    test(`explains ${name}`, async ({ page, api }) => {
      void api
      await visit(page, '/login')
      await fill(page, { email, password })
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(
        page.getByRole('heading', { name: 'We have a problem!' })
      ).toBeVisible()
      await expect(page.getByText(message)).toBeVisible()
    })
  }

  test('fills the trial credentials and welcomes the trial user', async ({
    page,
    api,
    isMobile
  }) => {
    void api
    await visit(page, '/')
    await page
      .getByRole('button', { name: 'Try now!' })
      .and(page.locator(isMobile ? '.md\\:hidden' : '.md\\:flex'))
      .click()

    await page.waitForURL('**/login')
    await expect(page.locator('[name="email"]')).toHaveValue(TRIAL.email)
    await page.getByRole('button', { name: 'Login' }).click()

    await page.waitForURL('**/tasks')
    await expect(page.getByText('Welcome to the trial mode')).toBeVisible()
  })
})

test.describe('registry', () => {
  test('creates the account', async ({ page, api }) => {
    await visit(page, '/registry')
    await fill(page, {
      username: 'Dave',
      email: 'dave@wrkload.test',
      password: 'dave-password',
      confirmPassword: 'dave-password'
    })
    await page.getByRole('button', { name: 'Registry' }).click()

    await expect(page.getByRole('heading', { name: 'Done!' })).toBeVisible()
    expect(api.requestsTo('POST', '/auth/register')[0].body).toEqual({
      username: 'Dave',
      email: 'dave@wrkload.test',
      password: 'dave-password',
      avatar: 'https://wrkload.vercel.app/images/default-avatar.svg',
      role: 3
    })
  })

  test('rejects different passwords without calling the api', async ({
    page,
    api
  }) => {
    await visit(page, '/registry')
    await fill(page, {
      username: 'Dave',
      email: 'dave@wrkload.test',
      password: 'dave-password',
      confirmPassword: 'other-password'
    })
    await page.getByRole('button', { name: 'Registry' }).click()

    await expect(
      page.getByText('Passwords are not the same. Please, try again.')
    ).toBeVisible()
    expect(api.requestsTo('POST', '/auth/register')).toEqual([])
  })

  test('explains an email that already exists', async ({ page, api }) => {
    void api
    await visit(page, '/registry')
    await fill(page, {
      username: 'Alice',
      email: PARTNER.email,
      password: 'alice-password',
      confirmPassword: 'alice-password'
    })
    await page.getByRole('button', { name: 'Registry' }).click()

    await expect(
      page.getByText('An account with this email already exists')
    ).toBeVisible()
  })
})

test.describe('password recovery', () => {
  test('mails the reset link', async ({ page, api }) => {
    await visit(page, '/remember-password')
    await fill(page, { email: PARTNER.email })
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByText('An email has been sent to forgot your password.')
    ).toBeVisible()
    expect(api.requestsTo('POST', '/auth/remember-password')[0].body).toEqual(
      { email: PARTNER.email }
    )
  })

  test('explains that the trial account cannot reset its password', async ({
    page,
    api
  }) => {
    void api
    await visit(page, '/remember-password')
    await fill(page, { email: TRIAL.email })
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByText('This is a trial account, to access this feature')
    ).toBeVisible()
  })

  test('resets the password from the mailed link', async ({ page, api }) => {
    await visit(page, `/reset-password/${PARTNER._id}/valid-token`)
    await fill(page, {
      newPassword: 'new-password-1',
      confirmNewPassword: 'new-password-1'
    })
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByText('You can now use your new password.')
    ).toBeVisible()
    expect(
      api.requestsTo(
        'PATCH',
        `/auth/reset-password/${PARTNER._id}/valid-token`
      )[0].body
    ).toEqual({ newPassword: 'new-password-1' })
  })

  test('resends the confirmation link', async ({ page, api }) => {
    await visit(page, '/resend-confirmation-account-link')
    await fill(page, { email: UNCONFIRMED.email })
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByText('A link to confirm the account was sent again')
    ).toBeVisible()
    expect(api.requestsTo('POST', '/auth/resend-confirm-account')).toHaveLength(
      1
    )
  })
})

test.describe('account confirmation', () => {
  test('confirms the account from the mailed link', async ({ page, api }) => {
    await visit(page, '/confirm-account/valid-token')

    await expect(
      page.getByText('The account has been confirmed. Please, log in.')
    ).toBeVisible()
    expect(
      api.requestsTo('PATCH', '/auth/confirm-account/valid-token')
    ).toHaveLength(1)
  })

  test('explains a link that was already used', async ({ page, api }) => {
    void api
    await visit(page, '/confirm-account/used-token')

    await expect(
      page.getByText('This account has already been confirmed')
    ).toBeVisible()
  })
})

test.describe('account settings', () => {
  test('changes the password and logs out', async ({ page, api }) => {
    await logIn(page, PARTNER)
    await visit(page, '/change-password')
    await fill(page, { currentPassword: PASSWORDS[PARTNER.email] })
    await page.getByRole('button', { name: 'Next' }).click()
    await fill(page, {
      newPassword: 'new-password-1',
      confirmNewPassword: 'new-password-1'
    })
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByText('You can now use your new password.')
    ).toBeVisible()
    expect(api.requestsTo('PATCH', '/auth/change-password')[0].body).toEqual({
      email: PARTNER.email,
      oldPassword: PASSWORDS[PARTNER.email],
      newPassword: 'new-password-1'
    })
    expect(api.requestsTo('GET', '/auth/logout')).toHaveLength(1)
  })

  test.fail('explains a wrong current password', async ({ page, api }) => {
    void api
    await logIn(page, PARTNER)
    await visit(page, '/change-password')
    await fill(page, { currentPassword: 'wrong-password' })
    await page.getByRole('button', { name: 'Next' }).click()

    await expect(
      page.getByText('The email or password are invalid')
    ).toBeVisible({ timeout: QUICK_TIMEOUT_MS })
  })

  test('deletes the account', async ({ page, api }) => {
    await visit(page, '/delete-account')
    await fill(page, { email: PARTNER.email, password: PASSWORDS[PARTNER.email] })
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(
      page.getByText('Your account was deleted. Thanks for this time!')
    ).toBeVisible()
    expect(api.requestsTo('DELETE', `/users/${PARTNER._id}`)).toHaveLength(1)
  })

  test('logs out from the dashboard tab', async ({ page, api }) => {
    await logIn(page, PARTNER)
    await visit(page, '/tasks')
    await page.getByRole('img', { name: PARTNER.username }).click()
    await page.getByRole('button', { name: 'Log out' }).click()

    await page.waitForURL((url) => url.pathname === '/')
    await expect(page.getByText('Session ended successfully')).toBeVisible()
    expect(api.requestsTo('GET', '/auth/logout')).toHaveLength(1)
    expect(await cookieValue(page, 'isLogged')).toBeUndefined()
  })
})
