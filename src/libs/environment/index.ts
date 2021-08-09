export interface Environment {
  ACCESSIBILITY_LINK: string
  ALGOLIA_APPLICATION_ID: string
  ALGOLIA_INDEX_NAME: string
  ALGOLIA_SEARCH_API_KEY: string
  ANDROID_APP_ID: string
  API_BASE_URL: string
  APP_SEARCH_ENDPOINT: string
  APP_SEARCH_KEY: string
  APPS_FLYER_DEV_KEY: string
  BATCH_API_KEY_WEB: string
  BATCH_AUTH_KEY: string
  BATCH_SUBDOMAIN: string
  BATCH_VAPID_PUBLIC_KEY: string
  CGU_LINK: string
  CONTENTFUL_ACCESS_TOKEN: string
  CONTENTFUL_ENVIRONMENT: string
  CONTENTFUL_SPACE_ID: string
  COOKIES_POLICY_LINK: string
  CULTURAL_SURVEY_TYPEFORM_URL: string
  DATA_PRIVACY_CHART_LINK: string
  DOC_CGU_URL: string
  DOC_PERSONAL_DATA_URL: string
  DSM_URL: string
  ENABLE_WHY_DID_YOU_RENDER: boolean
  ENV: string
  FAQ_LINK: string
  FEATURE_FLIPPING_ONLY_VISIBLE_ON_TESTING: boolean
  FIREBASE_APIKEY: string
  FIREBASE_APPID: string
  FIREBASE_AUTHDOMAIN: string
  FIREBASE_DYNAMIC_LINK: string
  FIREBASE_MESSAGINGSENDERID: string
  FIREBASE_PROJECTID: string
  FIREBASE_STORAGEBUCKET: string
  ID_CHECK_API_URL: string
  ID_CHECK_URL: string
  IOS_APP_ID: string
  IOS_APP_STORE_ID: string
  PUBLIC_URL: string
  PRIVACY_POLICY_LINK: string
  RECOMMENDATION_ENDPOINT: string
  RECOMMENDATION_TOKEN: string
  SENTRY_DSN: string
  SIGNIN_IDENTIFIER: string
  SIGNIN_PASSWORD: string
  SIGNUP_DATE: string
  SIGNUP_POSTAL_CODE: string
  SIGNUP_RANDOM_EMAIL: boolean
  SIGNUP_RANDOM_PASSWORD: boolean
  SITE_KEY: string
  SUPPORT_EMAIL_ADDRESS: string
  TMX_FPSERVER: string
  TMX_ORGID: string
  UNIVERSAL_LINK: string
  URL_PREFIX: string
  WEBAPP_URL: string
  WEBAPP_V2_DOMAIN: string
  WEBSOCKET_ENDPOINT: string
}

export * from './env'
