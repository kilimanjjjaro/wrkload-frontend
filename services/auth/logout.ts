import { deleteCookie } from 'cookies-next'
import api from 'utils/api'

export default async function logout (): Promise<void> {
  await api.get('/auth/logout')
  deleteCookie('uid')
}
