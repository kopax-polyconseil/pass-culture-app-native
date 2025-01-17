import { t } from '@lingui/macro'
import React, { useEffect, useState } from 'react'
import { PixelRatio } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

import { useAuthContext } from 'features/auth/AuthContext'
import { useUserProfileInfo } from 'features/home/api'
import { BusinessPane } from 'features/home/contentful'
import { openUrl } from 'features/navigation/helpers'
import { analytics } from 'libs/analytics'
import { useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { ArrowNext } from 'ui/svg/icons/ArrowNext'
import { Idea } from 'ui/svg/icons/Idea'
import { Typo, getSpacing, MARGIN_DP, LENGTH_XS, RATIO_BUSINESS, Spacer } from 'ui/theme'
import { customFocusOutline } from 'ui/theme/customFocusOutline/customFocusOutline'
import { TouchableLink } from 'ui/web/link/TouchableLink'

import { fillUrlEmail, shouldUrlBeFilled, showBusinessModule } from './BusinessModule.utils'

export const BusinessModule = ({ module }: { module: BusinessPane }) => {
  const [isFocus, setIsFocus] = useState(false)
  const { title, firstLine, secondLine, leftIcon, image, url } = module
  const isDisabled = !url
  const { appContentWidth } = useTheme()
  const { isLoggedIn } = useAuthContext()
  const imageWidth = appContentWidth - 2 * MARGIN_DP
  const imageHeight = PixelRatio.roundToNearestPixel(imageWidth * RATIO_BUSINESS)

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { data: user, isLoading: isUserLoading } = useUserProfileInfo()
  const { showInfoSnackBar } = useSnackBarContext()

  const logAndOpenUrl = (finalUrl: string) => {
    setShouldRedirect(false)
    analytics.logClickBusinessBlock(title)
    openUrl(finalUrl)
  }

  useEffect(() => {
    if (!url || !shouldRedirect) return
    if (!shouldUrlBeFilled(url)) {
      logAndOpenUrl(url)
      return
    }
    if (user) {
      logAndOpenUrl(fillUrlEmail(url, user.email))
      return
    }
    if (isUserLoading) {
      showInfoSnackBar({ message: t`Redirection en cours` })
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, user, shouldRedirect])

  const shouldModuleBeDisplayed = showBusinessModule(module.targetNotConnectedUsersOnly, isLoggedIn)
  if (!shouldModuleBeDisplayed) return <React.Fragment />
  return (
    <Row>
      <Spacer.Row numberOfSpaces={6} />
      <StyledTouchableLink
        highlight
        accessibilityRole={isDisabled ? 'link' : undefined}
        externalHref={url && shouldUrlBeFilled(url) && user ? fillUrlEmail(url, user.email) : url}
        onPress={() => setShouldRedirect(true)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        isFocus={isFocus}
        disabled={isDisabled}>
        <ImageContainer>
          <ImageBackground
            source={{ uri: image }}
            height={imageHeight}
            width={imageWidth}
            testID="imageBusiness">
            <Container>
              <IconContainer>
                {leftIcon ? <Image source={{ uri: leftIcon }} /> : <IdeaIcon />}
              </IconContainer>
              <TextContainer>
                <ButtonText testID="firstLine">{firstLine}</ButtonText>
                <StyledBody numberOfLines={2}>{secondLine}</StyledBody>
              </TextContainer>
              {!isDisabled && (
                <IconContainer>
                  <ArrowNextIcon />
                </IconContainer>
              )}
            </Container>
          </ImageBackground>
        </ImageContainer>
      </StyledTouchableLink>
      <Spacer.Row numberOfSpaces={6} />
    </Row>
  )
}

const Row = styled.View({
  flexDirection: 'row',
  paddingBottom: getSpacing(6),
})

const StyledTouchableLink = styled(TouchableLink)<{ isFocus?: boolean }>(({ theme, isFocus }) => ({
  borderRadius: theme.borderRadius.radius,
  ...customFocusOutline(theme, undefined, isFocus),
}))

const ImageContainer = styled.View(({ theme }) => ({
  borderRadius: theme.borderRadius.radius,
  overflow: 'hidden',
  maxHeight: LENGTH_XS,
}))

const Image = styled.Image(({ theme }) => ({
  width: getSpacing(14),
  height: getSpacing(14),
  tintColor: theme.colors.white,
}))

const ImageBackground = styled.ImageBackground<{ width: number; height: number }>((props) => ({
  height: props.height,
  width: props.width,
  justifyContent: 'center',
  maxHeight: LENGTH_XS,
  backgroundColor: props.theme.colors.primary,
}))

const Container = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: getSpacing(2),
  paddingHorizontal: getSpacing(1.5),
})

const TextContainer = styled.View({
  flex: 1,
  flexDirection: 'column',
  paddingVertical: getSpacing(1),
  paddingHorizontal: getSpacing(0.5),
})

const IconContainer = styled.View({
  width: getSpacing(14),
  height: getSpacing(14),
  justifyContent: 'center',
  alignItems: 'center',
})

const ButtonText = styled(Typo.ButtonText)(({ theme }) => ({
  color: theme.colors.white,
}))

const StyledBody = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.white,
}))

const IdeaIcon = styled(Idea).attrs(({ theme }) => ({
  color: theme.colors.white,
}))``

const ArrowNextIcon = styled(ArrowNext).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: theme.icons.sizes.small,
}))``
