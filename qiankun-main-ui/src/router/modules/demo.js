import Layout from '@/layout'

const demo = [
  {
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
        component: () => import('@/views/mainDemo/list/index'),
        meta: { title: 'main示例页面' }
      },
      {
        path: '/demo/demoPage/detail',
        name: 'DemoDetail',
        hidden: true,
        component: () => import('@/views/mainDemo/detail/index'),
        meta: { title: 'main详情', activeMenu: '/demo/demoPage/list' }
      }
    ]
  }
]

export default demo
