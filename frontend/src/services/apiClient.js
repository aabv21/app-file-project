import axios from 'axios'

const resolveBaseUrl = () => {
  // Check Vite environment variable (works in both dev and production builds)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }

  // Fallback to global config if set
  if (typeof globalThis !== 'undefined' && globalThis.__APP_CONFIG__?.apiBaseUrl) {
    return globalThis.__APP_CONFIG__.apiBaseUrl
  }

  // Default to localhost for local development
  return 'http://localhost:3000'
}

const baseURL = resolveBaseUrl()

const apiClient = axios.create({
  baseURL,
  timeout: 8000
})

export default apiClient
