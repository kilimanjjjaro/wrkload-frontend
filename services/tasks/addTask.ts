import privateApi from 'utils/privateApi'

import type { FullTaskInterface, TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'
import { getCookie } from 'cookies-next'

export const addTask = async (task: TaskInterface): Promise<FullTaskInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const newTask = {
    title: task.title,
    project: task.project,
    timing: task.timing,
    deliveredAt: task.deliveredAt,
    description: task.description
  }

  const response = await privateApi.post(TASKS_ENDPOINT, newTask, config)

  return response.data.newTask
}
