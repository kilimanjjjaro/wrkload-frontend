import { describe, expect, it, vi } from 'vitest'
import { accessTokenCookieOptions } from 'utils/cookies'
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/api'

describe('accessTokenCookieOptions', () => {
  it('keeps the access token cookie same-site and secure in production', () => {
    vi.stubEnv('NODE_ENV', 'production')

    expect(accessTokenCookieOptions(ACCESS_TOKEN_EXPIRES_IN)).toEqual({
      maxAge: ACCESS_TOKEN_EXPIRES_IN,
      sameSite: 'lax',
      secure: true
    })
  })

  it('allows the access token cookie over http in development', () => {
    vi.stubEnv('NODE_ENV', 'development')

    expect(accessTokenCookieOptions(ACCESS_TOKEN_EXPIRES_IN)).toEqual({
      maxAge: ACCESS_TOKEN_EXPIRES_IN,
      sameSite: 'lax',
      secure: false
    })
  })
})
