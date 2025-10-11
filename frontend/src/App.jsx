import { useEffect } from 'react'
import AppRouter from './router/AppRouter'

const App = () => {
  useEffect(() => {
    console.log('🎯 App component mounted!')
    console.log('🌍 Current location:', window.location.href)
  }, [])

  return <AppRouter />
}

export default App
