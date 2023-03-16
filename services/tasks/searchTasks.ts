import { getCookie } from 'cookies-next'
import privateApi from 'utils/privateApi'

interface Props {
  project: string | null
  query: string | null
  page: string | null
}

export default async function searchTasks ({ project, query, page }: Props): Promise<any> {
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

  const response = await privateApi.get(`/tasks?project=${project as string}&search=${query as string}&limit=8&page=${currentPage}`, config)

  return response.data
}
