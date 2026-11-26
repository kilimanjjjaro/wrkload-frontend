import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'
import { config, proxy } from '../../proxy'
import { ROLE_ADMIN, ROLE_PARTNER, ROLE_TRIAL } from '../constants/api'

const ORIGIN = 'https://wrkload.test'

const tokenWithRole = (role: number) =>
  ['header', btoa(JSON.stringify({ uid: 'user', role })), 'signature'].join('.')

const request = (path: string, cookies: Record<string, string> = {}) => {
  const cookie = Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')

  return new NextRequest(`${ORIGIN}${path}`, { headers: { cookie } })
}

const redirectOf = (response: Response) => response.headers.get('location')

describe('proxy', () => {
  it.fails('runs on the dashboard pages and their search pages', () => {
    expect(config.matcher).toEqual([
      '/tasks/:path*',
      '/projects/:path*',
      '/profile',
      '/users/:path*'
    ])
  })

  it('sends partners from the users search page to their tasks', () => {
    const response = proxy(
      request('/users/search?query=a', {
        isLogged: 'true',
        accessToken: tokenWithRole(ROLE_PARTNER)
      })
    )

    expect(redirectOf(response)).toBe(`${ORIGIN}/tasks`)
  })

  it.each(['/tasks', '/projects', '/profile', '/users'])(
    'sends visitors without a session from %s to the home page',
    (path) => {
      expect(redirectOf(proxy(request(path)))).toBe(`${ORIGIN}/`)
      expect(redirectOf(proxy(request(path, { isLogged: 'false' })))).toBe(
        `${ORIGIN}/`
      )
    }
  )

  it('lets logged in users through', () => {
    const response = proxy(
      request('/tasks', {
        isLogged: 'true',
        accessToken: tokenWithRole(ROLE_PARTNER)
      })
    )

    expect(redirectOf(response)).toBeNull()
  })

  it('sends partners from the users page to their tasks', () => {
    const response = proxy(
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
      const response = proxy(
        request('/users', {
          isLogged: 'true',
          accessToken: tokenWithRole(role)
        })
      )

      expect(redirectOf(response)).toBeNull()
    }
  )
})
