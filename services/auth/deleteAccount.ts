import api from 'utils/api'
import login from 'services/auth/login'
import getAccessToken from 'services/getAccessToken'

interface Props {
  email: string
  password: string
}

interface ResponseInterface {
  status: string
}

export default async function deleteAccount ({ email, password }: Props): Promise<ResponseInterface> {
  const { _id } = await login({ email, password })

  const accessToken = await getAccessToken()

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.delete(`/users/${_id}`, config)

  return response.data
}
