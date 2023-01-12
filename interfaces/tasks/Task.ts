import { Key } from 'react'

export interface StatsTasksInterface {
  id: Key | undefined
  hours: string | undefined
  text: string | undefined
}

export interface TaskInterface {
  _id?: Key | undefined
  title?: string
  project?: string
  deliveredAt?: string
  timing?: string
  month?: string
  description?: string
}
