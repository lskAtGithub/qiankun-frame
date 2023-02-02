export const LoginErrorCodeEnum = {
  PASSWORD_ERROR: 'E00201001',
  MAN_MACHINE_VERIFICATION: 'E00201002',
  ACCOUNT_LOCKOUT: 'E00201003'
}

export const getLoginErrorCodes = () => {
  const result = []
  for (const loginErrorCodeEnumKey in LoginErrorCodeEnum) {
    result.push(LoginErrorCodeEnum[loginErrorCodeEnumKey])
  }
  return result
}

export const isLoginRequestResponseWhitelist = (code) => {
  return [...getLoginErrorCodes()].includes(code)
}

export const isPasswordError = (code) => {
  return LoginErrorCodeEnum.PASSWORD_ERROR === code
}

export const isAccountLockout = (code) => {
  return LoginErrorCodeEnum.ACCOUNT_LOCKOUT === code
}

export const isManMachineVerification = (code) => {
  return LoginErrorCodeEnum.MAN_MACHINE_VERIFICATION === code
}
