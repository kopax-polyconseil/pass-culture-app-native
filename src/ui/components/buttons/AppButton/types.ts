import { ComponentType, CSSProperties, FunctionComponent, MouseEventHandler } from 'react'
import { GestureResponderEvent, StyleProp, TextProps, ViewStyle } from 'react-native'

import { AllNavParamList } from 'features/navigation/RootNavigator'
import { IconInterface } from 'ui/svg/icons/types'
// eslint-disable-next-line no-restricted-imports
import { ColorsEnum } from 'ui/theme/colors'
import { To } from 'ui/web/link/types'

export interface TouchableOpacityButtonProps {
  buttonHeight: 'small' | 'tall'
  inline?: boolean
  inlineHeight?: number | string
  mediumWidth?: boolean
  fullWidth?: boolean
  justifyContent?: 'center' | 'flex-start'
  numberOfLines?: number
  center?: boolean
  focusOutlineColor?: ColorsEnum
}

export interface AppButtonInnerProps {
  adjustsFontSizeToFit?: boolean
  icon?: FunctionComponent<IconInterface>
  loadingIndicator?: ComponentType<IconInterface>
  isLoading?: boolean
  wording: string
  title?: ComponentType<TextProps>
  numberOfLines?: number
}

export type AppButtonEventNative = ((e: GestureResponderEvent) => void) | (() => void) | undefined
export type AppButtonEventWeb = MouseEventHandler<HTMLButtonElement> | (() => void) | undefined

export interface BaseButtonProps {
  accessibilityLabel?: string
  accessibilityDescribedBy?: string
  adjustsFontSizeToFit?: boolean
  buttonHeight?: 'small' | 'tall'
  disabled?: boolean
  icon?: FunctionComponent<IconInterface>
  loadingIndicator?: ComponentType<IconInterface>
  inline?: boolean
  isLoading?: boolean
  onLongPress?: AppButtonEventWeb | AppButtonEventNative
  onPress?: AppButtonEventWeb | AppButtonEventNative
  testID?: string
  textSize?: number
  wording: string
  mediumWidth?: boolean
  fullWidth?: boolean
  justifyContent?: 'center' | 'flex-start'
  numberOfLines?: number
  center?: boolean
  type?: 'button' | 'submit' | 'reset'
  name?: string
  focusOutlineColor?: ColorsEnum
  to?: To<AllNavParamList, keyof AllNavParamList>
  externalHref?: string
}

export interface AppButtonProps extends BaseButtonProps {
  inline?: boolean
  inlineHeight?: number | string
  title?: ComponentType<TextProps>
  style?: StyleProp<ViewStyle> | CSSProperties
  className?: string
}

export type Only<TestedType, StandardType> = TestedType &
  Record<Exclude<keyof TestedType, keyof StandardType>, never>

export type OnlyBaseButtonProps<TestedType> = Only<TestedType, AppButtonProps>
