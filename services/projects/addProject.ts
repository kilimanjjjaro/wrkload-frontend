import privateApi from 'utils/privateApi'

import type { ProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'

export const addProject = async (project: ProjectInterface): Promise<ProjectInterface> => {
  const response = await privateApi.post(PROJECTS_ENDPOINT, project)

  return response.data.newProject
}
