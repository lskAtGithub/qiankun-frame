/**
 * 通用校验类, 存放常用的校验方法
 */

class Validate {
  /**
   * 校验是否为外部地址
   * @param {string} path
   * @returns {Boolean}
   */
  isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  /**
   * 校验是否为 url 链接
   * @param {string} url
   * @returns {Boolean}
   */
  isURL(url) {
    const reg =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
  }

  /**
   * 检验是否全小写字母
   * @param {string} str
   * @returns {Boolean}
   */
  isLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }

  /**
   * 校验是否全大写字母
   * @param {string} str
   * @returns {Boolean}
   */
  isUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }

  /**
   * 检验是否为字母
   * @param {string} str
   * @returns {Boolean}
   */
  isAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  }

  /**
   * 邮箱校验
   * @param {string} email
   * @returns {Boolean}
   */
  isEmail(email) {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }

  /**
   * 校验是否为字符串
   * @param {string} str
   * @returns {Boolean}
   */
  isString(str) {
    if (typeof str === 'string' || str instanceof String) {
      return true
    }
    return false
  }

  /**
   * 校验是否为数组
   * @param {Array} arg
   * @returns {Boolean}
   */
  isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
  }

  /**
   * 简单的手机号校验
   * @param {String, Number} phone
   * @returns {Boolean}
   */
  isPhone(phone) {
    const reg = /^1[0-9]{10}$/
    return reg.test(phone)
  }

  /**
   * 6位纯数字密码
   * @param {String, Number} code
   * @returns {Boolean}
   */
  isDigitalCode(code) {
    const reg = /^[0-9]{6}$/
    return reg.test(code)
  }
}

export default Validate
