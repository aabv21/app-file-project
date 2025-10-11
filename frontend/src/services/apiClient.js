import axios from 'axios'

const resolveBaseUrl = () => {
  if (typeof globalThis !== 'undefined') {
    if (globalThis.__APP_CONFIG__?.apiBaseUrl) {
      return globalThis.__APP_CONFIG__.apiBaseUrl
    }

    if (globalThis.process?.env?.VITE_API_BASE_URL) {
      return globalThis.process.env.VITE_API_BASE_URL
    }
  }

  return 'http://localhost:3000'
}

const baseURL = resolveBaseUrl()

const apiClient = axios.create({
  baseURL,
  timeout: 8000
})

export default apiClient
