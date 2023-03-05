import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'
import jwtDecode from 'jwt-decode'

export const getUser = async (): Promise<UserInterface> => {
  const accessToken = getCookie('accessToken')
  const { uid }: { uid: string } = jwtDecode(accessToken as string)

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${USERS_ENDPOINT}/${uid}`, config)

  return response.data.user
}
