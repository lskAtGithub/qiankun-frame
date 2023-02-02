import Cookies from 'js-cookie'

const tokenKey = 'Ft-Token'

export const getToken = () => {
  return Cookies.get(tokenKey)
}

export const setToken = (token) => {
  return Cookies.set(tokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(tokenKey)
}

const refreshTokenKey = 'Ft-Refresh-Token'

export const getRefreshToken = () => {
  return Cookies.get(refreshTokenKey)
}

export const setRefreshToken = (token) => {
  return Cookies.set(refreshTokenKey, token)
}

export const removeRefreshToken = () => {
  return Cookies.remove(refreshTokenKey)
}

export const resetTokens = () => {
  removeToken()
  removeRefreshToken()
}

export const setTokens = ({ accessToken, refreshToken }) => {
  setToken(accessToken)
  setRefreshToken(refreshToken)
}
