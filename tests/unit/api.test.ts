import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LOCAL_API_URL } from '../constants/api'

const DEPLOYED_API_ORIGIN = 'https://api.wrkload.test'

const loadClients = async () => {
  const { default: api } = await import('utils/api')
  const { default: privateApi } = await import('utils/privateApi')
  return [api, privateApi]
}

beforeEach(() => {
  vi.resetModules()
})

describe('api base url', () => {
  it('calls the api set in NEXT_PUBLIC_BACKEND_URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_BACKEND_URL', DEPLOYED_API_ORIGIN)

    for (const client of await loadClients()) {
      expect(client.defaults.baseURL).toBe(`${DEPLOYED_API_ORIGIN}/api/v1`)
    }
  })

  it('calls the local api when NEXT_PUBLIC_BACKEND_URL is not set', async () => {
    vi.stubEnv('NEXT_PUBLIC_BACKEND_URL', undefined)

    for (const client of await loadClients()) {
      expect(client.defaults.baseURL).toBe(LOCAL_API_URL)
    }
  })

  it('calls the local api when NEXT_PUBLIC_BACKEND_URL is empty', async () => {
    vi.stubEnv('NEXT_PUBLIC_BACKEND_URL', '')

    for (const client of await loadClients()) {
      expect(client.defaults.baseURL).toBe(LOCAL_API_URL)
    }
  })
})
