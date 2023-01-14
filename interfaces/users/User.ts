import { Key } from 'react'

export interface UserInterface {
  _id?: Key | undefined
  role?: number
  username: string
  email?: string
  avatar: string
  registeredAt?: string
  lastActiveAt?: string
  confirmationStatus?: boolean
  confirmationToken?: string
}
