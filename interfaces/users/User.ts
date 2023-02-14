import { PaginationInterface } from 'interfaces/components'

export interface UserInterface {
  _id: string
  role: number
  username: string
  email: string
  avatar: string
  registeredAt: string
  lastActiveAt: string
  recentlyActive: boolean
  confirmationStatus: boolean
  confirmationToken: string
}

export interface NewUserInterface {
  _id: string
  role: number
  username: string
  password: string
  email: string
  avatar: string
}

export interface FullUserInterface {
  status: string
  pagination: PaginationInterface
  users: UserInterface[]
}
