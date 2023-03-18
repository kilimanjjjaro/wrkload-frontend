import privateApi from 'utils/privateApi'

import { TASKS_ENDPOINT } from 'constants/tasks'
import { getCookie } from 'cookies-next'

export const deleteTask = async (_id: string): Promise<any> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response = await privateApi.delete(`${TASKS_ENDPOINT}/${_id}`, config)

  return response.data
}
