import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { config, middleware } from '../../middleware'
import { ROLE_ADMIN, ROLE_PARTNER, ROLE_TRIAL } from '../constants/api'

const ORIGIN = 'https://wrkload.test'

const tokenWithRole = (role: number) =>
  ['header', btoa(JSON.stringify({ uid: 'user', role })), 'signature'].join(
    '.'
  )

const request = (path: string, cookies: Record<string, string> = {}) => {
  const cookie = Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')

  return new NextRequest(`${ORIGIN}${path}`, { headers: { cookie } })
}

const redirectOf = (response: Response) => response.headers.get('location')

describe('middleware', () => {
  it('runs on the dashboard pages', () => {
    expect(config.matcher).toEqual(['/tasks', '/projects', '/profile', '/users'])
  })

  it.each(['/tasks', '/projects', '/profile', '/users'])(
    'sends visitors without a session from %s to the home page',
    (path) => {
      expect(redirectOf(middleware(request(path)))).toBe(`${ORIGIN}/`)
      expect(
        redirectOf(middleware(request(path, { isLogged: 'false' })))
      ).toBe(`${ORIGIN}/`)
    }
  )

  it('lets logged in users through', () => {
    const response = middleware(
      request('/tasks', {
        isLogged: 'true',
        accessToken: tokenWithRole(ROLE_PARTNER)
      })
    )

    expect(redirectOf(response)).toBeNull()
  })

  it('sends partners from the users page to their tasks', () => {
    const response = middleware(
      request('/users', {
        isLogged: 'true',
        accessToken: tokenWithRole(ROLE_PARTNER)
      })
    )

    expect(redirectOf(response)).toBe(`${ORIGIN}/tasks`)
  })

  it.each([ROLE_ADMIN, ROLE_TRIAL])(
    'lets role %i see the users page',
    (role) => {
      const response = middleware(
        request('/users', { isLogged: 'true', accessToken: tokenWithRole(role) })
      )

      expect(redirectOf(response)).toBeNull()
    }
  )
})
