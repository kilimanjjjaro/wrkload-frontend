import axios, { AxiosResponse } from 'axios'
import { getCookie, setCookie } from 'cookies-next'

const BASE_URL = `${process.env.NODE_ENV === 'production' ? 'https://wrkload-api.onrender.com' : 'http://localhost:5000'}/api/v1`

interface RefreshTokenInterface {
  status: string
  accessToken: string
  expiresIn: number
}

const privateApi = axios.create({
  baseURL: BASE_URL
})

privateApi.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('accessToken')

    if (accessToken !== undefined) {
      config.headers.Authorization = `Bearer ${accessToken as string}`
    }

    return config
  },
  async (error) => await Promise.reject(error)
)

privateApi.interceptors.response.use((response) => response, async (error) => {
  const config = error?.config

  if (error?.response?.status === 401 && config?.sent === undefined) {
    config.sent = true

    const response: AxiosResponse<RefreshTokenInterface> = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: '/auth/refreshToken'
    })

    setCookie('accessToken', response.data.accessToken, {
      maxAge: response.data.expiresIn,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    if (response.data.accessToken !== undefined) {
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
    }

    return await axios(config)
  }
  return await Promise.reject(error)
}
)

export default privateApi
