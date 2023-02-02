// Just a mock data

const constantRoutes = []

const asyncRoutes = [
  {
    path: '/micro/demo',
    redirect: '/micro/demo/demoPage/list',
    meta: {
      title: 'micro示例',
      icon: 'nested'
    },
    children: [
      {
        path: '/micro/demo/demoPage/list',
        name: 'DemoPage',
        meta: { title: 'micro示例页面1' }
      }
    ]
  }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
