import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { ProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const addProject = async (project: ProjectInterface): Promise<ProjectInterface> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.post(PROJECTS_ENDPOINT, project, config)

  return response.data.newProject
}
