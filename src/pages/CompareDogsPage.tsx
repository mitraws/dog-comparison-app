import { Link, useLocation } from 'react-router-dom'
import type { Dog } from '../types'

const CompareDogsPage = () => {
  const location = useLocation()
  const selectedDogs: Dog[] = location.state?.selected || []

  const rows: { label: string; key: keyof Dog }[] = [
    { label: 'Weight (kg)', key: 'weight' },
    { label: 'Height (cm)', key: 'height' },
    { label: 'Bred For', key: 'bred_for' },
    { label: 'Breed Group', key: 'breed_group' },
    { label: 'Life Span', key: 'life_span' },
    { label: 'Temperament', key: 'temperament' },
    { label: 'Origin', key: 'origin' },
  ]

  return (
    <>
      <h1>Dog Comparison table</h1>
      {selectedDogs.length <= 1 ? (
        <p>Return back home and select at least two breeds to compare dogs.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th></th>
              {selectedDogs.map((dog) => (
                <th key={dog.id}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {dog.reference_image_id && (
                      <img
                        src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                        alt=''
                        className='dog-image'
                      />
                    )}
                    {dog.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                {selectedDogs.map((dog) => {
                  const value = dog[row.key]

                  const renderCell = (
                    value: string | number | { metric: string } | undefined
                  ) => {
                    if (!value) return '-'
                    if (typeof value === 'object' && 'metric' in value)
                      return value.metric
                    return String(value)
                  }

                  return <td key={dog.id}>{renderCell(value)}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to='/' className='button-link'>
        Back to Home
      </Link>
    </>
  )
}

export default CompareDogsPage
