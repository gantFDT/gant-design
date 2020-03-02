const hex2hsl = `
/**
 * 将十六进制颜色值转变为HSL颜色值
 * @param {string} hexColor 十六进制颜色值
 * @returns {(string | number|string[])} HSL颜色值
 */
export const hex2hsl = (hexColor: string): string | number|string[] => {
  let sColor = hexColor.toLowerCase();
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i=1; i<4; i+=1) {
              sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      const sColorChange = [];
      for (let i=1; i<7; i+=2) {
          sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
      }

      let [r, g, b] = sColorChange;
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max == min){ 
          h = s = 0; // achromatic
      } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }

      return [h, s, l];
  }
  return sColor;
};
`
const getType = `
/**
 * 获取类型
 */
export const getType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);

`
const deepCopy4JSON = `
/**
 * JSON深拷贝
 */
export const deepCopy4JSON: <T>(data: T) => T = (obj) => JSON.parse(JSON.stringify(obj));

`
const judgeJSONisEqual = `

/**
 * 判断JSON数据相等
 */
export const judgeJSONisEqual = (a: object , b: object) => JSON.stringify(a) === JSON.stringify(b);

`

const getIEVersion = `

/**
 * 获取ie版本
 */
export function getIEVersion() {
  const { userAgent } = navigator; // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion == 7) {
      return 7;
    } if (fIEVersion == 8) {
      return 8;
    } if (fIEVersion == 9) {
      return 9;
    } if (fIEVersion == 10) {
      return 10;
    }
    return 6; // IE版本<=7

  } if (isEdge) {
    return 'edge'; // edge
  } if (isIE11) {
    return 11; // IE11
  }
  return -1; // 不是ie浏览器

}
`
const isIE = `
/**
 * 判断是否为ie浏览器
 */
export function isIE() {
  let ieVersion = getIEVersion()
  return ieVersion !== -1 && ieVersion !== 'edge'
}
`
const getCookie = `
// 获取cookie、
export function getCookie(name: string): string | null {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
`
const delCookie = `
// 删除cookie
export function delCookie(name: string): void {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1000000);
  // 这里需要判断一下cookie是否存在
  var c = getCookie(name);
  if (c != null) {
    document.cookie = name + "=" + c + ";expires=" + exp.toUTCString() + ";path=/";
  }
}
`
const setCookie = `
// 设置cookie,增加到实例方便全局调用
export function setCookie(name: string, value: string, time: any = '', path: string = ''): void {
  if (time && path) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString() + ";path=" + path;
  } else if (time) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
  } else if (path) {
    document.cookie = name + "=" + escape(value) + ";path=" + path;
  } else {
    document.cookie = name + "=" + escape(value)
  }
}
`
const throttle = `
/**
 * 节流函数
 * 只能用于普通函数，不能再class中的方法上使用
 * @param {timestamp} time 延迟毫秒数
 * @returns function wrapper
 */
export function throttle(time: number): (fn: any) => any {
  return function wrapper(fn) {
    let timer: any = null;
    /**
     * @returns 返回替代函数
     */
    return function wrapperInner(this: any, ...params: any) {

      // 不精确，可以改进
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, params);
        }, time);
      }
    };
  };
}
`

const generateUuid = `

/*
生成uuid
len:number  长度
radix:number  进制
*/
export function generateUuid(len: number = 32, radix: number = 10): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = []; let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
`

const isParamsEmpty = `

/**
 * 判断参数是不是空的 // {xxxx:undefined} => 空的
 */
export const isParamsEmpty = (value: object) => {
  if (getType(value) !== 'Object') throw '只能判断Object类型';
  const entries = Object.entries(value);
  return !entries.length || Object.entries(value).every(([key, value]) => value === undefined)
};


`

const spanCalculate = `
// 根据width换算栅格占位格数
export function spanCalculate(width: number): number {
  if (width < 576) {
    return 24
  } if (width < 768) {
    return 12
  } if (width < 992) {
    return 8
  } if (width < 1200) {
    return 8
  } if (width < 1600) {
    return 6
  }
  return 6

};

`

const resolveLocationQuery = `
/**
 * 解析路由的查询参数query
 * @param {Object} query
 */
export function resolveLocationQuery(query: any): any {
  const res = {}
  if (typeof query !== 'object') {
    return res
  }
  Object.keys(query).forEach((key) => {
    let tempValue = ''
    const value = query[key]
    try {
      tempValue = JSON.parse(value)
    } catch (error) {
      tempValue = value
    }
    res[key] = tempValue
  })
  return res
}

`
const findDomParentNode = `
/**
*向上递归冒泡找节点
*
* @param {object} target    //当前节点
* @param {string} className //节点class
* @returns  //找到的节点
*/
export const findDomParentNode = (target: object, className: string) => {
  let result = null;
  const bubble = (_target: object) => {
    if (!_target) { return }
    if (typeof _target['className'] !== 'object' && _target['className'].indexOf(className) >= 0) {
      result = _target
    } else {
      _target = _target['parentElement'];
      bubble(_target);
    }
  }
  bubble(target);
  return result;
}
`
const getPerformanceTiming = `
/**
*
*前端性能分析
* @returns 计算后的分析数据
*/
export const getPerformanceTiming = () => {
  var performance = window.performance; if (!performance) { console.log('您的浏览器不支持performance属性'); return; }
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
}
`

export default [hex2hsl,getType,deepCopy4JSON,judgeJSONisEqual, getIEVersion,isIE, getCookie, delCookie, setCookie, throttle, generateUuid, isParamsEmpty, spanCalculate,resolveLocationQuery, findDomParentNode, getPerformanceTiming]