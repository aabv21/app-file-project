import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

console.log('🔧 [apiClient] VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
console.log('🔧 [apiClient] Resolved baseURL:', baseURL)
console.log('🔧 [apiClient] All env vars:', import.meta.env)

const apiClient = axios.create({
  baseURL,
  timeout: 8000
})

// Log requests
apiClient.interceptors.request.use(request => {
  console.log('🚀 [apiClient] Request:', request.method?.toUpperCase(), request.url, '→', `${request.baseURL}${request.url}`)
  return request
})

// Log responses
apiClient.interceptors.response.use(
  response => {
    console.log('✅ [apiClient] Response:', response.status, response.config.url)
    return response
  },
  error => {
    console.error('❌ [apiClient] Error:', error.message, error.config?.url)
    return Promise.reject(error)
  }
)

export default apiClient
