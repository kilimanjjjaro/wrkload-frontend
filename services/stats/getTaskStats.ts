import api from 'utils/api'

import type { TaskStatsInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'
import getAccessToken from 'services/getAccessToken'

export const getTaskStats = async ({ selectedProjectToFetch }: { selectedProjectToFetch: string }): Promise<TaskStatsInterface> => {
  const accessToken = await getAccessToken()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${TASKS_ENDPOINT}?project=${selectedProjectToFetch}`, config)

  return response.data.stats
}
