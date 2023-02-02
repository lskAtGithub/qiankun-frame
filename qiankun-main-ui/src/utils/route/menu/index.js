import router from '@/router'
import store from '@/store'
import { pathToRegexp } from 'path-to-regexp'
import ArrayUtils from '@/utils/ArrayUtils'

/**
 * 获取激活的一级路由
 *
 * @param activePath 当前激活的路由
 */
export const getActiveFirstLevelMenu = activePath => {
  const routes = store.state.permission.layoutRoutes

  const result = recursionActiveRoute(routes, activePath)
  const { path = '' } = result || {}
  return path
}

/**
 *  递归查找激活的一级路由
 *
 * @param routes
 * @param routePath
 */
export const recursionActiveRoute = (routes, routePath) => {
  const hasRoute = routes.find(item => {
    if (pathToRegexp(item.path).exec(routePath)) {
      return true
    }
    if (item.children && item.children.length > 0) {
      const findRoute = recursionActiveRoute(item.children, routePath)
      return !!findRoute
    }
    return false
  })

  if (hasRoute) {
    return hasRoute
  }
  return null
}

/**
 * 获取激活的多级路由记录
 */
export const getActiveMatchedRoutes = () => {
  const { currentRoute } = router
  const { meta, path } = currentRoute
  const { activeMenu } = meta
  const currentActiveMenu =
    store.state.microApps.activeMenu || activeMenu || path
  const routes = store.state.permission.routes
  const result = recursionActiveMatchedRoutes(routes, currentActiveMenu, [])
  if (store.state.microApps.activeMenu) {
    result.push(store.state.microApps.activeRouteConfig)
  }
  if (activeMenu) {
    result.push(currentRoute)
  }
  return result
}

/**
 * 递归查找匹配的路由组
 *
 * @param routes
 * @param activeMenu
 * @param result
 */
export const recursionActiveMatchedRoutes = (routes, activeMenu, result) => {
  const hasRoute = routes.find(item => {
    if (item.path === activeMenu) {
      return true
    }
    if (item.children && item.children.length > 0) {
      const findRoute = recursionActiveMatchedRoutes(
        item.children,
        activeMenu,
        result
      )
      return findRoute && findRoute.length > 0
    }
    return false
  })
  if (hasRoute) {
    result.unshift(hasRoute)
  }
  return result
}

/**
 * 判断是否有该路由
 *
 * @param routes
 * @param route
 */
export const hasRoute = (routes, route) => {
  if (ArrayUtils.isEmpty(routes)) {
    return false
  }
  return routes.some(item => {
    if (!ArrayUtils.isEmpty(item.children || [])) {
      return hasRoute(item.children || [], route)
    }
    return route.path === item.path
  })
}
