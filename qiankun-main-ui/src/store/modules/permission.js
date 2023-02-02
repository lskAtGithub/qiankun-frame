import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/user/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 *
 * @param {Routes} parentRoute
 * @param {Routes} childRoute
 * @returns {Routes} route object
 */
function onHasHiddenAttrRoute(prefix, parentRoute, childRoute) {
  const result = JSON.parse(JSON.stringify(parentRoute))
  const children = []
  let hasHide = false
  childRoute.map((i) => {
    if (i.hidden) {
      hasHide = true
      if (!i.path.includes(prefix + '/')) {
        i.path = prefix + i.path
        if (i.meta.activeMenu) {
          i.meta.activeMenu = prefix + i.meta.activeMenu
        }
      }
      children.push(i)
    }
  })
  if (childRoute.children && childRoute.children.length) {
    onHasHiddenAttrRoute(prefix, childRoute, childRoute.children)
  }
  if (hasHide) {
    result.path = prefix + result.path
    result.children = children
    return result
  }
}

function transformRoutes(router) {
  return router
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }) {
    const { data } = await getRoutes()
    const routes = transformRoutes(data)
    commit('SET_ROUTES', routes)
  },
  /**
   * 获取子应用的所有隐藏的路由
   */
  async syncSubHiddenRoutes({ state, dispatch }, globalState) {
    const routes = state.routes
    globalState.routes.map((route) => {
      if (route.children && route.children.length) {
        const result = onHasHiddenAttrRoute(
          globalState.prefix,
          route,
          route.children
        )
        if (result) {
          result.children.map((item) => {
            // 如果当前正处于详情页面的话, 就直接放入 tag views
            if (window.location.pathname === item.path) {
              dispatch('tagsView/addVisitedView', item, { root: true })
            }
          })
          for (let index = routes.length - 1; index >= 0; index--) {
            const element = routes[index]
            if (element.path === result.path) {
              element.children = element.children.concat(result.children)
              return
            }
          }
        }
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
