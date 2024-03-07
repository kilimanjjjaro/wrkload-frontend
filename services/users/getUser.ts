import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import privateApi from 'utils/privateApi'
import { USERS_ENDPOINT } from 'constants/users'
import type { UserInterface } from 'interfaces/users/User'

export const getUser = async (): Promise<UserInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')
  const { uid }: { uid: string } = jwtDecode(accessToken as string)

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  const response = await privateApi.get(`${USERS_ENDPOINT}/${uid}`, config)

  return response.data.user
}
