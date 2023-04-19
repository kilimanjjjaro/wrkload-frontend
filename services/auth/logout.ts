import { deleteCookie } from 'cookies-next'
import { mutate } from 'swr'
import api from 'utils/api'

interface LogoutResponseInterface {
  status: string
}

export default async function logout (): Promise<LogoutResponseInterface> {
  const response = await api.get('/auth/logout')

  if (response.data.status === 'ok') {
    await mutate(() => true, undefined, { revalidate: false })
    window.localStorage.removeItem('user')
    deleteCookie('accessToken')
    deleteCookie('isLogged')
  }

  return response.data
}
