import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { FullProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'

export const getProjects = async (): Promise<FullProjectInterface> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(PROJECTS_ENDPOINT, config)

  return response.data
}
