import { getCookie } from 'cookies-next/client'
import { jwtDecode } from 'jwt-decode'
import privateApi from 'utils/privateApi'
import { USERS_ENDPOINT } from 'constants/users'
import type { UserInterface } from 'interfaces/users/User'

export const getUser = async (): Promise<UserInterface> => {
  let config = {}
  const accessToken = getCookie('accessToken')
  const { uid } = jwtDecode<{ uid: string }>(String(accessToken))

  if (accessToken !== undefined) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  const response = await privateApi.get<{ user: UserInterface }>(
    `${USERS_ENDPOINT}/${uid}`,
    config
  )

  return response.data.user
}
