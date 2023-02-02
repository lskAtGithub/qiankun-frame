import { registerMicroApps, start } from 'qiankun'

import { microApps } from '@/mirco-app/micro-apps'
import microAppLifeCycles from '@/mirco-app/micro-app-lifecycles'

registerMicroApps(microApps, microAppLifeCycles)
start()
