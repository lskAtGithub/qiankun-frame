export const RefreshTokenErrorCodeEnum = {
  REFRESH_TOKEN_IS_NULL: 'E00201010',
  REFRESH_TOKEN_INVALID: 'E00201011',
  NO_LOGIN_INFORMATION: 'E00201014',
  OTHER_PLACES_LOGIN: 'E00201015'
}

export const getRefreshTokenErrorCodes = () => {
  const result = []
  for (const refreshTokenErrorCodeEnumKey in RefreshTokenErrorCodeEnum) {
    result.push(RefreshTokenErrorCodeEnum[refreshTokenErrorCodeEnumKey])
  }
  return result
}

export const isRefreshTokenErrorCode = (code) => {
  return [...getRefreshTokenErrorCodes()].includes(code)
}
