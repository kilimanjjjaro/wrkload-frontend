import { getCookie } from 'cookies-next'
import privateApi from 'utils/privateApi'
import { PROJECTS_ENDPOINT } from 'constants/projects'
import type { FullProjectInterface } from 'interfaces/projects/Project'

export const deleteProject = async (_id: string): Promise<FullProjectInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response = await privateApi.delete(`${PROJECTS_ENDPOINT}/${_id}`, config)

  return response.data
}
