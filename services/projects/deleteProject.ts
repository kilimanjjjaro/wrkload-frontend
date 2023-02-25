import api from 'utils/api'

import { PROJECTS_ENDPOINT } from 'constants/projects'
import getAccessToken from 'services/getAccessToken'

export const deleteProject = async (_id: string): Promise<any> => {
  const accessToken = await getAccessToken()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.delete(`${PROJECTS_ENDPOINT}/${_id}`, config)

  return response.data
}
