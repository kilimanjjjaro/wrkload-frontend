import { Key } from 'react'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { ProjectInterface } from 'interfaces/projects/Project'
import api from 'utils/api'

export default async function deleteProject (_id: Key | undefined): Promise<AxiosResponse<ProjectInterface>> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.delete(`/projects/${_id as string}`, config)

  return response
}
