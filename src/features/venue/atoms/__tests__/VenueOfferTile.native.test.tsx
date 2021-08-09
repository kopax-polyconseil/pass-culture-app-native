import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { mockedAlgoliaResponse } from 'libs/search/fixtures'
import { queryCache, reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { fireEvent, render } from 'tests/utils'

import { VenueOfferTile } from '../VenueOfferTile'

const offer = mockedAlgoliaResponse.hits[0].offer
const offerId = 116656

const props = {
  category: offer.category || '',
  categoryName: offer.category,
  description: offer.description || '',
  expenseDomains: [],
  date: 'Dès le 12 mars 2020',
  name: offer.name,
  isDuo: offer.isDuo,
  offerId,
  price: '28 €',
  thumbUrl: offer.thumbUrl,
}

describe('VenueOfferTile component', () => {
  afterAll(() => jest.resetAllMocks())

  it('should render correctly', () => {
    const { toJSON } = render(reactQueryProviderHOC(<VenueOfferTile {...props} />))
    expect(toJSON()).toMatchSnapshot()
  })

  it('should navigate to the offer when clicking on the image', async () => {
    const { getByTestId } = render(reactQueryProviderHOC(<VenueOfferTile {...props} />))
    fireEvent.press(getByTestId('offerTileImage'))
    expect(navigate).toHaveBeenCalledWith('Offer', {
      id: offerId,
      from: 'venue',
    })
  })

  it('should prepopulate react-query cache when clicking on offer', async () => {
    const { getByTestId } = render(reactQueryProviderHOC(<VenueOfferTile {...props} />))
    fireEvent.press(getByTestId('offerTileImage'))

    const queryHash = JSON.stringify(['offer', offerId])
    const query = queryCache.get(queryHash)
    expect(query).not.toBeUndefined()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(query!.state.data).toStrictEqual({
      accessibility: {},
      category: { label: 'MUSIQUE', name: 'MUSIQUE' },
      description: offer.description,
      expenseDomains: [],
      fullAddress: null,
      id: offerId,
      image: { url: props.thumbUrl },
      isDigital: false,
      isDuo: false,
      isReleased: false,
      isExpired: false,
      isSoldOut: false,
      name: offer.name,
      stocks: [],
      venue: { coordinates: {} },
      isEducational: false,
    })
  })
})