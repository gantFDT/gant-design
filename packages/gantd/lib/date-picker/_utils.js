"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurTime = getCurTime;
exports.getUTC8Time = getUTC8Time;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

// 获取当前时区的UTC偏移
var offset = (0, _moment.default)().utcOffset() / 60;
/**
 *
 * @param { string| moment} time 接受一个表示东八区的时间字符串，转化为当前时区的时间
 * @param { format } 格式
 *
 * @returns { moment }
 */

function getCurTime(time, format) {
  var $value = time;

  if (_moment.default.isMoment($value)) {
    return $value;
  } else if ($value && (0, _lodash.isString)($value)) {
    if ($value.indexOf('+') === -1) {
      // 没有时区信息,当作东八区的时间计算
      return (0, _moment.default)($value, format).subtract(8 - offset, 'hour');
    } // 带时区的时间不能用format格式化


    return (0, _moment.default)($value);
  }

  return function (d) {
    return d;
  }();
}
/**
 * 接受一个当前时间的moment对象或字符串,返回东八区对应的时间字符串
 * @param { moment } time
 * @returns string
 */


function getUTC8Time(time) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'lll';
  if (!time) return time;

  if ((0, _lodash.isString)(time) || _moment.default.isMoment(time)) {
    return (0, _moment.default)(time).utcOffset('+0800').format(format);
  }

  return time;
}