import { refreshToken } from '@/api/user'
import router from '@/router'
import service from '@/utils/request/index'
import interceptorsRequestStore from '@/utils/request/interceptors-request-store'
import { getRefreshToken } from '@/utils/auth'
import store from '@/store'

const reLogin = () => {
  store.dispatch('user/resetToken')
  router.push('/login')
}

export const refreshTokenAndRequests = response => {
  const isRefreshing = interceptorsRequestStore.getInstance().getIsRefreshing()
  const requests = interceptorsRequestStore.getInstance().getRequests()
  if (!isRefreshing) {
    interceptorsRequestStore.getInstance().setIsRefreshIng(true)
    return refreshToken({
      grant_type: 'refresh_token',
      refresh_token: getRefreshToken()
    })
      .then(refreshResponse => {
        const { accessToken, refreshToken } = refreshResponse.data
        store.dispatch('user/setTokens', { accessToken, refreshToken })
        requests.forEach(requestItem => requestItem())
        interceptorsRequestStore.getInstance().setRequests([])
        return service(response.config)
      })
      .catch(err => {
        // 跳到登录页
        reLogin()
        return Promise.reject(err)
      })
      .finally(() => {
        interceptorsRequestStore.getInstance().setIsRefreshIng(false)
      })
  }
  return new Promise(resolve => {
    // 用函数形式将 resolve 存入，等待刷新后再执行
    requests.push(() => {
      resolve(service(response.config))
    })
  })
}
