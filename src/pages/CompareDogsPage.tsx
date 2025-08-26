import { Link, useLocation } from 'react-router-dom'
import type { Dog } from '../types'

const CompareDogsPage = () => {
  const location = useLocation()
  const selectedDogs: Dog[] = location.state?.selected || []
  return (
    <>
      <h1>Comparison table</h1>
      {selectedDogs.length === 0 ? (
        <p>No breeds selected to compare. Return back home and select at least two breeds.</p>
      ) : (
        <ul>
          {selectedDogs.map((dog) => (
            <li key={dog.id}>{dog.name}</li>
          ))}
        </ul>
      )}
      <Link to='/'>Back to Home</Link>
    </>
  )
}

export default CompareDogsPage
