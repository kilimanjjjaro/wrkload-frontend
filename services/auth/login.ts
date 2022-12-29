import { AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  password: string
}

export default async function login ({ email, password }: CredentialsInterface): Promise<AxiosResponse> {
  const response = await api.post('/auth/login', { email, password })
  setCookie('uid', response.data.uid)
  return response
}
