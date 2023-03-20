import privateApi from 'utils/privateApi'
import { USERS_ENDPOINT } from 'constants/users'
import { getCookie } from 'cookies-next'
import type { FullUserInterface } from 'interfaces/users/User'

export const deleteUser = async (_id: string): Promise<FullUserInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response = await privateApi.delete(`${USERS_ENDPOINT}/${_id}`, config)

  return response.data
}
