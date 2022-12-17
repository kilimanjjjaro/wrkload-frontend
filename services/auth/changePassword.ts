// import { setCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

const changePassword = async (user: UserInterface): Promise<void> => {
  const response = await api.post('/auth/login', user)
  console.log(response)
  // const { accessToken, expiresIn } = response.data
  // setCookie('accessToken', accessToken, { maxAge: expiresIn })
}

export default changePassword
