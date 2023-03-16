import privateApi from 'utils/privateApi'

import { PROJECTS_ENDPOINT } from 'constants/projects'
import { getCookie } from 'cookies-next'

export const deleteProject = async (_id: string): Promise<any> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await privateApi.delete(`${PROJECTS_ENDPOINT}/${_id}`, config)

  return response.data
}
