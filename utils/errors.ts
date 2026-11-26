import { isAxiosError } from 'axios'

export interface ApiErrorData {
  code: string
  error?: Array<{ param: string }>
}

export const UNKNOWN_ERROR_CODE = 'request/failed'

const COMMON_ERROR_MESSAGES: Partial<Record<string, string>> = {
  'mail/delivery-failed':
    'We could not send the email. Please, try again later.',
  'request/too-many-requests':
    'Too many attempts. Please, wait a few minutes and try again.'
}

const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please, try again later.'

export const apiErrorCode = (error: unknown): string | undefined =>
  isAxiosError<ApiErrorData | undefined>(error)
    ? error.response?.data?.code
    : undefined

export const errorCode = (error: unknown): string =>
  apiErrorCode(error) ?? UNKNOWN_ERROR_CODE

export const commonErrorMessage = (code: string): string =>
  COMMON_ERROR_MESSAGES[code] ?? FALLBACK_ERROR_MESSAGE

export const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error))
