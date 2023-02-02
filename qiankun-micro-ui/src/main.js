import './public-path'
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router, { resetRouter } from './router'
import MicroAppUtils from '@/utils/micro-app-utils'
import appConfig from './config/micro/appConfig'
import Valiate from '@/utils/validate/index'
import Format from '@/utils/format'

import './icons'
import './permission'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, { size: Cookies.get('size') || 'medium' })

Vue.config.productionTip = false
// 在原型链注入了全局通用类对象， 如果开发者认为不妥可以删除此处代码，通过引入方式调用
Vue.prototype.$_validate = new Valiate()
Vue.prototype.$_format = new Format()

let instance = null

function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(
    container ? container.querySelector(`#${appConfig.CONTAINER_ID}`) : `#${appConfig.CONTAINER_ID}`
  )
}

if (!MicroAppUtils.isByQianKun()) {
  require('./permission')
  render()
}

// eslint-disable-next-line
export async function bootstrap() {
  console.log(
    `%c 接入了子应用 TEST—UI `,
    'color: #00a870; font-size: 22px; font-weight: bold;'
  )
}

export async function mount(props) {
  try {
    await store.dispatch('user/getInfo')
    await store.dispatch('permission/getMicroAppRoutes')
    // eslint-disable-next-line no-empty
  } catch (error) {}
  MicroAppUtils.setActions(props)
  MicroAppUtils.setGlobalState({
    app: require('../package.json').name,
    routes: store.getters.microAppRoutes,
    prefix: appConfig.ROUTER_PREFIX
  })
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  resetRouter()
}
