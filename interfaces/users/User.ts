export interface UserInterface {
  _id: string
  role: number
  username: string
  email: string
  avatar: string
  registeredAt: string
  lastActiveAt: string
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
