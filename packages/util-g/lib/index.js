"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IEVersion = IEVersion;
exports.JSONisEqual = void 0;
exports.array2Tree = array2Tree;
exports.deepCopy4JSON = exports.compose = void 0;
exports.delCookie = delCookie;
exports.findDomParentNode = findDomParentNode;
exports.generateUuid = generateUuid;
exports.getCookie = getCookie;
exports.getFileUnit = getFileUnit;
exports.getIdsFormTree = getIdsFormTree;
exports.getPerformanceTiming = void 0;
exports.getTimeInterval = getTimeInterval;
exports.getTreeNode = getTreeNode;
exports.getType = void 0;
exports.hexToRgba = hexToRgba;
exports.isParamsEmpty = void 0;
exports.setCookie = setCookie;
exports.tree2Array = tree2Array;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _lodash = _interopRequireDefault(require("lodash"));
//不包含业务信息的公共utils
/**
 * 判断ie版本
 */
function IEVersion() {
  var _navigator = navigator,
    userAgent = _navigator.userAgent; // 取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion == 7) {
      return 7;
    }
    if (fIEVersion == 8) {
      return 8;
    }
    if (fIEVersion == 9) {
      return 9;
    }
    if (fIEVersion == 10) {
      return 10;
    }
    return 6; // IE版本<=7
  }
  if (isEdge) {
    return 'edge'; // edge
  }
  if (isIE11) {
    return 11; // IE11
  }
  return -1; // 不是ie浏览器
}
// 获取cookie、
function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
// 删除cookie
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1000000);
  // 这里需要判断一下cookie是否存在
  var c = getCookie(name);
  if (c != null) {
    document.cookie = name + '=' + c + ';expires=' + exp.toUTCString() + ';path=/';
  }
}
// 设置cookie,增加到实例方便全局调用
function setCookie(name, value) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  if (time && path) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString() + ';path=' + path;
  } else if (time) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toUTCString();
  } else if (path) {
    document.cookie = name + '=' + escape(value) + ';path=' + path;
  } else {
    document.cookie = name + '=' + escape(value);
  }
}
/*
生成uuid
len:number  长度
radix:number  进制
*/
function generateUuid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  var i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}
/**
 * 判断类型
 */
var getType = exports.getType = function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
/**
 * JSON深拷贝
 */
var deepCopy4JSON = exports.deepCopy4JSON = function deepCopy4JSON(obj) {
  return JSON.parse(JSON.stringify(obj));
};
/**
 * JSON数据相等
 */
var JSONisEqual = exports.JSONisEqual = function JSONisEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};
/**
 * 判断参数是不是空的 // {xxxx:undefined} => 空的
 */
var isParamsEmpty = exports.isParamsEmpty = function isParamsEmpty(value) {
  if (getType(value) !== 'Object') throw '只能判断Object类型';
  var entries = Object.entries(value);
  return !entries.length || Object.entries(value).every(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    return value === undefined;
  });
};
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, func = new Array(_len), _key = 0; _key < _len; _key++) {
    func[_key] = arguments[_key];
  }
  return func.filter(function (fun) {
    return typeof fun === 'function';
  }).reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  }, function (args) {
    return args;
  });
};
// 通过key,value查找树节点
function getTreeNode(Data, childrenKey, key, value) {
  if (_lodash.default.isEmpty(Data)) {
    return;
  }
  var Deep;
  var T;
  var F;
  for (F = Data.length; F;) {
    T = Data[--F];
    if (value === T[key]) {
      return T;
    }
    if (T[childrenKey]) {
      Deep = getTreeNode(T[childrenKey], childrenKey, key, value);
      if (Deep) return Deep;
    }
  }
}
// 取树形数据所有节点的id,返回一个id数组
function getIdsFormTree(Data) {
  var childrenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'id';
  var V;
  var L;
  var IDs = [];
  for (L = Data.length; L;) {
    V = Data[--L];
    IDs.push(V[field]);
    if (V[childrenKey] && V[childrenKey].length) {
      IDs = [].concat((0, _toConsumableArray2.default)(IDs), (0, _toConsumableArray2.default)(getIdsFormTree(V[childrenKey], childrenKey, field)));
    }
  }
  return IDs;
}
// arr转树形结构数据
function array2Tree(data) {
  var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var keyName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'key';
  var itemArr = [];
  for (var i = 0; i < data.length; i++) {
    var node = data[i];
    if (node.parentId === parentId) {
      var children = array2Tree(data, node.id, keyName);
      var newNode = Object.assign(Object.assign({}, node), (0, _defineProperty2.default)((0, _defineProperty2.default)({}, keyName, node.id), "children", children));
      if (children.length == 0) {
        delete newNode.children;
      }
      itemArr.push(newNode);
    }
  }
  return itemArr;
}
//树形数据扁平化
function tree2Array(dataSource) {
  var childrenKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  var arr = [];
  var expanded = function expanded(data) {
    if (data && data.length > 0) {
      data.forEach(function (item) {
        arr.push(item);
        expanded(item[childrenKey]);
      });
    }
  };
  expanded(dataSource);
  return arr;
}
/**
 * 根据文件获取大小获取对应带单位的字符串
 * @param {number |} num 文件size
 */
