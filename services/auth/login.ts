import { setCookie } from 'cookies-next'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  password: string
}

interface ReturnInterface {
  status: string
  _id: string
  accessToken: string
  expiresIn: number
}

export default async function login ({ email, password }: CredentialsInterface): Promise<ReturnInterface> {
  const response = await api.post('/auth/login', { email, password })
  setCookie('_id', response.data._id)
  return response.data
}
