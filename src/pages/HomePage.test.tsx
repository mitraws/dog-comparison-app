import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './HomePage'

const mockDogs = [
  { id: 1, name: 'Beagle' },
  { id: 2, name: 'Poodle' },
]

beforeEach(() => {
  globalThis.fetch = vi.fn(
    (): Promise<Response> =>
      Promise.resolve({
        json: () => Promise.resolve(mockDogs),
      } as unknown as Response)
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('HomePage', () => {
  test('renders title and loading state', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(screen.getByText(/dog breeds/i)).toBeInTheDocument()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  test('renders dog items after fetch', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const poodleItem = await screen.findByTestId('dog-2')
    await userEvent.click(poodleItem)
    expect(poodleItem).toHaveStyle('color: rgb(0, 0, 255)')

    expect(poodleItem).toBeInTheDocument()
  })

  test('clicking a dog toggles selection', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const beagleItem = await screen.findByText(/beagle/i)

    expect(beagleItem).toHaveStyle('color: rgb(128, 128, 128)')

    await userEvent.click(beagleItem)
    expect(beagleItem).toHaveStyle('color: rgb(0, 0, 255)')

    await userEvent.click(beagleItem)
    expect(beagleItem).toHaveStyle('color: rgb(128, 128, 128)')
  })
})
