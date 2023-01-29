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
  performance: string
}
