import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CompareDogsPage from './CompareDogsPage'

const mockDogs = [
  {
    id: 1,
    name: 'Beagle',
    reference_image_id: 'BJa4kxc4X',
    weight: { imperial: '20 - 30', metric: '9 - 14' },
    height: { imperial: '13 - 16', metric: '33 - 41' },
    bred_for: 'Hunting',
    breed_group: 'Hound',
    life_span: '12 - 15 years',
    temperament: 'Friendly, Curious',
    origin: 'England',
  },
  {
    id: 2,
    name: 'Poodle',
    reference_image_id: 'r1dG4g5Em',
    weight: { imperial: '45 - 70', metric: '20 - 32' },
    height: { imperial: '15 - 22', metric: '38 - 56' },
    bred_for: 'Companion',
    breed_group: 'Non-Sporting',
    life_span: '10 - 18 years',
    temperament: 'Intelligent, Active',
    origin: 'Germany',
  },
]

describe('CompareDogsPage', () => {
  test('shows message when no dogs are selected', () => {
    render(
      <MemoryRouter>
        <CompareDogsPage />
      </MemoryRouter>
    )

    expect(
      screen.getByText(
        /Return back home and select at least two breeds to compare dogs./i
      )
    ).toBeInTheDocument()
  })

  test('renders table with selected dogs', () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/compare-dogs', state: { selected: mockDogs } },
        ]}
      >
        <Routes>
          <Route path='/compare-dogs' element={<CompareDogsPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Beagle')).toBeInTheDocument()
    expect(screen.getByText('Poodle')).toBeInTheDocument()

    expect(screen.getByText('Weight (kg)')).toBeInTheDocument()
    expect(screen.getByText('Height (cm)')).toBeInTheDocument()
    expect(screen.getByText('Bred For')).toBeInTheDocument()

    const beagleImg = screen.getByTestId('dog-img-1')
    expect(beagleImg).toBeInTheDocument()
    expect(beagleImg).toHaveAttribute(
      'src',
      expect.stringContaining('BJa4kxc4X')
    )
  })
})
