import axios from 'axios'
import { parseCookies } from 'nookies'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000'

function getAPIClient() {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(async (config) => {
    const { access_token: token } = parseCookies()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return instance
}

export default getAPIClient()
