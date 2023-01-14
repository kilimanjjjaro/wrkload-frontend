import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

export default async function updateUser (user: UserInterface): Promise<AxiosResponse<UserInterface>> {
  const body = {
    username: user.username,
    role: user.role,
    email: user.email,
    avatar: user.avatar
  }

  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.patch(`/users/${user._id as string}`, body, config)

  return response
}
