import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const getUsers = async (): Promise<UserInterface[]> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${USERS_ENDPOINT}`, config)

  return response.data.users
}
