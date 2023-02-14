import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface Props {
  project: string | null
  query: string | null
}

export default async function searchTasks ({ project, query }: Props): Promise<any> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`/tasks?project=${project as string}&search=${query as string}`, config)
  return response.data.tasks
}
