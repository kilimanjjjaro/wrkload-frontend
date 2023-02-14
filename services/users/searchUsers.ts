import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface Props {
  query: string | null
}

export default async function searchUsers ({ query }: Props): Promise<any> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`/users?search=${query as string}`, config)

  return response.data
}
