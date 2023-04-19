export const DEFAULT_AVATAR = 'https://wrkload.vercel.app/images/default-avatar.svg'

export const DEFAULT_ROLE = 3

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
