import React, { useState } from 'react'
import Header from '@packages/header-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import { hex2hsl,guid,getType,deepCopy4JSON,JSONisEqual, IEVersion,isIE, getCookie, delCookie, setCookie, throttle, getKey, generateUuid, randomString, isParamsEmpty, getFileUnit, getIconNameByFileName, spanCalculate, cssVar2camel, camel2cssVar, resolveLocationQuery, findDomParentNode, getPerformanceTiming } from '@util';
import reactElementToJSXString from 'react-element-to-jsx-string';
import code from './code'

function hex2hslFun(props) {
  return (<div>将十六进制颜色"#CCFFFF"值转变为HSL颜色值:
    {hex2hsl('#CCFFFF')}
    </div>)
}
function guidFun(props) {
  return (<div>生成uuid:
    {guid()}
    </div>)
}
function getTypeFun(props) {
  const a = 1;
  const b = 'abc';
  const c = {"age":24};
  
  return (<div>判断 {a} , '{b}' , {JSON.stringify(c)} 的类型<br/> 
    a : {getType(a)}<br/>
    b : {getType(b)}<br/>
    c : {getType(c)}
    </div>)
}
function deepCopy4JSONFun(props) {
  return (<div>JSON深拷贝
    {/* {`{name:"sune"}`}:{deepCopy4JSON({name:"sune"})} */}
    </div>)
}
function JSONisEqualFun(props) {
  return (<div>JSON数据相等
    {/* {`{age:30}  {age:18}`}:{JSONisEqual({},{})} */}
    </div>)
}
function getIEVersion(props) {
  return (<div>当前IE版本为:{IEVersion()}</div>)
}
function getIsIE(props) {
  return (<div>当前是否为ie浏览器:{isIE() ? '是' : '否'}</div>)
}
function getCookieFun(props) {
  return (<div>获取token的cookie:
    {/* {getCookie('token')} */}
    </div>)
}
function delCookieFun(props) {
  return (<div>删除token的cookie:
    {/* {delCookie('token')} */}
    </div>)
}
function setCookieFun(props) {
  return (<div>设置token的cookie:
    {/* {setCookie('token')} */}
    </div>)
}
function throttleFun(props) {
  return (<div>节流函数:
    {/* {throttle(300)} */}
    </div>)
}
function getKeyFun(props) {
  return (<div>获取一个随机Key:
    {/* {getKey()} */}
    </div>)
}
function generateUuidFun(props) {
  return (<div>生成uuid:
    {/* {generateUuid()} */}
    </div>)
}
function randomStringFun(props) {
  return (<div>生成随机字符串:
    {/* {randomString(6)} */}
    </div>)
}
function isParamsEmptyFun(props) {
  return (<div>判断参数是不是空的:
    {/* {isParamsEmpty('token')} */}
    </div>)
}
function getFileUnitFun(props) {
  return (<div>根据文件获取大小获取对应带单位的字符串:
    {/* {getFileUnit('token')} */}
    </div>)
}
function getIconNameByFileNameFun(props) {
  return (<div>根据文件后缀名获取对应的图标名称:
    {/* {getIconNameByFileName('token')} */}
    </div>)
}
function spanCalculateFun(props) {
  return (<div>根据width换算栅格占位格数:{spanCalculate()}</div>)
}
function cssVar2camelFun(props) {
  return (<div>将css变量格式装换成小驼峰:
    {/* {cssVar2camel('token-styles')} */}
    </div>)
}
function camel2cssVarFun(props) {
  return (<div>将小驼峰转换成css变量格式:
    {/* {camel2cssVar('tokenStyles')} */}
    </div>)
}
function resolveLocationQueryFun(props) {
  return (<div>解析路由的查询参数query:
    {/* {resolveLocationQuery({})} */}
    </div>)
}
function findDomParentNodeFun(props) {
  return (<div>向上递归冒泡找节点:
    {/* {findDomParentNode({})} */}
    </div>)
}
function getPerformanceTimingFun(props) {
  return (<div>前端性能分析:
    {/* {getPerformanceTiming()} */}
    </div>)
}
 
