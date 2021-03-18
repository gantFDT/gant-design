import { get as _get } from 'lodash';
import _ from 'lodash';
//不包含业务信息的公共utils
/**
 * 判断ie版本
 */

export function IEVersion() {
  const { userAgent } = navigator; // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
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
export function getCookie(name: string): string | null {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

// 删除cookie
export function delCookie(name: string): void {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1000000);
  // 这里需要判断一下cookie是否存在
  var c = getCookie(name);
  if (c != null) {
    document.cookie = name + '=' + c + ';expires=' + exp.toUTCString() + ';path=/';
  }
}

// 设置cookie,增加到实例方便全局调用
export function setCookie(name: string, value: string, time: any = '', path: string = ''): void {
  if (time && path) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie =
      name + '=' + escape(value) + ';expires=' + exp.toUTCString() + ';path=' + path;
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
export function generateUuid(len: number = 32, radix: number = 10): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
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
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

/**
 * 判断类型
 */
export const getType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * JSON深拷贝
 */
export const deepCopy4JSON: <T>(data: T) => T = obj => JSON.parse(JSON.stringify(obj));

/**
 * JSON数据相等
 */
export const JSONisEqual = (a: object, b: object) => JSON.stringify(a) === JSON.stringify(b);

/**
 * 判断参数是不是空的 // {xxxx:undefined} => 空的
 */
export const isParamsEmpty = (value: object) => {
  if (getType(value) !== 'Object') throw '只能判断Object类型';
  const entries = Object.entries(value);
  return !entries.length || Object.entries(value).every(([key, value]) => value === undefined);
};

export const compose: <T extends (param: K) => K, K>(...args: Array<T>) => T = (...func: any[]) =>
  func
    .filter(fun => typeof fun === 'function')
    .reduce(
      (a, b) => (...args: any[]) => a(b(...args)),
      (args: any) => args,
    );

// 通过key,value查找树节点
export function getTreeNode(Data: any[], childrenKey: string, key: string, value: any): any {
  if (_.isEmpty(Data)) {
    return;
  }
  let Deep;
  let T;
  let F;
  for (F = Data.length; F; ) {
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
export function getIdsFormTree(
  Data: any[],
  childrenKey: string = 'children',
  field: string = 'id',
): any[] {
  let V;
  let L;
  let IDs = [];
  for (L = Data.length; L; ) {
    V = Data[--L];
    IDs.push(V[field]);
    if (V[childrenKey] && V[childrenKey].length) {
      IDs = [...IDs, ...getIdsFormTree(V[childrenKey], childrenKey, field)];
    }
  }
  return IDs;
}

// arr转树形结构数据
export function array2Tree(
  data: any[],
  parentId: string | undefined = undefined,
  keyName: string = 'key',
): any[] {
  const itemArr = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    if (node.parentId === parentId) {
      const children = array2Tree(data, node.id, keyName);
      const newNode = {
        ...node,
        [keyName]: node.id,
        children,
      };
      if (children.length == 0) {
        delete newNode.children;
      }
      itemArr.push(newNode);
    }
  }
  return itemArr;
}
//树形数据扁平化
export function tree2Array(dataSource: any[], childrenKey: string = 'children') {
  let arr: any[] = [];
  const expanded = (data: any[]) => {
    if (data && data.length > 0) {
      data.forEach(item => {
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
export function getFileUnit(size: number | string): string {
  const num = parseInt(`${size}`, 10);
  const B = 1024;
  const KB = B ** 2;
  const MB = B ** 3;
  const GB = B ** 4;
  let res: string | number = 0;
  let unit = '';
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
  return `${res} ${unit}`;
}

// 获取两个时间的间隔描述
export function getTimeInterval(startTimeStr: string, endTimeStr: string): string {
  const startTime: any = new Date(startTimeStr); // 开始时间
  const endTime: any = new Date(endTimeStr); // 结束时间
  let seconds: number | string = Math.floor((endTime - startTime) / 1000); // 秒数
  let minutes: number | string = Math.floor((endTime - startTime) / 1000 / 60); // 分钟
  let hours: number | string = Math.floor((endTime - startTime) / 1000 / 60 / 60); // 小时
  let days: number | string = Math.floor((endTime - startTime) / 1000 / 60 / 60 / 24); // 天数
  if (seconds < 60) {
    return `<1分钟)}`;
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
export function findDomParentNode(target: object, className: string) {
  let result = null;
  const bubble = (_target: object) => {
    if (!_target) {
      return;
    }
    if (typeof _target['className'] !== 'object' && _target['className'].indexOf(className) >= 0) {
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
export const getPerformanceTiming = () => {
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
export function hexToRgba(hex: any, opacity: number): string {
  const convertHex = hex
    .slice(1)
    .replace(/[0-9a-fA-F]/g, (match: string, index: number, string: string) =>
      string.length <= 3 ? match.repeat(2) : match,
    )
    .padEnd(6, '0')
    .slice(0, 6)
    .match(/[0-9a-fA-F]{1,2}/g)
    .map((n: any) => parseInt(n, 16))
    .join();

  return `rgba(${convertHex},${opacity})`;
}
