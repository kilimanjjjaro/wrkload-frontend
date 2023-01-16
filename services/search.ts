import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import api from 'utils/api'

export default async function search (type: string, query: string): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`/${type}?query=${query}`, config)

  return response
}
