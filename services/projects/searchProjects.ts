import { getCookie } from 'cookies-next/client'
import privateApi from 'utils/privateApi'
import type { FullProjectInterface } from 'interfaces/projects/Project'

interface Props {
  query: string | null
  page: string | null
}

export default async function searchProjects ({ query, page }: Props): Promise<FullProjectInterface> {
  let currentPage = '1'
  let config = {}
  const accessToken = getCookie('accessToken')

  if (page !== null) {
    currentPage = page
  }

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response = await privateApi.get(`/projects?search=${query as string}&limit=8&page=${currentPage}`, config)

  return response.data
}
