import { AxiosError } from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { vi } from 'vitest'

interface FakeResponse {
  status: number
  data: unknown
}

const FIRST_ERROR_STATUS = 400

export const createAdapter = (
  handler: (config: InternalAxiosRequestConfig) => FakeResponse
) =>
  vi.fn(async (config: InternalAxiosRequestConfig) => {
    const { status, data } = handler(config)
    const response: AxiosResponse = {
      data,
      status,
      statusText: '',
      headers: {},
      config
    }

    if (status >= FIRST_ERROR_STATUS) {
      throw new AxiosError(
        `Request failed with status code ${status}`,
        AxiosError.ERR_BAD_RESPONSE,
        config,
        null,
        response
      )
    }

    return await Promise.resolve(response)
  })

export const authorizationOf = (config: InternalAxiosRequestConfig) =>
  config.headers.get('Authorization')

export const clearCookies = () => {
  for (const cookie of document.cookie.split(';')) {
    const [name] = cookie.split('=')
    document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }
}

export const readCookie = (name: string) =>
  document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1)

export const readDecodedCookie = (name: string) => {
  const value = readCookie(name)
  return value === undefined ? undefined : decodeURIComponent(value)
}
