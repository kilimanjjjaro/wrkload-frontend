import axios from 'axios'

const api = axios.create({
  baseURL: 'https://wrkload-api-production.up.railway.app/api/v1'
})

export default api
