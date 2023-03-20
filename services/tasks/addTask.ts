import privateApi from 'utils/privateApi'

import type { FullTaskInterface, TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'
import { getCookie } from 'cookies-next'

export const addTask = async (task: TaskInterface): Promise<FullTaskInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response = await privateApi.post(TASKS_ENDPOINT, task, config)

  return response.data.newTask
}
