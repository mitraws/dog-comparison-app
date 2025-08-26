import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Dog } from '../types'

const HomePage = () => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(false)
  const [searchDog, setSearchDog] = useState('')
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Dog[]>([])

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

  const toggleSelect = (item: Dog) => {
    setSelected((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    )
  }

  return (
    <>
      <h1>Dog Breeds</h1>
      <input
        type='text'
        value={searchDog}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Select Dog Breeds</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredDogs.map((dog) => (
              <li
                key={dog.id}
                onClick={() => toggleSelect(dog)}
                style={{
                  cursor: 'pointer',
                  color: selected.some((i) => i.id === dog.id)
                    ? 'blue'
                    : 'gray',
                }}
              >
                {dog.name}
              </li>
            ))}
          </ul>
        </>
      )}
      <>
        <Link
          to='/compare-dogs'
          state={{ selected }}
          style={{
            padding: '0.5rem 1rem',
            background: '#007BFF',
            color: '#fff',
          }}
        >
          Compare Selected Dogs
        </Link>
      </>
    </>
  )
}

export default HomePage
