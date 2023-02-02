/**
 * 数组工具类
 */
export default class ArrayUtils {
  /**
   * 判断数组是否为空
   * @param arr
   * @returns {boolean}
   */
  static isEmpty(arr) {
    return !arr || arr.length === 0
  }

  static groupByField = (arr, func) =>
    arr.map(typeof func === 'function' ? func : val => val[func]).reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i])
      return acc
    }, {})

  /**
   * 数组去重
   * @param arr
   * @returns
   */
  static deDuplication(arr) {
    return [...new Set(arr)]
  }

  /**
   * 对象数组数据是相同的
   *
   * @param arr
   * @param fields
   * @returns {boolean}
   */
  static isSimilar(arr, fields) {
    const resultFields = [...fields]
    return resultFields.every(fieldItem => {
      const obj = {}
      const srcArr = [...arr]
      const distinctArr = srcArr.reduce((cur, next) => {
        if (!obj[next[fieldItem]]) {
          obj[next[fieldItem]] = cur.push(next)
        }
        return cur
      }, [])
      return distinctArr.length === 1
    })
  }

  /**
   * 数组拼接视图展示
   *
   * @param arr
   * @returns {*}
   */
  static arrJoinView(arr) {
    return arr.join(',')
  }
}
