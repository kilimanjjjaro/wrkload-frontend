import { getCookie } from 'cookies-next'
import api from 'utils/api'
import type { FullTaskInterface } from 'interfaces/tasks/Task'

interface Props {
  page: string | null
  project: string
}

export const getTasks = async ({ page, project }: Props): Promise<FullTaskInterface> => {
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

  const response = await api.get(`/tasks?project=${project}&limit=8&page=${currentPage}`, config)

  return response.data
}
