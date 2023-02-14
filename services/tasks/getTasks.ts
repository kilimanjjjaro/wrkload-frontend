import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { FullTaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'

export const getTasks = async ({ project }: { project: string }): Promise<FullTaskInterface> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${TASKS_ENDPOINT}?project=${project}`, config)

  return response.data
}
