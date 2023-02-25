import api from 'utils/api'

import { USERS_ENDPOINT } from 'constants/users'
import { getCookie } from 'cookies-next'

export const deleteUser = async (_id: string): Promise<any> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.delete(`${USERS_ENDPOINT}/${_id}`, config)

  console.log(response.data)

  return response.data
}
