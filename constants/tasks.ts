import { StatsInterface } from 'interfaces/components'
import { TaskInterface } from 'interfaces/tasks/Task'

export const INITIAL_TASK_STATE: TaskInterface = {
  _id: '',
  title: '',
  project: '',
  createdAt: '',
  deliveredAt: '',
  timing: '',
  description: ''
} as const

export const TASK_STATS: StatsInterface[] = [
  { type: 'totalTasks', value: '400', avg: 'better' },
  { type: 'totalMonthlyHours', value: '20', avg: 'worst' }
]

export const TASKS_ENDPOINT = '/tasks' as const
