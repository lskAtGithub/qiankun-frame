export const getFixedHome = () => {
  return [
    {
      path: '/',
      meta: {
        title: '首页',
        icon: 'home',
        breadcrumb: false,
        accessPermission: true,
        menuPriority: 1
      },
      children: [
        {
          path: '/home/homePage',
          component: () => import('@/views/home/index.vue'),
          name: 'HomePage',
          meta: { title: '系统首页', accessPermission: true, menuPriority: 1 },
          children: [
            {
              path: '/home/homePage/systemHome',
              component: () => import('@/views/home/system/home/index'),
              name: 'SystemHome',
              meta: { title: '首页', accessPermission: true, menuPriority: 1 }
            }
          ]
        }
      ]
    }
  ]
}
