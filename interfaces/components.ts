import { Signal } from '@preact/signals-core'

export interface LayoutProps {
  children: React.ReactNode
}

export interface UserInterface {
  email: string
  password: string
}

export interface UserContextInterface {
  user: Signal<UserInterface>
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}
