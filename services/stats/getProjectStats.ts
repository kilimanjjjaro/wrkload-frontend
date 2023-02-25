import api from 'utils/api'

import type { ProjectStatsInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'
import getAccessToken from 'services/getAccessToken'

export const getProjectStats = async (): Promise<ProjectStatsInterface> => {
  const accessToken = await getAccessToken()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(PROJECTS_ENDPOINT, config)

  return response.data.stats
}
