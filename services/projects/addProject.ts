import privateApi from 'utils/privateApi'

import type { ProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'
import { getCookie } from 'cookies-next'

export const addProject = async (project: ProjectInterface): Promise<ProjectInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response = await privateApi.post(PROJECTS_ENDPOINT, project, config)

  return response.data.newProject
}
