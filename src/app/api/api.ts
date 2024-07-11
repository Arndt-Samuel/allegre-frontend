import axios from 'axios'
import { QueryClient } from 'react-query'
import { restoreItem } from './storage'

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  async (config) => {
    const { data: token } = await restoreItem('@Allegre_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export const queryClient = new QueryClient()
