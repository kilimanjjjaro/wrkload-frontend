import { AxiosResponse } from 'axios'
import type { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
  password: string
}

interface ReturnInterface {
  status: string
  user: UserInterface
}

export default async function login ({ email, password }: CredentialsInterface): Promise<ReturnInterface> {
  const response: AxiosResponse<ReturnInterface> = await api.post('/auth/login', { email, password })

  const { user } = response.data

  window.localStorage.setItem('user', JSON.stringify(user))

  return response.data
}
