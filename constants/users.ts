export const DEFAULT_AVATAR = 'https://wrkload.vercel.app/images/default-avatar.svg' as const

export const DEFAULT_ROLE = 2 as const

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
} as const

export const USERS_ENDPOINT = '/users' as const
