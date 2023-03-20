import { deleteCookie } from 'cookies-next'
import { mutate } from 'swr'
import api from 'utils/api'

export default async function logout (): Promise<void> {
  await api.get('/auth/logout')
  await mutate(() => true, undefined, { revalidate: false })
  window.localStorage.removeItem('user')
  deleteCookie('accessToken')
  deleteCookie('isLogged')
}
