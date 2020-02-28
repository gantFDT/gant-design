const hex2hsl = `
import { hex2hsl } from 'util-g';

const [myHex2hsl,setMyHex2hsl] = useState()

useEffect = (() => setMyHex2hsl(hex2hsl('#CCFFFF')),[])

ReactDOM.render(
  <div>十六进制颜色值"#CCFFFF"转变为HSL颜色值为：{myHex2hsl}</div>,
  mountNode
)
`
const guid = `
import { guid } from 'util-g';

const [myGuid,setMyGuid] = useState()

useEffect = (() => setMyGuid(guid()),[])

ReactDOM.render(
  <div>生成uuid为：{myGuid}</div>,
  mountNode
)
`
const getType = `
import { getType } from 'util-g';

const [a,setA] = useState(1);
const [b,setB] = useState("abc");
const [c,setC] = useState({"age":24});

ReactDOM.render(
  <div>判断{a},{b},{JSON.stringify(c)}的类型<br/> 
    a : {getType(a)}<br/>
    b : {getType(b)}<br/>
    c : {getType(c)}
    </div>
  mountNode
)
`
const deepCopy4JSON = `
import { deepCopy4JSON } from 'util-g';

const obj1 = {
  arr:[
    {
      name:'sune',
      age:18
    }
  ],
  fun:() => {console.log(55)}
}

const obj2 = deepCopy4JSON(obj1);

ReactDOM.render(
  <div>JSON深拷贝{JSON.stringify(obj1)}<br/>
    obj2 : {obj2}
    </div>,
  mountNode
)
`
const JSONisEqual = `
import { JSONisEqual } from 'util-g';

ReactDOM.render(
  <div>JSON数据{JSON.stringify({age:30})} 和 {JSON.stringify({age:18})} 是否相等
    :{JSONisEqual({age:30},{age:18})}
    </div>,
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

ReactDOM.render(
  <div>获取cookie:{getCookie('token')}</div>,
  mountNode
)
`
const delCookie = `
import { delCookie } from 'util-g';

ReactDOM.render(
  <div>删除cookie{delCookie('token')}</div>,
  mountNode
)
`
const setCookie = `
import { setCookie } from 'util-g';


ReactDOM.render(
  <div>设置cookie:{setCookie('token','sune123456789')}</div>,
  mountNode
)
`
const throttle = `
import { throttle } from 'util-g';


ReactDOM.render(
  <div>节流函数</div>,
  mountNode
)
`
const getKey = `
import { getKey } from 'util-g';


ReactDOM.render(
  <div>获取一个随机Key:{getKey()}</div>,
  mountNode
)
`
const generateUuid = `
import { generateUuid } from 'util-g';

ReactDOM.render(
  <div>生成uuid为：{generateUuid(32)}</div>,
  mountNode
)
`
const randomString = `
import { randomString } from 'util-g';

ReactDOM.render(
  <div>生成随机字符串:{randomString(6)}</div>,
  mountNode
)
`
const isParamsEmpty = `
import { isParamsEmpty } from 'util-g';

ReactDOM.render(<div>判断参数{JSON.stringify({age:30})}是不是空的,参数必须为object:
  {isParamsEmpty({age:30}) ? '是' : '否'}
  </div>,
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