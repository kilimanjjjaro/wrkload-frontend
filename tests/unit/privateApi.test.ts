import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import privateApi from 'utils/privateApi'
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
  LOCAL_API_URL
} from '../constants/api'
import {
  authorizationOf,
  clearCookies,
  createAdapter,
  readCookie
} from '../utils/axios'

const originalAdapter = axios.defaults.adapter

beforeEach(() => {
  clearCookies()
})

afterEach(() => {
  axios.defaults.adapter = originalAdapter
  privateApi.defaults.adapter = originalAdapter
})

describe('privateApi', () => {
  it('calls the local api with the access token cookie', async () => {
    document.cookie = 'accessToken=current-token'
    const adapter = createAdapter(() => ({
      status: HTTP_STATUS_OK,
      data: { status: 'ok' }
    }))
    privateApi.defaults.adapter = adapter

    await privateApi.get('/tasks')

    const [[config]] = adapter.mock.calls
    expect(`${config.baseURL ?? ''}${config.url ?? ''}`).toBe(
      `${LOCAL_API_URL}/tasks`
    )
    expect(authorizationOf(config)).toBe('Bearer current-token')
  })

  it('refreshes the access token once on 401 and retries the request', async () => {
    document.cookie = 'accessToken=expired-token'
    const adapter = createAdapter((config) => {
      if (config.url === '/auth/refreshToken') {
        return {
          status: HTTP_STATUS_OK,
          data: {
            status: 'ok',
            accessToken: 'new-token',
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
          }
        }
      }

      return authorizationOf(config) === 'Bearer new-token'
        ? { status: HTTP_STATUS_OK, data: { status: 'ok', tasks: [] } }
        : { status: HTTP_STATUS_UNAUTHORIZED, data: { status: 'error' } }
    })
    privateApi.defaults.adapter = adapter
    axios.defaults.adapter = adapter

    const response = await privateApi.get('/tasks')

    expect(response.data).toEqual({ status: 'ok', tasks: [] })
    expect(adapter.mock.calls.map(([config]) => config.url)).toEqual([
      '/tasks',
      '/auth/refreshToken',
      '/tasks'
    ])
    expect(readCookie('accessToken')).toBe('new-token')
  })

  it('does not retry other errors', async () => {
    const adapter = createAdapter(() => ({
      status: HTTP_STATUS_FORBIDDEN,
      data: { status: 'error', code: 'trial/permission-denied' }
    }))
    privateApi.defaults.adapter = adapter

    await expect(privateApi.get('/tasks')).rejects.toMatchObject({
      response: { status: HTTP_STATUS_FORBIDDEN }
    })
    expect(adapter).toHaveBeenCalledOnce()
  })
})
