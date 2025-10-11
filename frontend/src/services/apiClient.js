import axios from 'axios'

// Vite replaces import.meta.env.VITE_API_BASE_URL at build time
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Debug logging
console.log('=== API Client Configuration ===')
console.log('VITE_API_BASE_URL from import.meta.env:', import.meta.env.VITE_API_BASE_URL)
console.log('Resolved baseURL:', baseURL)
console.log('All import.meta.env:', import.meta.env)
console.log('================================')

const apiClient = axios.create({
  baseURL,
  timeout: 8000
})

// Log all requests
apiClient.interceptors.request.use(request => {
  console.log('🚀 API Request:', request.method?.toUpperCase(), request.url, 'Full URL:', `${request.baseURL}${request.url}`)
  return request
})

// Log all responses
apiClient.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.config.url, 'Status:', response.status)
    return response
  },
  error => {
    console.error('❌ API Error:', error.config?.url, 'Error:', error.message)
    return Promise.reject(error)
  }
)

export default apiClient
