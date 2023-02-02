export const LoginStateExceptionEnum = {
  OTHER_PLACES_LOGIN: 'E00101004',
  PASSWORD_RESET: 'E00101005',
  LOGIN_EXPIRED: 'E00101006'
}

export const getLoginStateExceptions = () => {
  const result = []
  for (const loginStateExceptionEnumKey in LoginStateExceptionEnum) {
    result.push(LoginStateExceptionEnum[loginStateExceptionEnumKey])
  }
  return result
}

export const isLoginStateExceptionCode = (code) => {
  return [...getLoginStateExceptions()].includes(code)
}
