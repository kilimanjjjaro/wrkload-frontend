import axios from 'axios'

axios.defaults.withCredentials = true

const BASE_URL = `${process.env.NODE_ENV === 'production' ? 'https://wrkload-api-production.up.railway.app' : 'http://localhost:5000'}/api/v1`

const api = axios.create({
  baseURL: BASE_URL
})

export default api
