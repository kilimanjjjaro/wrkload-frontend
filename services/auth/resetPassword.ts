import api from 'utils/api'

interface CredentialsInterface {
  newPassword: string
  uid: string
  resetPasswordToken: string
}

interface ReturnInterface {
  status: string
}

export default async function resetPassword ({ newPassword, uid, resetPasswordToken }: CredentialsInterface): Promise<ReturnInterface> {
  const response = await api.patch(`/auth/reset-password/${uid}/${resetPasswordToken}`, { newPassword })
  return response.data
}
