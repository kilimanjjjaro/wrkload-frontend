import { setCookie } from 'cookies-next'
import api from 'utils/api'

const login = async (user: UserInterface) => {
  try {
    const response = await api.post('/auth/login', user)
    const { accessToken, expiresIn } = response.data
    setCookie('accessToken', accessToken, { maxAge: expiresIn })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default login
