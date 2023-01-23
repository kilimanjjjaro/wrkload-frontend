import { mutate } from 'swr'
import { getCookie, getCookies } from 'cookies-next'
import api from 'utils/api'

import type { UserInterface } from 'interfaces/users/User'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 500))

export const usersEndpoint = '/users'

export const getUsers = async (): Promise<UserInterface[]> => {
  await delay()

  const accessToken = getCookie('accessToken')

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${usersEndpoint}`, config)

  return response.data.results
}

export const getUser = async (): Promise<UserInterface> => {
  await delay()

  const { accessToken, _id } = getCookies()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const response = await api.get(`${usersEndpoint}/${_id as string}`, config)

  return response.data.result
}

export const clearCache = async (): Promise<void> => {
  await mutate(() => true, undefined, { revalidate: false })
}
