import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './styles/global.css'
import App from './App.jsx'
import store from './store/index.js'

// Keep API base URL available for both browser builds (import.meta) and Jest/Node tests via globalThis.
const resolvedApiBaseUrl =
  (typeof globalThis !== 'undefined' && globalThis.__APP_CONFIG__?.apiBaseUrl)
    ? globalThis.__APP_CONFIG__.apiBaseUrl
    : (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_BASE_URL : undefined) ??
      'http://localhost:3000'

if (typeof globalThis !== 'undefined') {
  globalThis.__APP_CONFIG__ = {
    apiBaseUrl: resolvedApiBaseUrl
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
