import { TaskInterface } from 'interfaces/tasks/Task'

export const INITIAL_TASK_STATE: TaskInterface = {
  _id: '',
  title: '',
  project: '',
  createdAt: '',
  deliveredAt: '',
  timing: '',
  month: 'December',
  description: ''
}

export const TASKS_ENDPOINT = '/tasks'
