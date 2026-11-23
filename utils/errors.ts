import { isAxiosError } from 'axios'
import type { AxiosError } from 'axios'

interface ApiErrorData {
  code: string
  error: Array<{ param: string }>
}

export type ApiError = AxiosError<ApiErrorData>

export const apiErrorCode = (error: unknown): string | undefined =>
  isAxiosError<ApiErrorData>(error) ? error.response?.data.code : undefined
