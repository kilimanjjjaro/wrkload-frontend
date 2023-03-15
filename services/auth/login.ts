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

  const { accessToken, refreshToken } = response.data

  setCookie('accessToken', accessToken, {
    maxAge: 10,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  setCookie('refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })

  return response.data
}
