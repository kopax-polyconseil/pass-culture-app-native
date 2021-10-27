import { IdCheckRootStackParamList } from '@pass-culture/id-check'
import { PathConfig, RouteProp, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ComponentType } from 'react'
import { CountryCode } from 'react-native-country-picker-modal'

import { BeneficiaryValidationStep } from 'api/gen'

import { TabParamList, TabRouteName } from '../TabBar/types'

export type Referrals = Lowercase<keyof AllNavParamList> | 'deeplink'

/**
 * WARNING !
 * Deeplink: When updating the screen parameters, pay attention to the deeplink handlers.
 * If a deeplink handler indexes the screen with params you are changing,
 * please update the deeplink handler in consequence.
 */
export type RootStackParamList = {
  Maintenance: undefined
  ABTestingPOC: undefined
  AcceptCgu: {
    email: string
    isNewsletterChecked: boolean
    password: string
    birthday: string
    postalCode: string | undefined
  }
  AccountCreated: undefined
  AfterSignupEmailValidationBuffer: { token: string; expiration_timestamp: number; email: string }
  AppComponents: undefined
  ChangePassword: undefined
  ChangeEmail: undefined
  CheatCodes: undefined
  CheatMenu: undefined
  ConfirmDeleteProfile: undefined
  BookingConfirmation: { offerId: number; bookingId: number }
  BookingDetails: { id: number }
  BeneficiaryRequestSent: undefined
  ConsentSettings: { onGoBack?: () => void } | undefined
  CulturalSurvey: undefined
  DeeplinkImporter: undefined
  DeleteProfileSuccess: undefined
  EndedBookings: undefined
  ForgottenPassword: undefined
  FavoritesSorts: undefined
  IdCheckUnavailable: undefined
  IdCheckTooManyAttempts: undefined
  Login?: {
    preventCancellation?: boolean
    followScreen?: 'NextBeneficiaryStep'
    followParams?: RootStackParamList['NextBeneficiaryStep']
  }
  Navigation: undefined
  NavigationIdCheckErrors: undefined
  NotificationSettings: undefined
  Offer: {
    id: number
    from: Referrals
    moduleName?: string
  }
  OfferDescription: { id: number }
  ReinitializePassword: { email: string; token: string; expiration_timestamp: number }
  ResetPasswordEmailSent: { email: string }
  ResetPasswordExpiredLink: { email: string }
  LegalNotices: undefined
  LocationFilter: undefined
  LocationPicker: undefined
  NextBeneficiaryStep: undefined
  PersonalData: undefined
  RedirectWebToNative: undefined
  SearchCategories: undefined
  SearchFilter: undefined
  SelectSchool: undefined
  SetBirthday: { email: string; isNewsletterChecked: boolean; password: string }
  SetEmail: { preventCancellation?: boolean } | undefined
  SetPassword: { email: string; isNewsletterChecked: boolean }
  SignupConfirmationEmailSent: { email: string }
  SignupConfirmationExpiredLink: { email: string }
  TabNavigator: {
    screen: TabRouteName
    params: TabParamList[TabRouteName]
  }
  SetPhoneNumber: undefined
  SetPhoneValidationCode: { phoneNumber: string; countryCode: CountryCode }
  PhoneValidationTooManyAttempts: undefined
  PhoneValidationTooManySMSSent: undefined
  VerifyEligibility: { email: string; nextBeneficiaryValidationStep: BeneficiaryValidationStep }
  FirstTutorial?: { shouldCloseAppOnBackAction: boolean }
  EighteenBirthday: undefined
  PageNotFound: undefined
  Venue: { id: number }
} & IdCheckRootStackParamList

export type AllNavParamList = RootStackParamList & TabParamList

/** Type helpers to share screen names */
export type RootScreenNames = keyof RootStackParamList
export type ScreenNames = keyof AllNavParamList

/**
 * Type helper for useRoute
 *
 * const {
 *  params: { token, expiration_timestamp },
 * } = useRoute<UseRouteType<'ReinitializePassword'>>()
 */
export type UseRouteType<ScreenName extends ScreenNames> = RouteProp<AllNavParamList, ScreenName>
/**
 * Type helper for navigation prop
 *
 * type Props = {
 *   navigation: ScreenNavigationProp<'Home'>
 * }
 */
export type ScreenNavigationProp<ScreenName extends ScreenNames> = StackNavigationProp<
  AllNavParamList,
  ScreenName
>
/**
 * Type helper for useNavigation in the context of a Stack Navigator
 * Cf. https://reactnavigation.org/docs/navigation-prop/#navigator-dependent-functions
 *
 * const navigation = useNavigation<UseNavigationType>()
 */
export type UseNavigationType = StackNavigationProp<RootStackParamList>
/**
 * Type helper to access route params
 *
 * export type MyStackParamList = {
 *   Login?: { userId: string }
 * }
 *
 * RouteParams<'Login', MyStackParamList>  // will return ({ userId: string } | undefined)
 */
export type RouteParams<
  StackParamList extends Record<string, unknown>,
  Screename extends keyof StackParamList
> = Pick<StackParamList, Screename>[Screename]

export type NavigateParams<
  RouteName extends keyof ParamListBase
> = undefined extends ParamListBase[RouteName]
  ? [RouteName] | [RouteName, ParamListBase[RouteName]]
  : [RouteName, ParamListBase[RouteName]]
export type RootNavigateParams = NavigateParams<keyof RootStackParamList>
export type AllNavigateParams = NavigateParams<keyof AllNavParamList>

/**
 * Type helper to declare a route
 */
interface ExtendedPathConfig extends PathConfig {
  deeplinkPaths?: string[]
}
export type GenericRoute<ParamList> = {
  name: keyof ParamList
  component: ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  hoc?(component: ComponentType<any>): ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  path?: string
  deeplinkPaths?: string[]
  pathConfig?: ExtendedPathConfig
  options?: { title?: string }
  secure?: boolean
}
export type Route = GenericRoute<RootStackParamList & IdCheckRootStackParamList>

// Typeguard for screen params
export function isScreen<Screen extends AllNavigateParams[0]>(
  expectedScreen: Screen,
  screen: AllNavigateParams[0],
  params: AllNavigateParams[1]
): params is AllNavParamList[Screen] {
  return screen === expectedScreen
}
