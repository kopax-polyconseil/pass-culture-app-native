/* eslint-disable no-undef */
import 'cross-fetch/polyfill'

/* We disable the following warning, which can be safely ignored as the code
  is not executed on a device :
  "Animated: `useNativeDriver` is not supported because the native animated module is missing. 
  Falling back to JS-based animation." */
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

/* We disable the following warning, which can be safely ignored as the code
  is not executed on a device :
  "Invariant Violation: Native module cannot be null." */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

/* Cf. the corresponding mock in libs/__mocks__ */
jest.mock('libs/analytics')

jest.mock('libs/environment', () => ({
  env: {
    API_BASE_URL: 'http://localhost',
    CONTENTFUL_SPACE_ID: 'contentfulSpaceId',
    CONTENTFUL_ENVIRONMENT: 'environment',
    CONTENTFUL_ACCESS_TOKEN: 'accessToken',
  },
}))

const originalWarn = console.warn.bind(console.warn)
console.warn = function (message) {
  const messagesToIgnore = [
    /* React Native is not a real css environment. One of the things it doesn't support is nesting and actually selectors in general
    Source : https://github.com/styled-components/styled-components/issues/989#issuecomment-314946541 */
    'Node of type rule not supported as an inline style',
  ]
  for (messageToIgnore of messagesToIgnore) {
    if (message.includes(messagesToIgnore)) {
      return
    }
  }
  originalWarn(message)
}
