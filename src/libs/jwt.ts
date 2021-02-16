import jwtDecode from 'jwt-decode'

interface AccessToken {
  exp: number
  fresh: false
  iat: number
  identity: string
  jti: string
  nbf: number
  type: string
  user_claims: {
    user_id: number
  }
}

export const decodeAccessToken = (token: string) => {
  try {
    return jwtDecode<AccessToken>(token)
  } catch {
    return null
  }
}
