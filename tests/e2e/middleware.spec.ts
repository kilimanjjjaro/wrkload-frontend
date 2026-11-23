import { ADMIN, PARTNER, TRIAL } from '../constants/fixtures'
import { accessTokenFor } from '../utils/fake-api'
import { expect, test } from '../utils/fixtures'

test.skip(
  ({ isMobile }) => isMobile,
  'The redirects do not depend on the device'
)

const PROTECTED_PATHS = ['/tasks', '/projects', '/profile', '/users']
const NO_REDIRECTS = 0

const session = (role: typeof PARTNER) =>
  `isLogged=true; accessToken=${accessTokenFor(role)}`

test.describe('middleware', () => {
  for (const path of PROTECTED_PATHS) {
    test(`sends visitors without a session from ${path} home`, async ({
      request
    }) => {
      const response = await request.get(path, { maxRedirects: NO_REDIRECTS })

      expect(response.headers().location).toBe('/')
    })
  }

  test('sends partners from the users page to their tasks', async ({
    request
  }) => {
    const response = await request.get('/users', {
      maxRedirects: NO_REDIRECTS,
      headers: { cookie: session(PARTNER) }
    })

    expect(response.headers().location).toBe('/tasks')
  })

  for (const user of [ADMIN, TRIAL]) {
    test(`lets ${user.username} open the users page`, async ({ request }) => {
      const response = await request.get('/users', {
        maxRedirects: NO_REDIRECTS,
        headers: { cookie: session(user) }
      })

      expect(response.ok()).toBe(true)
    })
  }

  test('does not protect the search pages', async ({ request }) => {
    const response = await request.get('/tasks/search?project=a&query=b', {
      maxRedirects: NO_REDIRECTS
    })

    expect(response.ok()).toBe(true)
  })
})
