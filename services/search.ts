import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface Props {
  type: string
  project: string | null
  search: string | null
}

export default async function search ({ type, project, search }: Props): Promise<any> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`/${type}?project=${project as string}&search=${search as string}`, config)
  return response.data
}
