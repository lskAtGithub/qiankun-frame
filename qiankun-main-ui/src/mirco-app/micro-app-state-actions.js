import { initGlobalState } from 'qiankun'

const initialState = {
  app: '',
  prefix: '',
  routes: []
}

const microAppStateActions = initGlobalState(initialState)

export default microAppStateActions
