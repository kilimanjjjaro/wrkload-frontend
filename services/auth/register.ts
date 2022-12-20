import { AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'
import api from 'utils/api'

interface CredentialsInterface {
  username: string
  email: string
  password: string
}

const DEFAULT_AVATAR = 'http://localhost:3000/images/avatar.jpg'
const DEFAULT_ROLE = 2

const register = async ({ username, email, password }: CredentialsInterface): Promise<AxiosResponse> => {
  const user = {
    username,
    email,
    password,
    avatar: DEFAULT_AVATAR,
    role: DEFAULT_ROLE
  }
  const response = await api.post('/auth/register', user)
  const { accessToken, expiresIn } = response.data
  setCookie('accessToken', accessToken, { maxAge: expiresIn })
  return response
}

export default register
