import ArrayUtils from '@/utils/ArrayUtils'
import CacheUtils from '@/utils/CacheUtils'
import { getActiveMatchedRoutes, hasRoute } from '@/utils/route/menu'

/**
 * 最近访问路由key
 */
export const getRecentAccessRouteKey = () => {
  return (
    'ld-admin-merchant-recent-access-route-' + this.$store.state.user.userId
  )
}

/**
 * 保存最近访问的路由
 */
export const setRecentAccessRoute = () => {
  const matchedRoutes = getActiveMatchedRoutes()
  if (ArrayUtils.isEmpty(matchedRoutes)) {
    return
  }
  if (matchedRoutes.length !== 3) {
    return
  }
  const recentAccessRoutes = getRecentAccessRoutes()
  const currentRoute = matchedRoutes[2]
  if (currentRoute.path === '/home/homePage/systemHome') {
    removeNotAccessRoutes()
    return
  }
  recentAccessRoutes.unshift(currentRoute)

  let resultRecentAccessRoutes = []
  recentAccessRoutes.forEach(item => {
    if (
      resultRecentAccessRoutes.some(resultItem => resultItem.path === item.path)
    ) {
      return
    }
    resultRecentAccessRoutes.push(item)
  })

  if (resultRecentAccessRoutes.length > 12) {
    resultRecentAccessRoutes = resultRecentAccessRoutes.slice(0, 12)
  }
  CacheUtils.setLocalStorage(
    getRecentAccessRouteKey(),
    resultRecentAccessRoutes
  )
}

/**
 * 获取最近访问的路由
 */
export const getRecentAccessRoutes = () => {
  return CacheUtils.getLocalStorage(getRecentAccessRouteKey()) || []
}

/**
 * 移除没有权限的路由
 */
export const removeNotAccessRoutes = () => {
  let recentAccessRoutes = getRecentAccessRoutes()
  recentAccessRoutes = recentAccessRoutes.filter(item =>
    hasRoute(this.$store.state.permission.routes, item)
  )
  CacheUtils.setLocalStorage(getRecentAccessRouteKey(), recentAccessRoutes)
}
