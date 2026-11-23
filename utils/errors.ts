import { isAxiosError } from 'axios'
import type { AxiosError } from 'axios'

export interface ApiErrorData {
  code: string
  error: Array<{ param: string }>
}

export type ApiError = AxiosError<ApiErrorData>

export const apiErrorCode = (error: unknown): string | undefined =>
  isAxiosError<ApiErrorData>(error) ? error.response?.data.code : undefined

export const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error))
