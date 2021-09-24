import mockdate from 'mockdate'
import React from 'react'
import { UseQueryResult } from 'react-query'
import { mocked } from 'ts-jest/utils'

import { initialSearchState } from 'features/search/pages/reducer'
import { useVenueOffers } from 'features/venue/api/useVenueOffers'
import { VenueOffersResponseSnap } from 'features/venue/fixtures/venueOffersResponseSnap'
import { venueResponseSnap } from 'features/venue/fixtures/venueResponseSnap'
import { AlgoliaHit } from 'libs/algolia'
import { analytics } from 'libs/analytics'
import { fireEvent, render } from 'tests/utils'

import { VenueOffers } from '../VenueOffers'

const venueId = venueResponseSnap.id

mockdate.set(new Date('2021-08-15T00:00:00Z'))

jest.mock('react-query')
jest.mock('features/auth/settings')
jest.mock('features/venue/api/useVenue')
jest.mock('features/venue/api/useVenueOffers')
const mockUseVenueOffers = mocked(useVenueOffers)

const mockSearchState = initialSearchState
const mockDispatch = jest.fn()
const mockStagedDispatch = jest.fn()
jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({ searchState: mockSearchState, dispatch: mockDispatch }),
  useStagedSearch: () => ({ searchState: mockSearchState, dispatch: mockStagedDispatch }),
}))

describe('<VenueOffers />', () => {
  beforeEach(jest.clearAllMocks)
  it('should render correctly', () => {
    const renderAPI = render(<VenueOffers venueId={venueId} />)
    expect(renderAPI).toMatchSnapshot()
  })

  it('should display "En voir plus" button if nbHits is more than hits.length', () => {
    const { queryByText } = render(<VenueOffers venueId={venueId} />)
    expect(queryByText('En voir plus')).toBeTruthy()
  })

  it(`should not display "En voir plus" button if nbHits is same as hits.length`, () => {
    mockUseVenueOffers.mockReturnValueOnce({
      data: { hits: VenueOffersResponseSnap, nbHits: VenueOffersResponseSnap.length },
    } as UseQueryResult<{ hits: AlgoliaHit[]; nbHits: number }, unknown>)

    const { queryByText } = render(<VenueOffers venueId={venueId} />)
    expect(queryByText('En voir plus')).toBeFalsy()
  })

  it(`should set search state when clicking "En voir plus" button`, () => {
    const { getByText } = render(<VenueOffers venueId={venueId} />)
    fireEvent.press(getByText('En voir plus'))
    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_STATE',
      payload: expect.anything(),
    })
    expect(mockStagedDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_STATE',
      payload: expect.anything(),
    })
  })

  it(`should log analytics event VenueSeeMoreClicked when clicking "En voir plus" button`, () => {
    const { getByText } = render(<VenueOffers venueId={venueId} />)
    fireEvent.press(getByText('En voir plus'))
    expect(analytics.logVenueSeeMoreClicked).toHaveBeenNthCalledWith(1, venueId)
  })

  it(`should log analytics event VenueSeeAllOffersClicked when clicking "Voir toutes les offres" button`, () => {
    const { getByText } = render(<VenueOffers venueId={venueId} />)
    fireEvent.press(getByText('Voir toutes les offres'))
    expect(analytics.logVenueSeeAllOffersClicked).toHaveBeenNthCalledWith(1, venueId)
  })
})
