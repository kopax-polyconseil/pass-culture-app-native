import { useLinkProps } from '@react-navigation/native'
import React, { CSSProperties, memo, MouseEventHandler, useCallback } from 'react'
import styled from 'styled-components'

import { accessibilityAndTestId } from 'libs/accessibilityAndTestId'
import { AppButtonInner } from 'ui/components/buttons/AppButton/AppButtonInner'
import { DefaultLoadingIndicator } from 'ui/components/buttons/AppButton/DefaultLoadingIndicator'
import { appButtonWebStyles } from 'ui/components/buttons/AppButton/styleUtils'
import {
  AppButtonEventWeb,
  AppButtonProps,
  OnlyBaseButtonProps,
  TouchableOpacityButtonProps,
} from 'ui/components/buttons/AppButton/types'

const _AppButton = <T extends AppButtonProps>({
  icon: Icon,
  title: Title,
  inline,
  disabled,
  isLoading,
  onPress,
  onLongPress,
  mediumWidth,
  fullWidth,
  buttonHeight = 'small',
  inlineHeight,
  accessibilityLabel,
  accessibilityDescribedBy,
  testID,
  wording,
  adjustsFontSizeToFit,
  justifyContent,
  numberOfLines,
  style,
  loadingIndicator: LoadingIndicator,
  center,
  type = 'button',
  className,
  name,
  focusOutlineColor,
  to,
  externalHref,
}: OnlyBaseButtonProps<T>) => {
  const ButtonComponent = (to || externalHref ? Link : Button) as React.ElementType
  const internalLinkProps = useLinkProps({ to: to ?? '' })
  const externalLinkProps = { href: externalHref, accessibilityRole: 'link', target: '_blank' }
  const linkProps = externalHref ? externalLinkProps : internalLinkProps
  const buttonLinkProps = externalHref || to ? { ...linkProps, type: undefined } : {}

  const pressHandler = disabled || isLoading ? undefined : (onPress as AppButtonEventWeb)
  const longPressHandler = disabled || isLoading ? undefined : (onLongPress as AppButtonEventWeb)

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if ((type === 'submit' || to || externalHref) && pressHandler) {
        event.preventDefault()
      }
      if (pressHandler) {
        pressHandler(event)
      }
    },
    [type, to, externalHref, pressHandler]
  )

  const onDoubleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if ((type === 'submit' || to || externalHref) && pressHandler) {
        event.preventDefault()
      }
      if (longPressHandler) {
        longPressHandler(event)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, to, externalHref, longPressHandler]
  )

  return (
    <ButtonComponent
      {...accessibilityAndTestId(accessibilityLabel, testID)}
      name={name}
      onClick={onClick}
      onDoubleClick={to ? undefined : onDoubleClick}
      disabled={disabled}
      type={type}
      aria-describedby={accessibilityDescribedBy}
      mediumWidth={mediumWidth}
      fullWidth={fullWidth}
      buttonHeight={buttonHeight}
      inline={inline}
      inlineHeight={inlineHeight}
      justifyContent={justifyContent}
      numberOfLines={numberOfLines}
      style={style as CSSProperties}
      center={center}
      className={className}
      focusOutlineColor={focusOutlineColor}
      tabIndex={disabled || isLoading ? undefined : 0}
      {...buttonLinkProps}>
      <AppButtonInner
        loadingIndicator={LoadingIndicator}
        isLoading={isLoading}
        icon={Icon}
        title={Title}
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        numberOfLines={numberOfLines}
        wording={wording}
      />
    </ButtonComponent>
  )
}

_AppButton.defaultProps = {
  loadingIndicator: DefaultLoadingIndicator,
}

// memo is used to avoid useless rendering while props remain unchanged
export const AppButton = memo(_AppButton)

const Button = styled.button<TouchableOpacityButtonProps>(appButtonWebStyles)
const Link = styled.a<TouchableOpacityButtonProps>(appButtonWebStyles)
