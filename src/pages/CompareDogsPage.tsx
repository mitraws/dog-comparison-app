import { Link, useLocation } from 'react-router-dom'
import type { ComparableKeys, Dog } from '../types'

const CompareDogsPage = () => {
  const location = useLocation()
  const selectedDogs: Dog[] = location.state?.selected || []

  const rows: { label: string; key: ComparableKeys }[] = [
    { label: 'Weight (kg)', key: 'weight' },
    { label: 'Height (cm)', key: 'height' },
    { label: 'Bred For', key: 'bred_for' },
    { label: 'Breed Group', key: 'breed_group' },
    { label: 'Life Span', key: 'life_span' },
    { label: 'Temperament', key: 'temperament' },
    { label: 'Origin', key: 'origin' },
  ]

  const DogHeader = ({ dog }: { dog: Dog }) => (
    <div className='dog-header'>
      {dog.reference_image_id && (
        <img
          src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
          alt=''
          data-testid={`dog-img-${dog.id}`}
          className='dog-image'
        />
      )}
      {dog.name}
    </div>
  )

  const renderDogAttribute = (
    value: string | number | { metric: string } | undefined
  ) => {
    if (!value) return '-'
    if (typeof value === 'object' && 'metric' in value) return value.metric
    return String(value)
  }

  return (
    <>
      <h1>Dog Comparison table</h1>
      {selectedDogs.length <= 1 ? (
        <p>Return back home and select at least two breeds to compare dogs.</p>
      ) : (
        <table className='comparison-table'>
          <thead>
            <tr>
              <th></th>
              {selectedDogs.map((dog) => (
                <th key={dog.id}>
                  <DogHeader dog={dog} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                {selectedDogs.map((dog) => (
                  <td key={dog.id}>{renderDogAttribute(dog[row.key])}</td>
                ))}
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
