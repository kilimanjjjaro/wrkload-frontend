import { setCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

const login = async (credentials: UserInterface): Promise<void> => {
  const response = await api.post('/auth/login', credentials)
  const { accessToken, expiresIn } = response.data
  setCookie('accessToken', accessToken, { maxAge: expiresIn })
}

export default login
