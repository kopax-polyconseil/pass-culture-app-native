import { t } from '@lingui/macro'
import React from 'react'

import { OfferStockResponse } from 'api/gen'
import { useBooking } from 'features/bookOffer/pages/BookingOfferWrapper'
import { formatToCompleteFrenchDate } from 'libs/parsers'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { Spacer, Typo } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typography'

import { Step } from '../pages/reducer'

import { Calendar } from './Calendar/Calendar'

interface Props {
  stocks: OfferStockResponse[]
  userRemainingCredit: number | null
}

export const BookDateChoice: React.FC<Props> = ({ stocks, userRemainingCredit }) => {
  const { bookingState, dispatch } = useBooking()

  const showCalendar = () => {
    dispatch({ type: 'CHANGE_STEP', payload: Step.DATE })
    dispatch({ type: 'RESET_QUANTITY' })
    dispatch({ type: 'RESET_STOCK' })
  }

  return (
    <React.Fragment>
      <Spacer.Column numberOfSpaces={4} />
      <Typo.Title4 {...getHeadingAttrs(2)} testID="DateStep">{t`Date`}</Typo.Title4>
      {bookingState.step === Step.DATE ? (
        <Calendar
          stocks={stocks}
          userRemainingCredit={userRemainingCredit}
          offerId={bookingState.offerId}
        />
      ) : (
        <TouchableOpacity onPress={showCalendar}>
          <Spacer.Column numberOfSpaces={2} />
          <Typo.ButtonText>
            {bookingState.date ? formatToCompleteFrenchDate(bookingState.date) : ''}
          </Typo.ButtonText>
        </TouchableOpacity>
      )}
    </React.Fragment>
  )
}
