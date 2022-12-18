import { decodeToken } from 'react-jwt'
import { getCookie } from 'cookies-next'
import api from 'utils/api'
import { SetStateAction } from 'react'

const getCurrentUser = async (): Promise<SetStateAction<any>> => {
  const accessToken = getCookie('accessToken')

  if (accessToken !== null) {
    const { uid } = decodeToken<any>(accessToken as string)
    const config = {
      headers: { Authorization: `Bearer ${accessToken as string}` }
    }
    const response = await api.get(`/users/${uid as string}`, config)
    return response.data.result
  }
}

export default getCurrentUser
