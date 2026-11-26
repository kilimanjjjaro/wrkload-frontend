export const DEFAULT_AVATAR =
  'https://wrkload.kilimanjjjaro.com/images/default-avatar.svg'

export const ADMIN_ROLE = 1
export const TRIAL_ROLE = 2
export const PARTNER_ROLE = 3

export const DEFAULT_ROLE = PARTNER_ROLE

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
