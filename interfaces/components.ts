import { TaskInterface } from './tasks/Task'

export interface LayoutProps {
  children: React.ReactNode
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}

export interface ModalInterface {
  children: React.ReactNode
  dependency: boolean | TaskInterface
  close: () => void
}
