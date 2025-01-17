import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { useQueryClient } from 'react-query'
import styled from 'styled-components/native'

import { BookingCancellationReasons } from 'api/gen'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { mergeOfferData } from 'features/offer/atoms/OfferTile'
import { analytics } from 'libs/analytics'
import { formatToSlashedFrenchDate } from 'libs/dates'
import { QueryKeys } from 'libs/queryKeys'
import { useCategoryId } from 'libs/subcategories'
import { tileAccessibilityLabel, TileContentType } from 'libs/tileAccessibilityLabel'
import { InputRule } from 'ui/components/inputs/rules/InputRule'
import { OfferImage } from 'ui/components/tiles/OfferImage'
import { Check } from 'ui/svg/icons/Check'
import { getSpacing, Spacer, Typo } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typography'
import { TouchableLink } from 'ui/web/link/TouchableLink'

import { BookingItemTitle } from './BookingItemTitle'
import { BookingItemProps } from './types'

export const EndedBookingItem = ({ booking }: BookingItemProps) => {
  const { navigate } = useNavigation<UseNavigationType>()
  const { cancellationDate, cancellationReason, dateUsed, stock } = booking
  const categoryId = useCategoryId(stock.offer.subcategoryId)
  const queryClient = useQueryClient()

  const endedBookingReason = getEndedBookingReason(cancellationReason, dateUsed)
  const endedBookingDateLabel = getEndedBookingDateLabel(cancellationDate, dateUsed)

  const accessibilityLabel = tileAccessibilityLabel(TileContentType.BOOKING, {
    name: stock.offer.name,
    dateUsed: dateUsed ? formatToSlashedFrenchDate(dateUsed) : undefined,
    cancellationDate: cancellationDate ? formatToSlashedFrenchDate(cancellationDate) : undefined,
  })

  function handlePressOffer() {
    const { offer } = stock
    if (!offer.id) return
    // We pre-populate the query-cache with the data from the search result for a smooth transition
    queryClient.setQueryData(
      [QueryKeys.OFFER, offer.id],
      mergeOfferData({
        ...offer,
        categoryId,
        thumbUrl: offer.image?.url,
        name: offer.name,
        offerId: offer.id,
      })
    )
    analytics.logConsultOffer({ offerId: offer.id, from: 'endedbookings' })
    navigate('Offer', { id: stock.offer.id, from: 'endedbookings' })
  }

  return (
    <View {...getHeadingAttrs(3)}>
      <TouchableLink
        to={{ screen: 'Offer', params: { id: stock.offer.id, from: 'endedbookings' } }}
        onPress={handlePressOffer}
        accessibilityLabel={accessibilityLabel}
        testID="EndedBookingItem">
        <ItemContainer>
          <OfferImage imageUrl={stock.offer.image?.url} categoryId={categoryId} />
          <Spacer.Row numberOfSpaces={4} />
          <AttributesView>
            <BookingItemTitle title={stock.offer.name} />
            <EndedReasonAndDate>
              {endedBookingReason}
              <Spacer.Row numberOfSpaces={1} />
              <DateLabel>{endedBookingDateLabel}</DateLabel>
            </EndedReasonAndDate>
          </AttributesView>
        </ItemContainer>
      </TouchableLink>
    </View>
  )
}

const AttributesView = styled.View({
  flex: 1,
  paddingLeft: getSpacing(4),
  paddingRight: getSpacing(1),
})

const ItemContainer = styled.View({
  flexDirection: 'row',
})

const EndedReasonAndDate = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
  flex: 1,
  alignItems: 'center',
})

const DateLabel = styled(Typo.Caption)(({ theme }) => ({
  color: theme.colors.greyDark,
}))

function getEndedBookingReason(
  cancellationReason?: BookingCancellationReasons | null,
  dateUsed?: string | null
) {
  if (dateUsed) return <StyledInputRule title={t`Utilisé`} icon={Check} isValid />

  if (cancellationReason === BookingCancellationReasons.OFFERER)
    return <StyledInputRule title={t`Annulé`} icon={Check} isValid={false} />

  return <StyledInputRule title={t`Réservation annulée`} icon={Check} isValid={false} />
}

function getEndedBookingDateLabel(cancellationDate?: string | null, dateUsed?: string | null) {
  const endDate = dateUsed ?? cancellationDate
  if (endDate) {
    return t({
      id: 'jour de fin de résa',
      values: { date: formatToSlashedFrenchDate(endDate) },
      message: 'le {date}',
    })
  }
  return null
}

const StyledInputRule = styled(InputRule).attrs(({ theme }) => ({
  iconSize: theme.icons.sizes.smaller,
}))``
