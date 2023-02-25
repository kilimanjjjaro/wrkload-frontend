import getAccessToken from 'services/getAccessToken'
import api from 'utils/api'

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

  const accessToken = await getAccessToken()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`/tasks?project=${project as string}&search=${query as string}&limit=1&page=${currentPage}`, config)

  return response.data
}
