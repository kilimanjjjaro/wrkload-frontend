import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.NODE_ENV === 'production' ? 'https://wrkload-api-production.up.railway.app/api/v1' : 'http://localhost:3000'}/api/v1`,
  withCredentials: true
})

export default api
