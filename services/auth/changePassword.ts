import { getCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

const changePassword = async (credentials: UserInterface): Promise<void> => {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  const response = await api.patch('/auth/change-password', credentials, config)
  return response.data
}

export default changePassword
