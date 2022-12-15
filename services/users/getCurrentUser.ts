import { decodeToken } from 'react-jwt'
import { getCookie } from 'cookies-next'
import api from 'utils/api'

const getCurrentUser = async (): Promise<any> => {
  const accessToken = getCookie('accessToken')
  const { uid } = decodeToken<any>(accessToken as string)
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.get(`/users/${uid as string}`, config)
  return response.data.result
}

export default getCurrentUser
