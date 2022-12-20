import { AxiosResponse } from 'axios'
import api from 'utils/api'

interface CredentialsInterface {
  newPassword: string
  uid: string
  resetPasswordToken: string
}

const resetPassword = async ({ newPassword, uid, resetPasswordToken }: CredentialsInterface): Promise<AxiosResponse> => {
  const response = await api.patch(`/auth/reset-password/${uid}/${resetPasswordToken}`, { newPassword })
  console.log(response)
  return response
}

export default resetPassword
