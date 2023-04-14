import { deleteCookie } from 'cookies-next'
import { toast } from 'sonner'
import { mutate } from 'swr'
import api from 'utils/api'

export default async function logout (): Promise<void> {
  try {
    await api.get('/auth/logout')
    await mutate(() => true, undefined, { revalidate: false })
    window.localStorage.removeItem('user')
    deleteCookie('accessToken')
    deleteCookie('isLogged')
    toast.success('Session ended successfully')
  } catch (error) {
    toast.error('Something went wrong. Please, try again!')
  }
}
