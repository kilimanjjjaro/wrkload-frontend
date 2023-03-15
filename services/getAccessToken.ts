import api from 'utils/api'

export default async function getAccessToken (): Promise<void> {
  const response = await api.get('/auth/refreshToken')

  console.log(response.data)

  return response.data
}
