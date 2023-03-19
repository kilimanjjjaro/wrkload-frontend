import { deleteCookie } from 'cookies-next'
import { clearCache } from 'services/clearCache'
import api from 'utils/api'

export default async function logout (): Promise<void> {
  window.localStorage.removeItem('user')
  deleteCookie('accessToken')
  await api.get('/auth/logout')
  await clearCache()
}
