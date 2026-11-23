import axios, { isAxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getCookie, setCookie } from 'cookies-next/client'
import { HTTP_STATUS_UNAUTHORIZED } from 'constants/http'
import { toError } from 'utils/errors'

const BASE_URL = `${process.env.NODE_ENV === 'production' ? 'https://wrkload-api.onrender.com' : 'http://localhost:5000'}/api/v1`

interface RefreshTokenInterface {
  status: string
  accessToken?: string
  expiresIn: number
}

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  sent?: boolean
}

const privateApi = axios.create({
  baseURL: BASE_URL
})

privateApi.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken')

    if (accessToken !== undefined) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return config
  },
  (error: unknown) => {
    throw toError(error)
  }
)

privateApi.interceptors.response.use((response) => response, async (error: unknown) => {
  const config: RetriableRequestConfig | undefined = isAxiosError(error) ? error.config : undefined

  if (isAxiosError(error) && error.response?.status === HTTP_STATUS_UNAUTHORIZED && config !== undefined && config.sent === undefined) {
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
      config.headers.set('Authorization', `Bearer ${response.data.accessToken}`)
    }

    return await axios(config)
  }
  throw toError(error)
}
)

export default privateApi
