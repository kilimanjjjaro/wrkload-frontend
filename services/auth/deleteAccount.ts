import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import api from 'utils/api'
import login from './login'

interface CredentialsInterface {
  email: string
  password: string
}

const deleteAccount = async ({ email, password }: CredentialsInterface): Promise<AxiosResponse> => {
  const { data } = await login({ email, password })
  const { user } = data
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.delete(`/users/${user._id as string}`, config)
  return response
}

export default deleteAccount
