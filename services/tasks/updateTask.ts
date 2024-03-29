import privateApi from 'utils/privateApi'
import { getCookie } from 'cookies-next'
import type { FullTaskInterface, TaskInterface } from 'interfaces/tasks/Task'
import { TASKS_ENDPOINT } from 'constants/tasks'

export const updateTask = async (task: TaskInterface): Promise<FullTaskInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const updatedTask = {
    title: task.title,
    project: task.project,
    deliveredAt: task.deliveredAt,
    timing: task.timing,
    description: task.description
  }

  const response = await privateApi.patch(`${TASKS_ENDPOINT}/${task._id}`, updatedTask, config)

  return response.data.updatedTask
}
