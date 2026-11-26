import { setCookie } from 'cookies-next/client'
import type { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'
import { accessTokenCookieOptions } from 'utils/cookies'

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

export default async function login({
  email,
  password
}: CredentialsInterface): Promise<ReturnInterface> {
  const { data } = await api.post<ReturnInterface>('/auth/login', {
    email,
    password
  })

  const { user, accessToken, expiresIn } = data

  setCookie('accessToken', accessToken, accessTokenCookieOptions(expiresIn))

  window.localStorage.setItem('user', JSON.stringify(user))

  return data
}
