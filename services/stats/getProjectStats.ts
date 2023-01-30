import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { ProjectStatsInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'

export const getProjectStats = async (): Promise<ProjectStatsInterface> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(PROJECTS_ENDPOINT, config)

  return response.data.stats
}
