import axios, { AxiosResponse } from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const BASE_URL = `${process.env.NODE_ENV === 'production' ? 'https://wrkload-api-production.up.railway.app' : 'http://localhost:5000'}/api/v1`

interface RefreshTokenInterface {
  status: string
  accessToken: string
  expiresIn: number
}

const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('accessToken')

    if (accessToken !== undefined) {
      config.headers.Authorization = `Bearer ${accessToken as string}`
    }

    return config
  },
  async (error) => await Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config

    console.log(config?.sent)
    console.log(error?.response?.status)

    if (error?.response?.status === 401) {
      config.sent = true
      console.log('refreshing token...')

      const response: AxiosResponse<RefreshTokenInterface> = await axios({
        method: 'GET',
        baseURL: BASE_URL,
        url: '/auth/refreshToken'
      })

      if (response.data.accessToken !== undefined) {
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
      }

      return await axios(config)
    }
    return await Promise.reject(error)
  }
)

// api.interceptors.request.use(async (config) => {
//   const accessToken = getCookie('accessToken')

//   if (accessToken !== undefined) {
//     config.headers.Authorization = `Bearer ${accessToken as string}`
//   }

//   const { exp }: { exp: number } = jwt_decode(accessToken as string)
//   const isExpired = dayjs.unix(exp).diff(dayjs()) < 1

//   if (!isExpired) return config

//   const response: AxiosResponse<RefreshTokenInterface> = await axios({
//     method: 'GET',
//     baseURL: BASE_URL,
//     url: '/auth/refreshToken'
//   })

//   setCookie('accessToken', response.data.accessToken, {
//     maxAge: response.data.expiresIn,
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV === 'production'
//   })

//   config.headers.Authorization = `Bearer ${response.data.accessToken}`

//   return config
// })

export default api
