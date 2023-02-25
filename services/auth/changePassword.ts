import getAccessToken from 'services/getAccessToken'
import api from 'utils/api'

interface Props {
  email: string
  oldPassword: string
  newPassword: string
}

interface ReturnInterface {
  status: string
}

export default async function changePassword ({ email, oldPassword, newPassword }: Props): Promise<ReturnInterface> {
  const accessToken = await getAccessToken()

  const config = {
    headers: { Authorization: 'Bearer' + ` ${accessToken as string}` }
  }

  const response = await api.patch('/auth/change-password', { email, oldPassword, newPassword }, config)

  return response.data
}
