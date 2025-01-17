import React, { memo } from 'react'
import styled from 'styled-components/native'

import { openUrl } from 'features/navigation/helpers'
import { analytics } from 'libs/analytics'
import { Typo, getSpacing, Spacer } from 'ui/theme'
import { TouchableLink } from 'ui/web/link/TouchableLink'

import { SocialNetwork, SocialNetworkIconsMap } from './socials/types'

interface SocialNetworkCardProps {
  network: SocialNetwork
}

function SocialNetworkCardComponent(props: SocialNetworkCardProps) {
  const { network } = props
  const { icon: Icon, link, fallbackLink } = SocialNetworkIconsMap[network]
  const name = network[0].toUpperCase() + network.slice(1)

  const StyledIcon = styled(Icon).attrs(({ theme }) => ({
    size: theme.icons.sizes.small,
  }))``

  return (
    <TouchableLink
      externalHref={link}
      onPress={() => {
        analytics.logClickSocialNetwork(name)
        openUrl(link, { shouldLogEvent: false, fallbackUrl: fallbackLink })
      }}>
      <Container>
        <NetworkIconBox>
          <StyledIcon />
        </NetworkIconBox>
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Caption numberOfLines={2}>{name}</Typo.Caption>
      </Container>
    </TouchableLink>
  )
}

export const SocialNetworkCard = memo(SocialNetworkCardComponent)

const Container = styled.View({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: getSpacing(18),
})

const NetworkIconBox = styled.View({
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
})
