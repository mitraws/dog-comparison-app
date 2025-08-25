import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dog Breeds</h1>
      <Link to='/compare-dogs'>Go to Compare Dogs</Link>
    </div>
  )
}

export default HomePage
