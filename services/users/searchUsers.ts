import { getCookie } from 'cookies-next/client'
import privateApi from 'utils/privateApi'
import type { FullUserInterface } from 'interfaces/users/User'

interface Props {
  query: string | null
  page: string | null
}

export default async function searchUsers({
  query,
  page
}: Props): Promise<FullUserInterface> {
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

  const response = await privateApi.get<FullUserInterface>(
    `/users?search=${String(query)}&limit=8&page=${currentPage}`,
    config
  )

  return response.data
}
