import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'

const AppRouter = () => {
  // Use the base path from Vite config for GitHub Pages deployment
  const basename = import.meta.env.BASE_URL || '/'
  
  console.log('🛣️ Router basename:', basename)
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
