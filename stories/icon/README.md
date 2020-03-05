
## API

属性如下

| 属性     | 说明                                      | 类型                         | 默认值 |
| -------- | ----------------------------------------- | ---------------------------- | ------ |
| onBlur   | 失焦回调                                  | Function                     | 'line' |
| value    | 值，AntIcon的type 或者iconfont的className | string                       |        |
| onChange | 选择回调                                  | Function(icon: string): void |        |
| perfix | 指定iconfont图标中的公共前缀，可以根据具体的iconfont项目来进行更改 | string | `icon-` |


### 静态方法

- updateFromIconfontCN function(config) config形式如下

| 属性     | 说明                                      | 类型                         | 默认值 |
| -------- | ----------------------------------------- | ---------------------------- | ------ |
| scriptUrl| iconfont.cn 项目在线生成的 js 地址| string||
| extraCommonProps| 给所有的 svg 图标 <Icon /> 组件设置额外的属性 |`{ [key: string]: any }`|        |


## 注意
如需选择iconfont 需要前置引入iconfont图标