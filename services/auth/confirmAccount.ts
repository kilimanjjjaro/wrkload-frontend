import { AxiosResponse } from 'axios'
import api from 'utils/api'

interface CredentialsInterface {
  confirmAccountToken: string
}

export default async function confirmAccount ({ confirmAccountToken }: CredentialsInterface): Promise<AxiosResponse> {
  const response = await api.patch(`/auth/confirm-account/${confirmAccountToken}`)

  return response.data
}
