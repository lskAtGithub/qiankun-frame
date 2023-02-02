import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: [],
  microAppRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MICRO_APP_ROUTES: (state, routes) => {
    state.microAppRoutes = routes
  }
}

const actions = {
  generateRoutes({ state, commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES', asyncRoutes)
      resolve(state.routes)
    })
  },
  getMicroAppRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_MICRO_APP_ROUTES', [...asyncRoutes])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
