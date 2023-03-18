import { deleteCookie } from 'cookies-next'
import { clearCache } from 'services/clearCache'
import api from 'utils/api'

export default async function logout (): Promise<void> {
  window.localStorage.removeItem('user')
  await api.get('/auth/logout')
  await clearCache()
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
}