function getFileUnit(size) {
  var num = parseInt("".concat(size), 10);
  var B = 1024;
  var KB = Math.pow(B, 2);
  var MB = Math.pow(B, 3);
  var GB = Math.pow(B, 4);
  var res = 0;
  var unit = '';
  if (num < B) {
    res = num;
    unit = 'B';
  } else if (num >= B && num < KB) {
    res = num / B;
    unit = 'KB';
  } else if (num >= KB && num < MB) {
    res = num / KB;
    unit = 'M';
  } else if (num >= MB && num < GB) {
    res = num / MB;
    unit = 'G';
  }
  res = parseInt(res.toString(), 10) === res ? res : res.toFixed(2);
  return "".concat(res, " ").concat(unit);
}
// 获取两个时间的间隔描述
function getTimeInterval(startTimeStr, endTimeStr) {
  var startTime = new Date(startTimeStr); // 开始时间
  var endTime = new Date(endTimeStr); // 结束时间
  var seconds = Math.floor((endTime - startTime) / 1000); // 秒数
  var minutes = Math.floor((endTime - startTime) / 1000 / 60); // 分钟
  var hours = Math.floor((endTime - startTime) / 1000 / 60 / 60); // 小时
  var days = Math.floor((endTime - startTime) / 1000 / 60 / 60 / 24); // 天数
  if (seconds < 60) {
    return "<1\u5206\u949F)}";
  }
  days = days ? days + '天' : '';
  hours = hours ? hours + '时' : '';
  minutes = minutes ? minutes + '分' : '';
  seconds = seconds ? seconds + '秒' : '';
  return days + hours + minutes + seconds;
}
/**
 *向上递归冒泡找节点
 *
 * @param {object} target    //当前节点
 * @param {string} className //节点class
 * @returns  //找到的节点
 */
function findDomParentNode(target, className) {
  var result = null;
  var bubble = function bubble(_target) {
    if (!_target) {
      return;
    }
    if ((0, _typeof2.default)(_target['className']) !== 'object' && _target['className'].indexOf(className) >= 0) {
      result = _target;
    } else {
      _target = _target['parentElement'];
      bubble(_target);
    }
  };
  bubble(target);
  return result;
}
/**
 *
 *前端性能分析
 * @returns 计算后的分析数据
 */
var getPerformanceTiming = exports.getPerformanceTiming = function getPerformanceTiming() {
  var performance = window.performance;
  if (!performance) {
    console.log('您的浏览器不支持performance属性');
    return;
  }
  var t = performance.timing;
  var obj = {};
  // 重定向耗时
  obj['redirectTime'] = t.redirectEnd - t.redirectStart;
  // DNS查询耗时
  obj['lookupDomainTime'] = t.domainLookupEnd - t.domainLookupStart;
  // TCP链接耗时
  obj['connectTime'] = t.connectEnd - t.connectStart;
  // HTTP请求耗时
  obj['requestTime'] = t.responseEnd - t.responseStart;
  // 解析dom树耗时
  obj['domReadyTime'] = t.domComplete - t.domInteractive;
  // 白屏时间耗时
  obj['whiteTime'] = t.responseStart - t.navigationStart;
  // DOMready时间
  obj['domLoadTime'] = t.domContentLoadedEventEnd - t.navigationStart;
  // 页面加载完成的时间 即：onload时间
  obj['loadTime'] = t.loadEventEnd - t.navigationStart;
  return obj;
};
/*
 * @param hex 例如:"#23ff45"
 * @param opacity 透明度
 * @returns {string}
 */
function hexToRgba(hex, opacity) {
  var convertHex = hex.slice(1).replace(/[0-9a-fA-F]/g, function (match, index, string) {
    return string.length <= 3 ? match.repeat(2) : match;
  }).padEnd(6, '0').slice(0, 6).match(/[0-9a-fA-F]{1,2}/g).map(function (n) {
    return parseInt(n, 16);
  }).join();
  return "rgba(".concat(convertHex, ",").concat(opacity, ")");
}