import { UserInterface } from 'interfaces/users/User'

export const INITIAL_USER_STATE: UserInterface = {
  _id: '',
  username: '',
  email: '',
  role: 2,
  avatar: '/images/default-avatar.svg',
  registeredAt: '',
  lastActiveAt: '',
  confirmationStatus: false,
  confirmationToken: ''
}
