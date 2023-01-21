import { UserInterface } from 'interfaces/users/User'

export const INITIAL_USER_STATE: UserInterface = {
  _id: '',
  username: '',
  email: '',
  role: 2,
  avatar: '/images/default-avatar.svg',
  registeredAt: '',
  lastActiveAt: '',
  confirmationStatus: false
}

export const USERS = [
  { _id: 1, username: 'kilimanjjjaro', email: 'hola@kilimanjjjaro.com', role: 1, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: true },
  { _id: 1, username: 'rivotril', email: 'hola@kilimanjjjaro.com', role: 2, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: false },
  { _id: 1, username: 'AG5', email: 'hola@kilimanjjjaro.com', role: 3, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: false },
  { _id: 1, username: 'kediev', email: 'hola@kilimanjjjaro.com', role: 1, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: true }
]
