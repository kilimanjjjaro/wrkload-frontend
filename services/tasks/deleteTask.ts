import api from 'utils/api'

import { TASKS_ENDPOINT } from 'constants/tasks'
import getAccessToken from 'services/getAccessToken'

export const deleteTask = async (_id: string): Promise<any> => {
  const accessToken = await getAccessToken()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.delete(`${TASKS_ENDPOINT}/${_id}`, config)

  return response.data
}
