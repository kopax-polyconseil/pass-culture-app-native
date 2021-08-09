import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { venueResponseSnap } from 'features/venue/fixtures/venueResponseSnap'
import { render, waitFor } from 'tests/utils'

import { Venue } from '../Venue'

jest.mock('react-query')

jest.mock('features/venue/api/useVenue')

jest.mock('features/venue/api/useVenueOffers')

const venueId = venueResponseSnap.id

describe('<Venue />', () => {
  afterEach(jest.clearAllMocks)

  it('should match snapshot', async () => {
    const venue = await renderVenue(venueId)
    expect(venue).toMatchSnapshot()
  })
})

async function renderVenue(id: number) {
  useRoute.mockImplementation(() => ({ params: { id } }))
  const wrapper = render(<Venue />)
  await waitFor(() => wrapper.getByTestId('Page de détail du lieu'))
  return wrapper
}