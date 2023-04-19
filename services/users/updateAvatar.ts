import privateApi from 'utils/privateApi'
import { getCookie } from 'cookies-next'
import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT } from 'constants/users'
import { AxiosResponse } from 'axios'

interface Props {
  avatar: string
}

interface AxiosInterface {
  status: string
  user: UserInterface
}

export const updateAvatar = async ({ avatar }: Props): Promise<UserInterface> => {
  let config = {}
  let _id = ''
  const accessToken = getCookie('accessToken')
  const userFromLocalStorage = window.localStorage.getItem('user')

  if (userFromLocalStorage !== null) {
    const user = JSON.parse(userFromLocalStorage)
    _id = user._id
  }

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    }
  }

  const response: AxiosResponse<AxiosInterface> = await privateApi.patch(`${USERS_ENDPOINT}/${_id}`, { avatar }, config)

  window.localStorage.setItem('user', JSON.stringify(response.data.user))

  return response.data.user
}
