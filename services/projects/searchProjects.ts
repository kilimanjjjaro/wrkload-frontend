import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface Props {
  query: string | null
}

export default async function searchProjects ({ query }: Props): Promise<any> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`/projects?search=${query as string}`, config)
  console.log(response.data)
  return response.data.projects
}
