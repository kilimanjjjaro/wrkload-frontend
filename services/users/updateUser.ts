import privateApi from 'utils/privateApi'
import { getCookie } from 'cookies-next'
import type { FullUserInterface, UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'

export const updateUser = async (user: UserInterface): Promise<FullUserInterface> => {
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
