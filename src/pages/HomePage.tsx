import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
interface Dog {
  id: string
  name: string
}

const HomePage = () => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://api.thedogapi.com/v1/breeds')
      .then((res) => {
        setDogs(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {' '}
      <h1>Dog Breeds</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>{dog.name}</li>
          ))}
        </ul>
      )}
      <div style={{ padding: '2rem' }}>
        <Link to='/compare-dogs'>Go to Compare Dogs</Link>
      </div>{' '}
    </>
  )
}

export default HomePage
