import api from 'utils/api'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'
import getAccessToken from 'services/getAccessToken'

export const updateUser = async (user: UserInterface): Promise<UserInterface> => {
  const accessToken = await getAccessToken()

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
