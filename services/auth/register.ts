import api from 'utils/api'

import { DEFAULT_AVATAR, DEFAULT_ROLE } from 'constants/users'

interface Props {
  username: string
  email: string
  password: string
}

interface ReturnInterface {
  status: string
}

export default async function register ({ username, email, password }: Props): Promise<ReturnInterface> {
  const user = {
    username,
    email,
    password,
    avatar: DEFAULT_AVATAR,
    role: DEFAULT_ROLE
  }

  const response = await api.post('/auth/register', user)

  return response.data
}
