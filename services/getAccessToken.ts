import { CookieValueTypes, getCookie } from 'cookies-next'
import { isExpired } from 'react-jwt'
import api from 'utils/api'

export default async function getAccessToken (): Promise<CookieValueTypes> {
  const accessToken = getCookie('accessToken')

  const isAccessTokenExpired = isExpired(accessToken as string)

  if (isAccessTokenExpired || accessToken === undefined) {
    const response = await api.get('/auth/refreshToken')

    return response.data.accessToken
  } else {
    return accessToken
  }
}
