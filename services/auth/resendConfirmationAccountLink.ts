import api from 'utils/api'

interface ReturnInterface {
  status: string
}

export default async function resendConfirmationAccountLink ({ email }: { email: string }): Promise<ReturnInterface> {
  const response = await api.post('/auth/resend-confirm-account', { email })
  return response.data
}
