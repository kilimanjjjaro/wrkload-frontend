import api from 'utils/api'

interface Props {
  email: string
}

interface ReturnInterface {
  status: string
}

export default async function rememberPassword ({ email }: Props): Promise<ReturnInterface> {
  const response = await api.post('/auth/remember-password', { email })
  return response.data
}
