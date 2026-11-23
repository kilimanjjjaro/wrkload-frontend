import privateApi from 'utils/privateApi'

import { TASKS_ENDPOINT } from 'constants/tasks'
import { getCookie } from 'cookies-next/client'
import type { FullTaskInterface } from 'interfaces/tasks/Task'

export const deleteTask = async (_id: string): Promise<FullTaskInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  const response = await privateApi.delete<FullTaskInterface>(
    `${TASKS_ENDPOINT}/${_id}`,
    config
  )

  return response.data
}
