export interface LayoutProps {
  children: React.ReactNode
}

export interface UserInterface {
  email: string
  password: string
}

export interface UserContextInterface {
  user: UserInterface[]
  showTaskModal: boolean
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}
