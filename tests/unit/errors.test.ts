import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'
import { UNKNOWN_ERROR_CODE, commonErrorMessage, errorCode } from 'utils/errors'
import {
  HTTP_STATUS_SERVICE_UNAVAILABLE,
  HTTP_STATUS_TOO_MANY_REQUESTS
} from '../constants/api'

const config = { headers: new AxiosHeaders() }

const apiError = (status: number, data: unknown) => {
  const response: AxiosResponse = {
    status,
    statusText: '',
    headers: {},
    config,
    data
  }
  return new AxiosError(
    'Request failed',
    'ERR_BAD_RESPONSE',
    config,
    {},
    response
  )
}

describe('errorCode', () => {
  it('reads the code the api answered', () => {
    expect(
      errorCode(
        apiError(HTTP_STATUS_TOO_MANY_REQUESTS, {
          status: 'error',
          code: 'request/too-many-requests'
        })
      )
    ).toBe('request/too-many-requests')
  })

  it.each([
    {
      name: 'a network failure',
      error: new AxiosError('Network Error', 'ERR_NETWORK', config)
    },
    {
      name: 'an answer without a body',
      error: apiError(HTTP_STATUS_SERVICE_UNAVAILABLE, undefined)
    },
    {
      name: 'an html answer from a proxy',
      error: apiError(
        HTTP_STATUS_SERVICE_UNAVAILABLE,
        '<html>Bad gateway</html>'
      )
    },
    { name: 'an error outside axios', error: new Error('boom') }
  ])('falls back to the unknown code for $name', ({ error }) => {
    expect(errorCode(error)).toBe(UNKNOWN_ERROR_CODE)
  })
})

describe('commonErrorMessage', () => {
  it.each([
    {
      code: 'mail/delivery-failed',
      message: 'We could not send the email. Please, try again later.'
    },
    {
      code: 'request/too-many-requests',
      message: 'Too many attempts. Please, wait a few minutes and try again.'
    },
    {
      code: UNKNOWN_ERROR_CODE,
      message: 'Something went wrong. Please, try again later.'
    },
    {
      code: 'server/unhandled-error',
      message: 'Something went wrong. Please, try again later.'
    }
  ])('explains $code', ({ code, message }) => {
    expect(commonErrorMessage(code)).toBe(message)
  })
})
