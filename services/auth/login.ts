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

  const { accessToken, expiresIn } = response.data

  setCookie('accessToken', accessToken, {
    maxAge: expiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  return response.data
}
