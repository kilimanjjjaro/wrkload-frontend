import privateApi from 'utils/privateApi'

import type { ProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'
import { getCookie } from 'cookies-next'

export const updateProject = async (project: ProjectInterface): Promise<ProjectInterface> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const updatedProject = {
    name: project.name
  }

  const response = await privateApi.patch(`${PROJECTS_ENDPOINT}/${project._id}`, updatedProject, config)

  return response.data.updatedProject
}
