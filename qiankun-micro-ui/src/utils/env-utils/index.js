export const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === 'development'
}

export const getMainAppLoginHref = () => {
  return process.env.VUE_APP_MAIN_APP_LOGIN_HREF
}
