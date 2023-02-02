import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { isRefreshTokenErrorCode } from '@/enums/request/refresh-token-error-code-enum'
import { isLoginStateExceptionCode } from '@/enums/request/login-state-exception-enum'
import KickOutLoginMessageBoxStateStore from '@/utils/request/kick-out-login-message-box-state-store'
import { refreshTokenAndRequests } from '@/utils/request/request-utils'
import { isInterceptorsResponseWhitelist } from '@/utils/request/interceptors-response-whitelist'
import { isResponseTypeWhitelist } from '@/enums/request/response-type-enum'
import { isNeedRefreshToken } from '@/enums/request/refresh-token-code-enum'

export const interceptorsResponse = response => {
  if (isResponseTypeWhitelist(response.config.responseType)) {
    return response
  }
  const res = response.data
  const { code, msg } = res

  if (isInterceptorsResponseWhitelist(code)) {
    return response.data
  }
  if (code !== '200') {
    Message({
      message: msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(msg || 'Error'))
  }
  return response.data
}

export const interceptorsResponseError = error => {
  if (error.response.status === 401) {
    return unauthorizedResponse(error)
  }
  if (error.response) {
    return interceptorsResponse(error.response)
  }
  if (error.message.includes('timeout')) {
    Message({
      message: '网络超时，请返回刷新页面',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}

export const unauthorizedResponse = error => {
  const { code, msg } = error.response.data

  if (isRefreshTokenErrorCode(code)) {
    store.dispatch('user/resetToken')
    location.reload()
    return Promise.reject(error)
  }
  if (isNeedRefreshToken(code)) {
    return refreshTokenAndRequests(error.response)
  }
  if (isLoginStateExceptionCode(code)) {
    kickOutLogin(msg)
    return Promise.reject(error)
  }
  return Promise.reject(error)
}

export const kickOutLogin = msg => {
  const kickOutLoginMessageBoxStateStore = KickOutLoginMessageBoxStateStore.getInstance()
  if (kickOutLoginMessageBoxStateStore.getLoaded()) {
    return
  }
  MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    type: 'warning',
    showCancelButton: false,
    showClose: false
  }).then(
    () => {
      kickOutLoginMessageBoxStateStore.setLoaded(false)
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    },
    () => {
      kickOutLoginMessageBoxStateStore.setLoaded(false)
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    }
  )
  kickOutLoginMessageBoxStateStore.setLoaded(true)
}
