import type { SecureUserInterface } from 'interfaces/users/User'

const isStoredUser = (value: unknown): value is SecureUserInterface =>
  typeof value === 'object' && value !== null && '_id' in value && typeof value._id === 'string'

export const parseStoredBoolean = (stored: string): boolean => {
  const parsed: unknown = JSON.parse(stored)
  return parsed === true
}

export const parseStoredUser = (stored: string): SecureUserInterface | null => {
  const parsed: unknown = JSON.parse(stored)
  return isStoredUser(parsed) ? parsed : null
}
