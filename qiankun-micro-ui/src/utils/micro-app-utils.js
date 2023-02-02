import {
  getMainAppLoginHref,
  isDevelopmentEnvironment
} from '@/utils/env-utils'

export default class MicroAppUtils {
  /**
   * 是否是基于乾坤
   */
  static isByQianKun = () => {
    const { __POWERED_BY_QIANKUN__ } = window
    return !!__POWERED_BY_QIANKUN__
  }

  static toMainAppLogin = () => {
    window.location.href = getMainAppLoginHref()
  }

  static nextAppHref = () => {
    if (isDevelopmentEnvironment()) {
      return
    }
    MicroAppUtils.toMainAppLogin()
  }

  /**
   * 设置 actions
   */
  static setActions = actions => {
    this.actions = actions
  }

  /**
   * 映射
   */
  static onGlobalStateChange = (...args) => {
    return this.actions.onGlobalStateChange(...args)
  }

  /**
   * 映射
   */
  static setGlobalState = (...args) => {
    return this.actions.setGlobalState(...args)
  }
}
