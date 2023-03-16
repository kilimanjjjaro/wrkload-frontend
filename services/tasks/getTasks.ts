import privateApi from 'utils/privateApi'
import type { FullTaskInterface } from 'interfaces/tasks/Task'
import { getCookie } from 'cookies-next'

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

  const response = await privateApi.get(`/tasks?project=${project}&limit=8&page=${currentPage}`, config)

  return response.data
}
