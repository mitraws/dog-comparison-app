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
  const [searchDog, setSearchDog] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    axios
      .get('https://api.thedogapi.com/v1/breeds')
      .then((res) => {
        setDogs(res.data)
      })
      .catch(() => setError('Failed to fetch dog breeds'))
      .finally(() => setLoading(false))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    setSearchDog(searchTerm)
  }

  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchDog.toLowerCase())
  )

  return (
    <>
      <h1>Dog Breeds</h1>
      <div>
        <input
          type='text'
          value={searchDog}
          onChange={handleInputChange}
          placeholder='Type to search'
        />
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {filteredDogs.map((dog) => (
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
