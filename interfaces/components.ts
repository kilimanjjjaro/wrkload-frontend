import { TaskInterface } from 'interfaces/tasks/Task'
import { Dispatch, SetStateAction } from 'react'

export interface LayoutProps {
  children: React.ReactNode
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}
