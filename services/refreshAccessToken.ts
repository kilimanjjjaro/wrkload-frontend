import { setCookie } from 'cookies-next'
import api from 'utils/api'

export default async function refreshAccessToken (): Promise<void> {
  const response = await api.get('/auth/refreshToken')

  setCookie('accessToken', response.data.accessToken, {
    maxAge: 60 * 15,
    sameSite: 'strict',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })
}
