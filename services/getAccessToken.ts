import api from 'utils/api'

export default async function getAccessToken (): Promise<void> {
  const response = await api.get('/auth/refreshToken')

  return response.data
}
