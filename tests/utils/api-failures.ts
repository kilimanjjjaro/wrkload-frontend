import type { Page } from '@playwright/test'
import { LOCAL_API_URL } from '../constants/api'

interface ApiErrorReply {
  status: number
  code: string
}

export const failApi = async (
  page: Page,
  path: string,
  reply: ApiErrorReply | 'network'
) => {
  await page.route(`${LOCAL_API_URL}${path}`, async (route) => {
    const request = route.request()

    if (request.method() === 'OPTIONS') {
      await route.fallback()
      return
    }

    if (reply === 'network') {
      await route.abort('connectionrefused')
      return
    }

    await route.fulfill({
      status: reply.status,
      headers: {
        'access-control-allow-origin':
          (await request.headerValue('origin')) ?? '*',
        'access-control-allow-credentials': 'true'
      },
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'error',
        code: reply.code,
        message: 'Error message from the api'
      })
    })
  })
}
