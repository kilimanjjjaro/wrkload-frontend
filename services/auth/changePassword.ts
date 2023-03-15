import privateApi from 'utils/privateApi'

interface Props {
  email: string
  oldPassword: string
  newPassword: string
}

interface ReturnInterface {
  status: string
}

export default async function changePassword ({ email, oldPassword, newPassword }: Props): Promise<ReturnInterface> {
  const response = await privateApi.patch('/auth/change-password', { email, oldPassword, newPassword })

  return response.data
}
