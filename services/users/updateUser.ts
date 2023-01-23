import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const updateUser = async (user: UserInterface): Promise<UserInterface> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const updatedUser = {
    username: user.username
  }

  const response = await api.patch(`${USERS_ENDPOINT}/${user._id}`, updatedUser, config)
  return response.data.updatedUser
}
