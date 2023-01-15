import { Key } from 'react'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { UserInterface } from 'interfaces/users/User'
import api from 'utils/api'

export default async function deleteUser (_id: Key | undefined): Promise<AxiosResponse<UserInterface>> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.delete(`/users/${_id as string}`, config)

  return response
}
