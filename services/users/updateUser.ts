import privateApi from 'utils/privateApi'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'
import { getCookie } from 'cookies-next'

export const updateUser = async (user: UserInterface): Promise<UserInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const updatedUser = {
    username: user.username
  }

  const response = await privateApi.patch(`${USERS_ENDPOINT}/${user._id}`, updatedUser, config)
  return response.data.updatedUser
}
