import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const addTask = async (task: TaskInterface): Promise<TaskInterface> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.post(TASKS_ENDPOINT, task, config)

  return response.data.result
}
