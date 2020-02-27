const hex2hsl = `
import { hex2hsl } from 'util-g';

const [hex2hsl,setHex2hsl] = useState()

useEffect = (() => setHex2hsl(hex2hsl()),[])

ReactDOM.render(
  <div>十六进制颜色值#CCFFFF转变为HSL颜色值为：{hex2hsl('#CCFFFF')}</div>,
  mountNode
)
`
const guid = `
import { guid } from 'util-g';

const [guid,setGuid] = useState()

useEffect = (() => setGuid(guid()),[])

ReactDOM.render(
  <div>生成uuid为：{guid()}</div>,
  mountNode
)
`
const getType = `
import { getType } from 'util-g';

const [getType,setGetType] = useState()

useEffect = (() => setGetType(getType()),[])

ReactDOM.render(
  <div>当前类型：{getType('token')}</div>,
  mountNode
)
`
const deepCopy4JSON = `
import { deepCopy4JSON } from 'util-g';

const [deepCopy4JSON,setDeepCopy4JSON] = useState()

useEffect = (() => setDeepCopy4JSON(deepCopy4JSON()),[])

ReactDOM.render(
  <div>JSON深拷贝：{deepCopy4JSON()}</div>,
  mountNode
)
`
const JSONisEqual = `
import { JSONisEqual } from 'util-g';

const [JSONisEqual,setJSONisEqual] = useState()

useEffect = (() => setJSONisEqual(JSONisEqual()),[])

ReactDOM.render(
  <div>JSON数据相等:{JSONisEqual}</div>,
  mountNode
)
`

const IEVersion = `
import { IEVersion } from 'util-g';

const [ieVersion,setIeVersion] = useState()

useEffect = (() => setIeVersion(IEVersion()),[])

ReactDOM.render(
  <div>当前IE版本为：{ieVersion}</div>,
  mountNode
)
`
const isIE = `
import { isIE } from 'util-g';

const [isIE,setIsIE] = useState()

useEffect = (() => setIsIE(isIE()),[])

ReactDOM.render(
  <div>当前是否为ie浏览器：{isIE}</div>,
  mountNode
)
`
const getCookie = `
import { getCookie } from 'util-g';

const [getCookie,setGetCookie] = useState()

useEffect = (() => setGetCookie(getCookie()),[])

ReactDOM.render(
  <div>获取cookie:{getCookie('token')}</div>,
  mountNode
)
`
const delCookie = `
import { delCookie } from 'util-g';

const [delCookie,setDelCookie] = useState()

useEffect = (() => setDelCookie(delCookie()),[])

ReactDOM.render(
  <div>删除cookie{delCookie('token')}</div>,
  mountNode
)
`
const setCookie = `
import { setCookie } from 'util-g';

const [myCookie,setMyCookie] = useState()

useEffect = (() => setMyCookie(setCookie('token','sune123456789hash')),[])

ReactDOM.render(
  <div>设置cookie:{myCookie}</div>,
  mountNode
)
`
const throttle = `
import { throttle } from 'util-g';

const [throttle,setThrottle] = useState()

useEffect = (() => setThrottle(throttle),[])

ReactDOM.render(
  <div>节流函数:{throttle}</div>,
  mountNode
)
`
const getKey = `
import { getKey } from 'util-g';

const [getKey,setGetKey] = useState()

useEffect = (() => setGetKey(getKey()),[])

ReactDOM.render(
  <div>获取一个随机Key:{getKey}</div>,
  mountNode
)
`
const generateUuid = `
import { generateUuid } from 'util-g';

const [generateUuid,setGenerateUuid] = useState()

useEffect = (() => setGenerateUuid(generateUuid()),[])

ReactDOM.render(
  <div>生成uuid为：{generateUuid}</div>,
  mountNode
)
`
const randomString = `
import { randomString } from 'util-g';

const [randomString,setrandomString] = useState()

useEffect = (() => setrandomString(randomString(6)),[])

ReactDOM.render(
  <div>生成随机字符串:{randomString}</div>,
  mountNode
)
`
const isParamsEmpty = `
import { isParamsEmpty } from 'util-g';

const [isParamsEmpty,setisParamsEmpty] = useState()

useEffect = (() => setisParamsEmpty(isParamsEmpty()),[])

ReactDOM.render(
  <div>判断参数是不是空的:{isParamsEmpty}</div>,
  mountNode
)
`
const getFileUnit = `
import { getFileUnit } from 'util-g';

const [getFileUnit,setgetFileUnit] = useState()

useEffect = (() => setgetFileUnit(getFileUnit()),[])

ReactDOM.render(
  <div>根据文件获取大小获取对应带单位的字符串:{getFileUnit}</div>,
  mountNode
)
`
const getIconNameByFileName = `
import { getIconNameByFileName } from 'util-g';

const [getIconNameByFileName,setgetIconNameByFileName] = useState()

useEffect = (() => setgetIconNameByFileName(getIconNameByFileName()),[])

ReactDOM.render(
  <div>根据文件后缀名获取对应的图标名称:{getIconNameByFileName}</div>,
  mountNode
)
`
const spanCalculate = `
import { spanCalculate } from 'util-g';

const [spanCalculate,setspanCalculate] = useState()

useEffect = (() => setspanCalculate(spanCalculate()),[])

ReactDOM.render(
  <div>根据width换算栅格占位格数:{spanCalculate}</div>,
  mountNode
)
`
const cssVar2camel = `
import { cssVar2camel } from 'util-g';

const [cssVar2camel,setcssVar2camel] = useState()

useEffect = (() => setcssVar2camel(cssVar2camel()),[])

ReactDOM.render(
  <div>将css变量格式装换成小驼峰:{cssVar2camel}</div>,
  mountNode
)
`
const camel2cssVar = `
import { camel2cssVar } from 'util-g';

const [camel2cssVar,setcamel2cssVar] = useState()

useEffect = (() => setcamel2cssVar(camel2cssVar()),[])

ReactDOM.render(
  <div>将小驼峰转换成css变量格式:{camel2cssVar}</div>,
  mountNode
)
`
const resolveLocationQuery = `
import { resolveLocationQuery } from 'util-g';

const [resolveLocationQuery,setresolveLocationQuery] = useState()

useEffect = (() => setresolveLocationQuery(resolveLocationQuery()),[])

ReactDOM.render(
  <div>解析路由的查询参数query:{resolveLocationQuery}</div>,
  mountNode
)
`
const findDomParentNode = `
import { findDomParentNode } from 'util-g';

const [findDomParentNode,setfindDomParentNode] = useState()

useEffect = (() => setfindDomParentNode(findDomParentNode()),[])

ReactDOM.render(
  <div>向上递归冒泡找节点:{findDomParentNode}</div>,
  mountNode
)
`
const getPerformanceTiming = `
import { getPerformanceTiming } from 'util-g';

const [getPerformanceTiming,setgetPerformanceTiming] = useState()

useEffect = (() => setgetPerformanceTiming(getPerformanceTiming()),[])

ReactDOM.render(
  <div>前端性能分析:{getPerformanceTiming}</div>,
  mountNode
)
`

export default [hex2hsl,guid,getType,deepCopy4JSON,JSONisEqual, IEVersion,isIE, getCookie, delCookie, setCookie, throttle, getKey, generateUuid, randomString, isParamsEmpty, getFileUnit, getIconNameByFileName, spanCalculate, cssVar2camel, camel2cssVar, resolveLocationQuery, findDomParentNode, getPerformanceTiming]