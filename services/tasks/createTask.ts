import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import api from 'utils/api'

interface TaskInterface {
  title: string
  project: string
  timing: string
  month: string
  deliveredAt: string
  description: string
}

export default async function createTask (task: TaskInterface): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.post('/tasks', task, config)
  return response
}
