import React, { useState } from 'react'
import webStyled from 'styled-components'
import styled from 'styled-components/native'

import { SelectionLabel } from 'features/search/atoms'
import { OFFER_TYPES } from 'features/search/sections/OfferType'
import { getSpacing } from 'ui/theme'
import { Li } from 'ui/web/list/Li'
import { Ul } from 'ui/web/list/Ul'

interface Props {
  onChange: ({
    isDigital,
    isEvent,
    isThing,
  }: {
    isDigital: boolean
    isEvent: boolean
    isThing: boolean
  }) => void
}

export const OfferTypeChoices = (props: Props) => {
  const [offerTypes, setOfferTypes] = useState({
    isDigital: false,
    isEvent: false,
    isThing: false,
  })

  return (
    <BodyContainer>
      <StyledUl>
        {OFFER_TYPES.map(([offerType, label]) => (
          <Li key={label}>
            <SelectionLabel
              label={label}
              selected={offerTypes[offerType]}
              onPress={() => {
                setOfferTypes((prevOfferTypes) => {
                  const nextOfferTypes = { ...prevOfferTypes }
                  nextOfferTypes[offerType] = !nextOfferTypes[offerType]
                  props.onChange(nextOfferTypes)
                  return nextOfferTypes
                })
              }}
            />
          </Li>
        ))}
      </StyledUl>
    </BodyContainer>
  )
}

const BodyContainer = styled.View({
  flexWrap: 'wrap',
  flexDirection: 'row',
  marginBottom: getSpacing(-3),
  marginRight: getSpacing(-3),
})

const StyledUl = webStyled(Ul)({
  flexWrap: 'wrap',
})
