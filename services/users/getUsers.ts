import api from 'utils/api'
import type { FullUserInterface } from 'interfaces/users/User'
import getAccessToken from 'services/getAccessToken'

export const getUsers = async ({ page }: { page: string | null }): Promise<FullUserInterface> => {
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

  const response = await api.get(`/users?limit=8&page=${currentPage}`, config)

  return response.data
}
