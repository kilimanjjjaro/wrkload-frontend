import privateApi from 'utils/privateApi'

import { USERS_ENDPOINT } from 'constants/users'
import { getCookie } from 'cookies-next'

export const deleteUser = async (_id: string): Promise<any> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await privateApi.delete(`${USERS_ENDPOINT}/${_id}`, config)

  return response.data
}
