import privateApi from 'utils/privateApi'

import type { TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'
import { getCookie } from 'cookies-next'

export const addTask = async (task: TaskInterface): Promise<TaskInterface> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await privateApi.post(TASKS_ENDPOINT, task, config)

  return response.data.newTask
}
