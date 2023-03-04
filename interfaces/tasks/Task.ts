import type { PaginationInterface } from 'interfaces/components'
import { Key } from 'react'

export interface StatsTasksInterface {
  id: Key | undefined
  hours: string | undefined
  text: string | undefined
}

export interface TaskInterface {
  _id: string
  title: string
  project: string
  createdAt: string
  deliveredAt: string
  timing: string
  description: string
}

export interface TaskStatsInterface {
  totalPastMonthTiming: number
  totalTasksPastMonth: number
  totalCurrentMonthTiming: number
  totalTasksCurrentMonth: number
  performance: string
}

export interface FullTaskInterface {
  status: string
  pagination: PaginationInterface
  tasks: TaskInterface[]
  stats: TaskStatsInterface
}
