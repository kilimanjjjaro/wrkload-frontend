import { getCookie } from 'cookies-next/client'
import privateApi from 'utils/privateApi'
import type { FullTaskInterface } from 'interfaces/tasks/Task'

interface Props {
  project: string | null
  query: string | null
  page: string | null
}

export default async function searchTasks({
  project,
  query,
  page
}: Props): Promise<FullTaskInterface> {
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

  const response = await privateApi.get<FullTaskInterface>(
    `/tasks?project=${encodeURIComponent(String(project))}&search=${encodeURIComponent(String(query))}&limit=8&page=${currentPage}`,
    config
  )

  return response.data
}
