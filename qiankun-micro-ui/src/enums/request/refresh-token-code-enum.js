export const RefreshTokenCodeEnum = {
  MISSING_TOKEN: 'E00101001',
  TOKEN_EXPIRED: 'E00101002',
  UNAUTHORIZED: 'E00101003',
  LOGIN_EXPIRED: 'E00101006'
}

export const getRefreshTokenCodes = () => {
  const result = []
  for (const refreshTokenCodeEnumKey in RefreshTokenCodeEnum) {
    result.push(RefreshTokenCodeEnum[refreshTokenCodeEnumKey])
  }
  return result
}

export const isNeedRefreshToken = (code) => {
  return getRefreshTokenCodes().includes(code)
}
