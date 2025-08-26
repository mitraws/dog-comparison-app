import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import CompareDogsPage from './pages/CompareDogsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/compare-dogs' style={{ padding: 20 }}>
          Compare Dogs
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/compare-dogs' element={<CompareDogsPage />} />
      </Routes>
    </Router>
  )
}

export default App
