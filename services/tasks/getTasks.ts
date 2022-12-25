import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import api from 'utils/api'

export default async function getTasks (): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.get('/tasks', config)
  sessionStorage.setItem('tasks', JSON.stringify(response.data.results))
  return response
}
