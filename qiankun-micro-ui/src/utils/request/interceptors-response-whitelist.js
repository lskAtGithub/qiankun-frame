import { getLoginErrorCodes } from '@/enums/request/login-error-code-enum'

export const interceptorsResponseWhitelist = [
  ...getLoginErrorCodes()
]

export const isInterceptorsResponseWhitelist = (code) => {
  return interceptorsResponseWhitelist.includes(code)
}
