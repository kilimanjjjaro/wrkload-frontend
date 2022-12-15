import { setCookie } from 'cookies-next'
import { NewUserInterface } from 'interfaces/users/User'
import api from 'utils/api'

const DEFAULT_AVATAR = 'https://kilimanjjjaro.com/old/img/logo.svg'
const DEFAULT_ROLE = 2

const register = async (newUser: NewUserInterface): Promise<void> => {
  const user = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
    avatar: DEFAULT_AVATAR,
    role: DEFAULT_ROLE
  }
  const response = await api.post('/auth/register', user)
  const { accessToken, expiresIn } = response.data
  setCookie('accessToken', accessToken, { maxAge: expiresIn })
}

export default register
