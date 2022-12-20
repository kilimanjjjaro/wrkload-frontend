import { AxiosResponse } from 'axios'
import api from 'utils/api'

interface CredentialsInterface {
  email: string
}

const rememberPassword = async ({ email }: CredentialsInterface): Promise<AxiosResponse> => {
  const response = await api.post('/auth/forgot-password', { email })
  console.log(response)
  return response
}

export default rememberPassword
