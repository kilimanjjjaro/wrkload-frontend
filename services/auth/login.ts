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
  refreshToken: string
}

export default async function login ({ email, password }: CredentialsInterface): Promise<ReturnInterface> {
  const response: AxiosResponse<ReturnInterface> = await api.post('/auth/login', { email, password })

  const { user, accessToken, refreshToken } = response.data

  setCookie('accessToken', accessToken, {
    maxAge: 60 * 1,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production'
  })

  setCookie('refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'none',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })

  window.localStorage.setItem('user', JSON.stringify(user))

  return response.data
}
