import { getCookie } from 'cookies-next'
import api from 'utils/api'
import type { TaskInterface } from 'interfaces/tasks/Task'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

const accessToken = getCookie('accessToken')

const config = {
  headers: {
    Authorization: `Bearer ${accessToken as string}`
  }
}

export const tasksEndpoint = '/tasks'

export const getTasks = async (): Promise<TaskInterface[]> => {
  await delay()
  const response = await api.get(tasksEndpoint, config)
  return response.data.results
}

export const addTask = async (task: TaskInterface): Promise<TaskInterface> => {
  await delay()
  const response = await api.post(tasksEndpoint, task, config)
  return response.data.result
}

export const updateTask = async (task: TaskInterface): Promise<TaskInterface> => {
  await delay()
  const updatedTask = {
    title: task.title,
    project: task.project,
    deliveredAt: task.deliveredAt,
    timing: task.timing,
    month: task.month,
    description: task.description
  }
  const response = await api.patch(`${tasksEndpoint}/${task._id}`, updatedTask, config)
  return response.data.result
}

export const deleteTask = async (_id: string): Promise<any> => {
  await delay()
  const response = await api.delete(`${tasksEndpoint}/${_id}`, config)
  return response.data
}
