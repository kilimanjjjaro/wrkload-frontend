import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface Props {
  query: string | null
  page: string | null
}

export default async function searchUsers ({ query, page }: Props): Promise<any> {
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

  const response = await api.get(`/users?search=${query as string}&limit=8&page=${currentPage}`, config)

  return response.data
}
