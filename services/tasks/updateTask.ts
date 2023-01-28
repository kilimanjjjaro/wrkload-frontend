import { getCookie } from 'cookies-next'
import api from 'utils/api'

import type { TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const updateTask = async (task: TaskInterface): Promise<TaskInterface> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const updatedTask = {
    title: task.title,
    project: task.project,
    deliveredAt: task.deliveredAt,
    timing: task.timing,
    description: task.description
  }

  const response = await api.patch(`${TASKS_ENDPOINT}/${task._id}`, updatedTask, config)

  return response.data.updatedTask
}
