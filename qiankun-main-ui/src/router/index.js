import Vue from 'vue'
import Router from 'vue-router'
import microAppRouter from '@/router/micro-app-router'

import Layout from '@/layout'
import home from './modules/home'
import demo from './modules/demo'
Vue.use(Router)

/**
 * Note: 子菜单只在路由子时出现。长度>= 1
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             该名称用于<keep-alive>(必须设置!!)
 * meta : {
    title: 'title'               在侧边栏和面包屑中显示的名称
    icon: 'svg-name'/'el-icon-x' 侧栏图标, 支持 el-icon 以及 svg 的配置
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true，标签被默认粘贴到 tag view 视图中
    breadcrumb: false            如果设置为false，项目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示所设置的路径
  }
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: '/profile/index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  ...microAppRouter,
  ...home,
  ...demo
]

export const asyncRoutes = []
const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(asyncRoutes)
})

export default router
