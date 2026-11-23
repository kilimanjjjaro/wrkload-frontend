import privateApi from 'utils/privateApi'
import type { FullProjectInterface } from 'interfaces/projects/Project'
import { getCookie } from 'cookies-next/client'

interface Props {
  page: string | null
  noLimit?: boolean
}

export const getProjects = async ({ page, noLimit }: Props): Promise<FullProjectInterface> => {
  let currentPage = '1'
  let config = {}
  const accessToken = getCookie('accessToken')

  if (page !== null) {
    currentPage = page
  }

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  if (noLimit === true) {
    const response = await privateApi.get<FullProjectInterface>('/projects', config)
    return response.data
  } else {
    const response = await privateApi.get<FullProjectInterface>(`/projects?limit=11&page=${currentPage}`, config)
    return response.data
  }
}
