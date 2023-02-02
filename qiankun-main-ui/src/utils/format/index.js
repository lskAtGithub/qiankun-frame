/**
 * 通用格式化类, 存放常用的格式化方法
 */

class Format {
  /**
   * 时间格式化
   * @param {(Object|string|number)} time
   * @param {string} cFormat
   * @returns {string | null}
   */
  parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (typeof time === 'string') {
        if (/^[0-9]+$/.test(time)) {
          time = parseInt(time)
        } else {
          time = time.replace(new RegExp(/-/gm), '/')
        }
      }

      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      return value.toString().padStart(2, '0')
    })
    return time_str
  }

  /**
   * 时差解析, 如果是一天内返回距今时间,否则返回时间格式的字符串
   * @param {number} time
   * @param {string} option
   * @returns {string}
   */
  timeDiff(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    } else {
      time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return this.parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }

  /**
   * url query 转成键值对的 object
   * @param {string} url
   * @returns {Object}
   */
  getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  }
}

export default Format
