import Layout from '@/layout'

const home = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index'),
        name: 'HomePage',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export default home
