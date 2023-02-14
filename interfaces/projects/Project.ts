import { PaginationInterface } from 'interfaces/components'

export interface ProjectInterface {
  _id: string
  name: string
  createdAt: string
  totalTasks: string
}

export interface ProjectStatsInterface {
  bestProjectOfPastMonth: string
}

export interface FullProjectInterface {
  status: string
  pagination: PaginationInterface
  projects: ProjectInterface[]
  stats: ProjectStatsInterface
}
