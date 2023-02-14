import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { FullUserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'

export const getUsers = async (): Promise<FullUserInterface> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${USERS_ENDPOINT}`, config)

  return response.data
}
