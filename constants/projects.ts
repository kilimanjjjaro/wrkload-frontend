import { StatsInterface } from 'interfaces/components'
import { ProjectInterface } from 'interfaces/projects/Project'

export const INITIAL_PROJECT_STATE: ProjectInterface = {
  _id: '',
  name: '',
  createdAt: '',
  totalTasks: ''
} as const

export const PROJECT_STATS: StatsInterface = {
  type: 'project',
  value: 'Bioland',
  avg: ''
} as const

export const PROJECTS_ENDPOINT = '/projects' as const
