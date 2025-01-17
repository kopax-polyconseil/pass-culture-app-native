import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useCallback } from 'react'
import styled from 'styled-components/native'

import { UseNavigationType } from 'features/navigation/RootNavigator'
import { analytics } from 'libs/analytics'
import { ButtonTertiaryBlack } from 'ui/components/buttons/ButtonTertiaryBlack'
import { ArrowNext as DefaultArrowNext } from 'ui/svg/icons/ArrowNext'
import { Spacer } from 'ui/theme'

interface Props {
  id: number
  longWording?: boolean
}
export const OfferSeeMore: React.FC<Props> = ({ id, longWording = false }) => {
  const { navigate } = useNavigation<UseNavigationType>()

  const onPressSeeMore = useCallback(() => {
    analytics.logConsultDescriptionDetails(id)
    navigate('OfferDescription', { id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Container>
      <ButtonTertiaryBlack
        inline
        testID="description-details-button"
        onPress={onPressSeeMore}
        to={{ screen: 'OfferDescription', params: { id } }}
        wording={longWording ? t`Voir plus d'informations` : t`voir plus`}
        accessibilityLabel={longWording ? undefined : t`Voir la suite de la description`}
      />
      <Spacer.Row numberOfSpaces={1} />
      <ArrowNext />
    </Container>
  )
}

const Container = styled.View({ flexDirection: 'row', alignItems: 'center' })
const ArrowNext = styled(DefaultArrowNext).attrs(({ theme }) => ({
  size: theme.icons.sizes.smaller,
}))``
