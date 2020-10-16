import Config from '@bam.tech/react-native-config'

import { parseBooleanVariables } from './parseBooleanVariables'

export interface Environment {
  API_BASE_URL: string
  ENV: string
  FEATURE_FLAG_CHEAT_CODES: boolean
  FEATURE_FLAG_CODE_PUSH: boolean
  FEATURE_FLAG_CODE_PUSH_MANUAL: boolean
  SENTRY_DSN: string
  SIGNIN_IDENTIFIER: string
  SIGNIN_PASSWORD: string
  WEBSOCKET_ENDPOINT: string
}

export const env = parseBooleanVariables(Config) as Environment
