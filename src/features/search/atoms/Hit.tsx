import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useQueryClient } from 'react-query'
import styled from 'styled-components/native'

import { mergeOfferData } from 'features/home/atoms/OfferTile'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { CATEGORY_CRITERIA } from 'features/search/enums'
import { analytics } from 'libs/analytics'
import { useDistance } from 'libs/geolocation/hooks/useDistance'
import { formatDates, getDisplayPrice, parseCategory } from 'libs/parsers'
import { SearchHit } from 'libs/search'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'
import { ACTIVE_OPACITY } from 'ui/theme/colors'

import { OfferImage } from './OfferImage'

interface Props {
  hit: SearchHit
  query: string
}

export const Hit: React.FC<Props> = ({ hit, query }) => {
  const { offer, objectID, _geoloc } = hit
  const navigation = useNavigation<UseNavigationType>()
  const queryClient = useQueryClient()
  const distanceToOffer = useDistance(_geoloc)

  const timestampsInMillis = offer.dates?.map((timestampInSec) => timestampInSec * 1000)
  const offerId = +objectID
  const categoryLabel = CATEGORY_CRITERIA[offer.category || 'ALL'].label
  const formattedDate = formatDates(timestampsInMillis)

  function handlePressOffer() {
    // We pre-populate the query-cache with the data from the search client for a smooth transition
    if (!offerId) return
    queryClient.setQueryData(
      ['offer', offerId],
      mergeOfferData({
        ...offer,
        category: parseCategory(offer.category),
        categoryName: offer.category,
        thumbUrl: offer.thumbUrl,
        isDuo: offer.isDuo,
        name: offer.name,
        offerId,
      })
    )
    analytics.logConsultOffer({ offerId, from: 'search', query: query })
    navigation.navigate('Offer', { id: offerId, from: 'search' })
  }

  return (
    <Container onPress={handlePressOffer} testID="offerHit">
      <OfferImage imageUrl={offer.thumbUrl} categoryName={hit.offer.category} />
      <Spacer.Row numberOfSpaces={4} />
      <Column>
        <Row>
          {distanceToOffer ? (
            <React.Fragment>
              <Spacer.Flex flex={0.7}>
                <Name numberOfLines={2}>{offer.name}</Name>
              </Spacer.Flex>
              <Spacer.Flex flex={0.3}>
                <Distance>{distanceToOffer}</Distance>
              </Spacer.Flex>
            </React.Fragment>
          ) : (
            <Name numberOfLines={2}>{offer.name}</Name>
          )}
        </Row>
        <Spacer.Column numberOfSpaces={1} />
        <Body>{categoryLabel}</Body>
        {!!formattedDate && <Body>{formattedDate}</Body>}
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Caption>{getDisplayPrice(offer.prices)}</Typo.Caption>
      </Column>
    </Container>
  )
}

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: ACTIVE_OPACITY,
}))({
  marginHorizontal: getSpacing(6),
  flexDirection: 'row',
  alignItems: 'center',
})

const Column = styled.View({ flexDirection: 'column', flex: 1 })
const Row = styled.View({ flexDirection: 'row', alignItems: 'center' })

const Name = styled(Typo.ButtonText)({})
const Distance = styled(Typo.Body)({ textAlign: 'right', color: ColorsEnum.GREY_DARK })
const Body = styled(Typo.Body)({ color: ColorsEnum.GREY_DARK })
