import { getCookie } from 'cookies-next'
import api from 'utils/api'

import { PROJECTS_ENDPOINT } from 'constants/projects'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const deleteProject = async (_id: string): Promise<any> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.delete(`${PROJECTS_ENDPOINT}/${_id}`, config)

  return response.data
}
