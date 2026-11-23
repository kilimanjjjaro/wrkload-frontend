import { getCookie } from 'cookies-next/client'
import privateApi from 'utils/privateApi'
import type { FullProjectInterface, ProjectInterface } from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'

export const addProject = async (project: ProjectInterface): Promise<FullProjectInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  const newProject = {
    name: project.name
  }

  const response = await privateApi.post<{ newProject: FullProjectInterface }>(PROJECTS_ENDPOINT, newProject, config)

  return response.data.newProject
}
