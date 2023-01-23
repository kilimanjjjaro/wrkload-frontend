import { getCookie } from 'cookies-next'
import api from 'utils/api'

import { USERS_ENDPOINT } from 'constants/users'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const deleteUser = async (_id: string): Promise<any> => {
  await delay()

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
