import { getCookie } from 'cookies-next/client'
import privateApi from 'utils/privateApi'
import type {
  FullProjectInterface,
  ProjectInterface
} from 'interfaces/projects/Project'
import { PROJECTS_ENDPOINT } from 'constants/projects'

export const updateProject = async (
  project: ProjectInterface
): Promise<FullProjectInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  const updatedProject = {
    name: project.name
  }

  const response = await privateApi.patch<{
    updatedProject: FullProjectInterface
  }>(`${PROJECTS_ENDPOINT}/${project._id}`, updatedProject, config)

  return response.data.updatedProject
}
