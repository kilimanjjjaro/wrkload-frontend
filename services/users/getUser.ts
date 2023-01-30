import { getCookies } from 'cookies-next'
import api from 'utils/api'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'

export const getUser = async (): Promise<UserInterface> => {
  const { accessToken, _id } = getCookies()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${USERS_ENDPOINT}/${_id as string}`, config)

  return response.data.user
}
