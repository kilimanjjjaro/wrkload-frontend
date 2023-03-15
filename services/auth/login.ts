import axios from 'axios'
import { setCookie } from 'cookies-next'
import type { UserInterface } from 'interfaces/users/User'

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
  const response = await axios.post(`${process.env.NODE_ENV === 'production' ? 'https://wrkload-api-production.up.railway.app' : 'http://localhost:5000'}/api/v1/auth/login`, { email, password })
  console.log(response)

  const { accessToken, expiresIn } = response.data

  console.log(response)

  setCookie('accessToken', accessToken, {
    maxAge: expiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })

  return response.data
}
