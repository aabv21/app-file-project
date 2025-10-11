import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'

const AppRouter = () => {
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
