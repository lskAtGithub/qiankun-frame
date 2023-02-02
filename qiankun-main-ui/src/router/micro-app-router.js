import { MicroAppRouterPrefixEnum } from '@/enums/micro-app/micro-app-router-prefix-enum'
import Layout from '@/layout/index.vue'

const buildMicroAppRouter = () => {
  const result = []
  for (const microAppRouterPrefixEnumKey in MicroAppRouterPrefixEnum) {
    result.push({
      path: `${MicroAppRouterPrefixEnum[microAppRouterPrefixEnumKey]}/*`,
      component: Layout,
      hidden: true
    })
  }
  return result
}

const microAppRouter = buildMicroAppRouter()

export default microAppRouter
