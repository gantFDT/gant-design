import moment from 'moment'
import { isString } from 'lodash'

// 获取当前时区的UTC偏移
const offset = moment().utcOffset() / 60

/**
 * 
 * @param { string| moment} time 接受一个表示东八区的时间字符串，转化为当前时区的时间
 * @param { format } 格式
 * 
 * @returns { moment }
 */
export function getCurTime(time, format) {

  const $value = time
  if (moment.isMoment($value)) {
    return $value
  }
  else if ($value && isString($value)) {
    if ($value.indexOf('+') === -1) { // 没有时区信息,当作东八区的时间计算
      return moment($value, format).subtract(8 - offset, 'hour')
    }
    // 带时区的时间不能用format格式化
    return moment($value)
  }
  return (d => d)()
}

/**
 * 接受一个当前时间的moment对象或字符串,返回东八区对应的时间字符串
 * @param { moment } time 
 * @returns string
 */
export function getUTC8Time(time, format = 'lll') {

  if (!time) return time
  if (isString(time) || moment.isMoment(time)) {
    return moment(time).utcOffset('+0800').format(format)
  }
  return time
}