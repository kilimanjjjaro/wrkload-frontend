import { AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  password: string
}

export default async function logout ({ email, password }: CredentialsInterface): Promise<AxiosResponse> {
  const response = await api.post('/auth/login', { email, password })
  const { accessToken, expiresIn } = response.data
  setCookie('accessToken', accessToken, { maxAge: expiresIn })
  sessionStorage.setItem('user', JSON.stringify(response.data.user))
  return response
}
