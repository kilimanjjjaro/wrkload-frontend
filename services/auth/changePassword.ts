import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  oldPassword: string
  newPassword: string
}

export default async function changePassword ({ email, oldPassword, newPassword }: CredentialsInterface): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: 'Bearer' + ` ${accessToken as string}` }
  }
  const response = await api.patch('/auth/change-password', { email, oldPassword, newPassword }, config)
  return response
}
