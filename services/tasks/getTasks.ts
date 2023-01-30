import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'

export const getTasks = async ({ selectedProjectToFetch }: { selectedProjectToFetch: string }): Promise<TaskInterface[]> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${TASKS_ENDPOINT}?project=${selectedProjectToFetch}`, config)

  return response.data.tasks
}
