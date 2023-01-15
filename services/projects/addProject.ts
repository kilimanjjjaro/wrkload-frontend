import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { ProjectInterface } from 'interfaces/projects/Project'
import api from 'utils/api'

export default async function addProject (project: ProjectInterface): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.post('/projects', project, config)
  return response
}
