export const DEFAULT_AVATAR = 'http://localhost:3000/images/default-avatar.svg'

export const DEFAULT_ROLE = 2

export const INITIAL_USER_STATE = {
  _id: '',
  username: '',
  email: '',
  role: DEFAULT_ROLE,
  avatar: DEFAULT_AVATAR,
  registeredAt: '',
  lastActiveAt: '',
  recentlyActive: false,
  confirmationStatus: false,
  confirmationToken: ''
}

export const USERS_ENDPOINT = '/users'
