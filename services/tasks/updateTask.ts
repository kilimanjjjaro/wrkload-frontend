import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { TaskInterface } from 'interfaces/tasks/Task'
import api from 'utils/api'

export default async function updateTask (task: TaskInterface): Promise<AxiosResponse<TaskInterface>> {
  const body = {
    title: task.title,
    project: task.project,
    deliveredAt: task.deliveredAt,
    timing: task.timing,
    month: task.month,
    description: task.description
  }

  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.patch(`/tasks/${task._id as string}`, body, config)

  return response
}
