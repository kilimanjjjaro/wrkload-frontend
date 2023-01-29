import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const getTasks = async (): Promise<TaskInterface[]> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(TASKS_ENDPOINT + '?project=Adidas', config)

  return response.data.tasks
}
