import { AxiosResponse } from 'axios'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
}

export default async function rememberPassword ({ email }: CredentialsInterface): Promise<AxiosResponse> {
  const response = await api.post('/auth/forgot-password', { email })
  return response.data
}
