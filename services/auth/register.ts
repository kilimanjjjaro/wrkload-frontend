import { AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'
import api from 'utils/api'

import { DEFAULT_AVATAR, DEFAULT_ROLE } from 'constants/users'

interface CredentialsInterface {
  username: string
  email: string
  password: string
}

export default async function register ({ username, email, password }: CredentialsInterface): Promise<AxiosResponse> {
  const user = {
    username,
    email,
    password,
    avatar: DEFAULT_AVATAR,
    role: DEFAULT_ROLE
  }
  const response = await api.post('/auth/register', user)
  setCookie('_id', response.data._id)
  return response.data
}
