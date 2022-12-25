import { Key } from 'react'

export interface StatsTasksInterface {
  id: Key | undefined
  hours: string | undefined
  text: string | undefined
}

export default interface TaskInterface {
  _id?: Number
  title?: string
  description?: string
  deliveredAt?: string
  timing?: string
}
