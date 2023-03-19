import { AxiosResponse } from 'axios'
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
  const response: AxiosResponse<ReturnInterface> = await api.post('/auth/login', { email, password })

  const { user, accessToken, expiresIn } = response.data

  setCookie('accessToken', accessToken, {
    maxAge: expiresIn,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  window.localStorage.setItem('user', JSON.stringify(user))

  return response.data
}
