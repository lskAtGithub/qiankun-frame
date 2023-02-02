import { MicroAppNameEnum } from '@/enums/micro-app/micro-app-name-enum'
import { MicroAppRouterPrefixEnum } from '@/enums/micro-app/micro-app-router-prefix-enum'
import {
  recursionActiveMatchedRoutes,
  recursionActiveRoute
} from '@/utils/route/menu'
import router from '@/router'
import store from '@/store'
import { MicroAppEntryEnum } from '@/enums/micro-app/micro-app-entry-enum'
import { isDevelopmentEnvironment } from '@/utils/env-utils'
import { pathToRegexp } from 'path-to-regexp'
import { MicroAppDevEntryEnum } from '@/enums/micro-app/micro-app-dev-entry-enum'

const buildMicroApps = () => {
  const result = []
  for (const key in MicroAppNameEnum) {
    result.push({
      name: MicroAppNameEnum[key],
      entry: isDevelopmentEnvironment()
        ? MicroAppDevEntryEnum[key]
        : MicroAppEntryEnum[key],
      container: '#appMainContainer',
      activeRule: MicroAppRouterPrefixEnum[key]
    })
  }
  return result
}

export const microApps = buildMicroApps()

/**
 * 是微应用路由
 *
 * @param activeRoute
 */
export const isActiveMicroApp = activeRoute => {
  return microApps.some(
    item =>
      activeRoute.startsWith(`${item.activeRule}/`) &&
      item.name === store.state.microApps.app
  )
}

/**
 * 是微应用路由
 */
export const isMicroAppRoute = () => {
  const { path } = router.currentRoute
  return isActiveMicroApp(path)
}

/**
 * 获取当前子应用名称
 *
 * @param activeRoute
 */
export const getActiveMicroAppName = activeRoute => {
  let result = ''
  microApps.some(item => {
    if (activeRoute.startsWith(`${item.activeRule}/`)) {
      result = item.name
      return true
    }
    return false
  })
  return result
}

/**
 * 获取当前子应用匹配规则
 *
 * @param activeRoute
 */
export const getActiveMicroAppActiveRule = activeRoute => {
  let result = ''
  microApps.some(item => {
    if (activeRoute.startsWith(`${item.activeRule}/`)) {
      result = item.activeRule
      return true
    }
    return false
  })
  return result
}

/**
 * 获取微应用激活的路径
 *
 * @param mainAppActiveRoute
 */
export const getMircoAppActiveRoutePath = mainAppActiveRoute => {
  return mainAppActiveRoute.substring(
    mainAppActiveRoute.split(/\//)[1].length + 1
  )
}

/**
 * 获取微应用激活的一级菜单
 *
 * @param mainAppActiveRoute
 */
export const getMicroActiveFirstLevelMenu = mainAppActiveRoute => {
  const { path = '' } = getMicroAppActiveFirstRoute(mainAppActiveRoute) || {}
  return process.env.VUE_APP_QIAN_KUN_ROOT_URL + path
}

/**
 * 获取微应用激活的一级路由
 *
 * @param mainAppActiveRoute
 */
export const getMicroAppActiveFirstRoute = mainAppActiveRoute => {
  const routes = store.state.microApps.routes
  if (!isActiveMicroApp(mainAppActiveRoute)) {
    return ''
  }
  const activePath = getMircoAppActiveRoutePath(mainAppActiveRoute)
  return recursionActiveRoute(routes, activePath)
}

/**
 * 获取微应用匹配的路由组
 */
export const getMicroAppActiveMatchedRoutes = () => {
  const { currentRoute } = router
  const { meta, path } = currentRoute
  const { activeMenu } = meta
  const result = recursionActiveMatchedRoutes(
    store.state.microApps.routes,
    getMircoAppActiveRoutePath(path),
    []
  )
  if (activeMenu) {
    result.push(currentRoute)
  }
  return result
}

/**
 * 获取激活的微应用路由
 */
export const getMicroAppActiveRoute = () => {
  const { currentRoute } = router
  const { path } = currentRoute
  return recursionRouteConfig(
    store.state.microApps.routes,
    getMircoAppActiveRoutePath(path)
  )
}

/**
 * 获取微应用激活的三级菜单
 */
export const getMicroAppActiveMenu = () => {
  const microAppActiveRoute = getMicroAppActiveRoute()
  const { meta } = microAppActiveRoute
  const { activeMenu: microAppActiveMenu } = meta
  const { currentRoute } = router
  const { path } = currentRoute
  if (microAppActiveMenu) {
    return getActiveMicroAppActiveRule(path) + microAppActiveMenu
  }
  return ''
}

/**
 * 获取激活的二级菜单路由详情
 */
export const getMicroAppActiveMenuRouteConfig = () => {
  const { currentRoute } = router
  const { path } = currentRoute
  return recursionRouteConfig(
    store.state.microApps.routes,
    getMircoAppActiveRoutePath(path)
  )
}

/**
 * 递归获取菜单路由配置
 *
 * @param routes
 * @param routePath
 */
export const recursionRouteConfig = (routes, routePath) => {
  let result = ''
  routes.some(item => {
    if (pathToRegexp(item.path).exec(routePath)) {
      result = item
      return true
    }
    if (item.children && item.children.length > 0) {
      result = recursionRouteConfig(item.children, routePath)
      return !!result
    }
    return false
  })
  if (result) {
    return result
  }
  return ''
}

/**
 * 获取当前路由详情
 */
export const getCurrentRouteDetail = () => {
  if (isMicroAppRoute()) {
    return getMicroAppActiveMenuRouteConfig()
  }
  return router
}
