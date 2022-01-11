##API


|参数|说明|类型|默认值|
|:-:|:-:|:-:|:-:|
|dataSource|选项列表|array|[]|
|selectorId|缓存数据在本机的键,相同值得两个组件实例的最近选择数据互通|string|selector|
|valueProp|写在option上的value字段|string|value|
|labelProp|用作显示的文本字段||label|
|~~getLabelText~~|~~初始化获取label值~~|~~function(value,cb){cb(label)}~~||
|renderItem|用于自定义optionItem|function(item,Option){}||
|query|请求选项数据的方法,接受一个搜索框值得参数,返回一个promise|function(filter){}||
|optionLabel|外部label，主要用于设置一个在list中没有的数据所显示的label|||
|isFilter|是否过滤模式，过滤模式下会根据输入过滤选项，在没有query方法的情况下才生效，配合dataSource使用|||
|useCache|是否开启选择器内置的任务缓存,建议在外部查询条件不会改变的情况下才开启，否则一定要设置为false|boolean|true|
|useStorage|是否开启最近选择|boolean|true|
|readOnly|只读模式|boolean|false|
|blurOnSelect|是否在选中一个项的时候失焦|boolean|true|
|hideSelected|隐藏选中的项|boolean|false|
|customNotDataContent|值为空时下拉框展示的自定义信息|string|''|

### dataSource API

|参数|说明|类型|默认值|
|:-:|:-:|:-:|:-:|
|disabled|是否禁用该选项|boolean|-|
|key|react key|string| 与value字段相同 |
|title|dom title|string| |
|className|选项类名|string| |
|group|分组名|string| |

#### 关于选项中的value、label

通过valueProp指定dataSource中的哪个字段作为value，默认使用dataSource[item].value。label同理
对于key，默认会使用value相同的值
