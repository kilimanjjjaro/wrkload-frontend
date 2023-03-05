import { setCookie } from 'cookies-next'
import type { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  password: string
}

interface ReturnInterface {
  status: string
  user: UserInterface
  accessToken: string
  expiresIn: number
}

export default async function login ({ email, password }: CredentialsInterface): Promise<ReturnInterface> {
  const response = await api.post('/auth/login', { email, password })

  setCookie('accessToken', response.data.accessToken, {
    maxAge: response.data.expiresIn,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  return response.data
}
