import { setCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

const login = async (user: UserInterface): Promise<void> => {
  const response = await api.post('/auth/login', user)
  const { accessToken, expiresIn } = response.data
  setCookie('accessToken', accessToken, { maxAge: expiresIn })
  localStorage.setItem('user', JSON.stringify({ accessToken, expiresIn }))
  return response.data
}

export default login
