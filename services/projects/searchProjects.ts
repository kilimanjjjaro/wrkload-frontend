import { getCookie } from 'cookies-next/client'
import privateApi from 'utils/privateApi'
import type { FullProjectInterface } from 'interfaces/projects/Project'

interface Props {
  query: string | null
  page: string | null
}

export default async function searchProjects({
  query,
  page
}: Props): Promise<FullProjectInterface> {
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

  const response = await privateApi.get<FullProjectInterface>(
    `/projects?search=${String(query)}&limit=8&page=${currentPage}`,
    config
  )

  return response.data
}
