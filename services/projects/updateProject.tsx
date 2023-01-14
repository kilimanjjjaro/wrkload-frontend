import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import ProjectInterface from 'interfaces/projects/Project'
import api from 'utils/api'

export default async function updateProject (project: ProjectInterface): Promise<AxiosResponse<ProjectInterface>> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.patch(`/projects/${project._id as string}`, { name: project.name }, config)

  return response
}
