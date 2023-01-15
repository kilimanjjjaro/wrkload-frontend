import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { TaskInterface } from 'interfaces/tasks/Task'
import api from 'utils/api'

export default async function addTask (task: TaskInterface): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.post('/tasks', task, config)
  return response
}
