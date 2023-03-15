import { setCookie } from 'cookies-next'
import api from 'utils/api'

export default async function getAccessToken (): Promise<void> {
  const response = await api.get('/auth/refreshToken')

  setCookie('accessToken', response.data.accessToken, {
    maxAge: response.data.expiresIn,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  return response.data
}
