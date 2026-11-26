import { ADMIN, PARTNER, TRIAL } from '../constants/fixtures'
import { accessTokenFor } from '../utils/fake-api'
import { expect, test } from '../utils/fixtures'

test.skip(
  ({ isMobile }) => isMobile,
  'The redirects do not depend on the device'
)

const PROTECTED_PATHS = ['/tasks', '/projects', '/profile', '/users']
const SEARCH_PATHS = [
  '/tasks/search?project=a&query=b',
  '/projects/search?query=a',
  '/users/search?query=a'
]
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

  for (const path of SEARCH_PATHS) {
    test(`sends visitors without a session from ${path} home`, async ({
      request
    }) => {
      test.fail()
      const response = await request.get(path, { maxRedirects: NO_REDIRECTS })

      expect(response.headers().location).toBe('/')
    })
  }

  test('sends partners from the users search page to their tasks', async ({
    request
  }) => {
    test.fail()
    const response = await request.get('/users/search?query=a', {
      maxRedirects: NO_REDIRECTS,
      headers: { cookie: session(PARTNER) }
    })

    expect(response.headers().location).toBe('/tasks')
  })

  test('lets logged in users open the search pages', async ({ request }) => {
    const response = await request.get('/tasks/search?project=a&query=b', {
      maxRedirects: NO_REDIRECTS,
      headers: { cookie: session(PARTNER) }
    })

    expect(response.ok()).toBe(true)
  })
})
