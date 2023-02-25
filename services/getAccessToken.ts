import api from 'utils/api'

export default async function getAccessToken (): Promise<void> {
  await api.get('/auth/refreshToken')
}
