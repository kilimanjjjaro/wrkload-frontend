import { AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  password: string
}

const login = async ({ email, password }: CredentialsInterface): Promise<AxiosResponse> => {
  const response = await api.post('/auth/login', { email, password })
  const { accessToken, expiresIn } = response.data
  setCookie('accessToken', accessToken, { maxAge: expiresIn })
  return response
}

export default login
