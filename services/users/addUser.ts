import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

export default async function addUser (user: UserInterface): Promise<AxiosResponse> {
  const accessToken = getCookie('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }
  const response = await api.post('/users', user, config)
  return response
}
