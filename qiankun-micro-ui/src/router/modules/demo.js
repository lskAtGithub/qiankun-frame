/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const demo = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/demoPage/list',
  meta: {
    title: '示例',
    icon: 'nested'
  },
  children: [
    {
      path: '/demo/demoPage/list',
      name: 'DemoPage',
      component: () => import('@/views/demo/list/index'),
      meta: { title: '示例页面1' }
    },
    {
      path: '/demo/demopage/detail',
      name: 'DemoDetail',
      hidden: true,
      component: () => import('@/views/demo/detail/index'),
      meta: { title: 'test详情', activeMenu: '/demo/demoPage/list' }
    }
  ]
}

export default demo
