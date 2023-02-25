import api from 'utils/api'

import type { ProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'
import getAccessToken from 'services/getAccessToken'

export const updateProject = async (project: ProjectInterface): Promise<ProjectInterface> => {
  const accessToken = await getAccessToken()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const updatedProject = {
    name: project.name
  }

  const response = await api.patch(`${PROJECTS_ENDPOINT}/${project._id}`, updatedProject, config)

  return response.data.updatedProject
}
