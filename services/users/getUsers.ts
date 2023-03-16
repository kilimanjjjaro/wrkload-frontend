import { getCookie } from 'cookies-next'
import privateApi from 'utils/privateApi'
import type { FullUserInterface } from 'interfaces/users/User'

export const getUsers = async ({ page }: { page: string | null }): Promise<FullUserInterface> => {
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

  const response = await privateApi.get(`/users?limit=8&page=${currentPage}`, config)

  return response.data
}
