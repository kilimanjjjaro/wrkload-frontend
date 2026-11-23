import privateApi from 'utils/privateApi'
import { USERS_ENDPOINT } from 'constants/users'
import { getCookie } from 'cookies-next/client'
import type { FullUserInterface } from 'interfaces/users/User'

export const deleteUser = async (_id: string): Promise<FullUserInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  const response = await privateApi.delete<FullUserInterface>(
    `${USERS_ENDPOINT}/${_id}`,
    config
  )

  return response.data
}
