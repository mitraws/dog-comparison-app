import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import CompareDogsPage from './pages/CompareDogsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to='/' style={{ padding: 5 }}>
          Home
        </Link>
        <Link to='/compare-dogs' style={{ padding: 5 }}>
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
