import api from './api'

export default async function refreshToken (): Promise<void> {
  await api.get('/auth/refreshToken')
}
