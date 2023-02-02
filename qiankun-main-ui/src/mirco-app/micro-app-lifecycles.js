import { Loading } from 'element-ui'
import { addGlobalUncaughtErrorHandler } from 'qiankun'
let loading = null
let loadingTimeout = 0

const beforeLoad = () => {
  if (loading) {
    loading.close()
  }
  loadingTimeout = setInterval(() => {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中',
      background: 'rgba(211,206,206,0.39)'
    })
  }, 1000)
}

const afterMount = () => {
  if (loading) {
    loading.close()
  }
  clearInterval(loadingTimeout)
}
const microAppLifeCycles = {
  beforeLoad: beforeLoad,
  afterMount: afterMount
}

addGlobalUncaughtErrorHandler(() => {
  if (loading) {
    loading.close()
  }
  clearInterval(loadingTimeout)
})

export default microAppLifeCycles
