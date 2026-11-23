import privateApi from 'utils/privateApi'

import type { FullTaskInterface, TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'
import { getCookie } from 'cookies-next/client'

export const addTask = async (task: TaskInterface): Promise<FullTaskInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
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

  const response = await privateApi.post<{ newTask: FullTaskInterface }>(TASKS_ENDPOINT, newTask, config)

  return response.data.newTask
}
