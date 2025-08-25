import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import CompareDogsPage from './pages/CompareDogsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/compare-dogs' element={<CompareDogsPage />} />
      </Routes>
    </Router>
  )
}

export default App
