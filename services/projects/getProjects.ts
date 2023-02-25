import api from 'utils/api'
import type { FullProjectInterface } from 'interfaces/projects/Project'
import { getCookie } from 'cookies-next'

interface Props {
  page: string | null
  noLimit?: boolean
}

export const getProjects = async ({ page, noLimit }: Props): Promise<FullProjectInterface> => {
  let currentPage: string

  if (page === null) {
    currentPage = '1'
  } else {
    currentPage = page
  }

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  if (noLimit === true) {
    const response = await api.get('/projects', config)
    return response.data
  } else {
    const response = await api.get(`/projects?limit=8&page=${currentPage}`, config)
    return response.data
  }
}