const config = {
  codes: code.map(V => `import React, { useState, useCallback, useEffect, useMemo } from 'react';\n${V}`),
  inline: true,
  useage: `
    🤡 项目中经常会用到的一些公共方法
    `,
  children: [
    {
      title: 'hex2hsl | 将十六进制颜色值转变为HSL颜色值',
      describe: ' @param {string} hexColor 十六进制颜色值，@returns {(string | number|string[])} HSL颜色值',
      cmp: hex2hslFun,
    },
    {
      title: 'guid | 生成uuid',
      describe: '',
      cmp: guidFun,
    },
    {
      title: 'getType | 判断类型',
      describe: '@params {}',
      cmp: getTypeFun,
    },
    {
      title: 'deepCopy4JSON | JSON深拷贝',
      describe: '',
      cmp: deepCopy4JSONFun,
    },
    {
      title: 'JSONisEqual | JSON数据相等',
      describe: '',
      cmp: JSONisEqualFun,
    },
    {
      title: 'IEVersion | 判断ie版本',
      describe: '',
      cmp: getIEVersion,
    },
    {
      title: 'isIE | 判断是否为ie浏览器',
      describe: '',
      cmp: getIsIE,
    },
    {
      title: 'getCookie | 获取cookie',
      describe: '',
      cmp: getCookieFun,
    },
    {
      title: 'delCookie | 删除cookie',
      describe: '',
      cmp: delCookieFun,
    },
    {
      title: 'setCookie | 设置cookie',
      describe: '',
      cmp: setCookieFun,
    },
    {
      title: 'throttle | 节流函数',
      describe: '只能用于普通函数，不能再class中的方法上使用',
      cmp: throttleFun,
    },
    {
      title: 'getKey | 获取一个随机Key',
      describe: '',
      cmp: getKeyFun,
    },
    {
      title: 'generateUuid | 生成uuid',
      describe: '',
      cmp: generateUuidFun,
    },
    {
      title: 'randomString | 生成随机字符串',
      describe: '参数 len:number  长度',
      cmp: randomStringFun,
    },
    {
      title: 'isParamsEmpty | 判断参数是不是空的',
      describe: '{xxxx:undefined} => 空的',
      cmp: isParamsEmptyFun,
    },
    {
      title: 'getFileUnit | 根据文件获取大小获取对应带单位的字符串',
      describe: '@param {number |} num 文件size',
      cmp: getFileUnitFun,
    },
    {
      title: 'getIconNameByFileName | 根据文件后缀名获取对应的图标名称',
      describe: '@param {string} fileName 文件名称',
      cmp: getIconNameByFileNameFun,
    },
    {
      title: 'spanCalculate | 根据width换算栅格占位格数',
      describe: ' ',
      cmp: spanCalculateFun,
    },
    {
      title: 'cssVar2camel | 将css变量格式装换成小驼峰',
      describe: '',
      cmp: cssVar2camelFun,
    },
    {
      title: 'camel2cssVar | 将小驼峰转换成css变量格式',
      describe: ' ',
      cmp: camel2cssVarFun,
    },
    {
      title: 'resolveLocationQuery | 解析路由的查询参数query',
      describe: '@param {Object} query',
      cmp: resolveLocationQueryFun,
    },
    {
      title: 'findDomParentNode | 向上递归冒泡找节点',
      describe: '@param {object} target 当前节点;@param {string} className 节点class; ',
      cmp: findDomParentNodeFun,
    },
    {
      title: 'getPerformanceTiming | 前端性能分析',
      describe: '@returns 计算后的分析数据',
      cmp: getPerformanceTimingFun,
    },

  ]
};
export default () => <CodeDecorator config={config} />
