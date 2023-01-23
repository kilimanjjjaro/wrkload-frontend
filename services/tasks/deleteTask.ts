import { getCookie } from 'cookies-next'
import api from 'utils/api'

import { TASKS_ENDPOINT } from 'constants/tasks'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const deleteTask = async (_id: string): Promise<any> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.delete(`${TASKS_ENDPOINT}/${_id}`, config)

  return response.data
}
