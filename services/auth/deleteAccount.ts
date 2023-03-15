import privateApi from 'utils/privateApi'
import login from 'services/auth/login'

interface Props {
  email: string
  password: string
}

interface ResponseInterface {
  status: string
}

export default async function deleteAccount ({ email, password }: Props): Promise<ResponseInterface> {
  const { user } = await login({ email, password })

  const response = await privateApi.delete(`/users/${user._id}`)

  return response.data
}
