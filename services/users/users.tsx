import { getCookies } from 'cookies-next'
import api from 'utils/api'
import type { UserInterface } from 'interfaces/users/User'
import { mutate } from 'swr'

const delay = async (): Promise<void> => await new Promise((resolve) => setTimeout(resolve, 1000))

export const usersEndpoint = '/users'

export const getUsers = async (): Promise<UserInterface[]> => {
  await delay()

  const { accessToken } = getCookies()

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
