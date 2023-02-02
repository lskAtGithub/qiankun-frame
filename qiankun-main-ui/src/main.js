import Vue from 'vue'

import Cookies from 'js-cookie'
import Element from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import '@/styles/index.scss'
import './icons'
import './permission'
import Validate from '@/utils/validate/index'
import Format from '@/utils/format/index'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

Vue.config.productionTip = false
// 在原型链注入了全局通用类对象， 如果开发者认为不妥可以删除此处代码，通过引入方式调用
Vue.prototype.$_validate = new Validate()
Vue.prototype.$_format = new Format()

new Vue({
  el: '#mainApp',
  router,
  store,
  render: (h) => h(App)
})
