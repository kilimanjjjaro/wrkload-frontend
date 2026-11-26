import axios from 'axios'
import { API_URL } from 'constants/api'

axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: API_URL
})

export default api
