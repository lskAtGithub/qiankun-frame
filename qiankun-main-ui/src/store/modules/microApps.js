import {
  getActiveMicroAppActiveRule,
  getActiveMicroAppName,
  getMicroAppActiveMenu,
  getMicroAppActiveMenuRouteConfig,
  isMicroAppRoute
} from '@/mirco-app/micro-apps'
import router from '@/router'
import microAppStateActions from '@/mirco-app/micro-app-state-actions'
import { hasRoute } from '@/utils/route/menu'

export const notAccessRoute = () => {
  const isForthDirectory = getMicroAppActiveMenu()
  if (isForthDirectory) {
    if (
      !hasRoute(this.$store.state.permission.routes, { path: isForthDirectory })
    ) {
      router.push('/404')
    }
  } else {
    const { path } = router.currentRoute
    if (!hasRoute(this.$store.state.permission.routes, { path: path })) {
      router.push('/404')
    }
  }
}

const state = {
  app: '',
  prefix: '',
  activeMenu: '',
  globalState: {},
  activeRouteConfig: {},
  routes: [],
  syncRoutes: []
}

const mutations = {
  SET_MICRO_APP_STATE(state, globalState) {
    if (globalState.app) {
      state.globalState = globalState
    }
  },
  SET_MICRO_APP_ROUTES(state, routes) {
    state.routes = routes
  },
  REMOVE_MICRO_APP_ROUTES(state) {
    state.routes = []
  },
  SET_MICRO_APP_NAME(state, app) {
    state.app = app
  },
  REMOVE_MICRO_APP_NAME(state) {
    state.app = ''
  },
  SET_ACTIVE_MENU_ROUTE_CONFIG(state, activeRouteConfig) {
    state.activeRouteConfig = activeRouteConfig
    const { meta } = activeRouteConfig
    const { activeMenu } = meta
    if (activeMenu) {
      const { path } = router.currentRoute
      state.activeMenu = getActiveMicroAppActiveRule(path) + activeMenu
      return
    }
    state.activeMenu = ''
  },
  REMOVE_ACTIVE_MENU_ROUTE_CONFIG(state) {
    state.activeRouteConfig = {}
    state.activeMenu = ''
  },
  SET_SYNC_ROUTES: (state, appName) => {
    state.syncRoutes.push(appName)
  }
}

const actions = {
  async generateMicroAppStateRoute({ dispatch, commit }) {
    microAppStateActions.onGlobalStateChange((state) => {
      const { app, routes, prefix } = state
      const globalState = { app, routes, prefix }
      commit('SET_MICRO_APP_STATE', globalState)
    })
    dispatch('generateMicroAppRoutes')
    dispatch('generateMicroAppName')
  },
  generateMicroAppRoutes({ state, commit, dispatch }) {
    const { path } = router.currentRoute
    const globalState = state.globalState
    if (!state.globalState || !globalState.app) {
      commit('REMOVE_MICRO_APP_ROUTES')
      return
    }
    if (globalState.app === getActiveMicroAppName(path)) {
      commit('SET_MICRO_APP_ROUTES', globalState.routes)
      if (state.syncRoutes.includes(globalState.app)) return
      dispatch('permission/syncSubHiddenRoutes', globalState, { root: true })
      commit('SET_SYNC_ROUTES', globalState.app)
      return
    }
    commit('REMOVE_MICRO_APP_ROUTES')
  },
  removeMicroAppRoutes({ commit }) {
    commit('REMOVE_MICRO_APP_ROUTES')
  },
  generateMicroAppName({ state, commit }) {
    const globalState = state.globalState
    const { path } = router.currentRoute
    if (globalState.app === getActiveMicroAppName(path)) {
      commit('SET_MICRO_APP_NAME', globalState.app)
      return
    }
    commit('REMOVE_MICRO_APP_NAME')
  },
  generateActiveRouteConfig({ commit }) {
    if (!isMicroAppRoute()) {
      commit('REMOVE_ACTIVE_MENU_ROUTE_CONFIG')
    }
    const activeRouteConfig = getMicroAppActiveMenuRouteConfig()
    if (activeRouteConfig) {
      notAccessRoute()
      commit('SET_ACTIVE_MENU_ROUTE_CONFIG', activeRouteConfig)
      return
    }
    commit('REMOVE_ACTIVE_MENU_ROUTE_CONFIG')
  },
  removeActiveRouteConfig({ commit }) {
    commit('REMOVE_ACTIVE_MENU_ROUTE_CONFIG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
