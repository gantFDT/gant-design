
## API

属性如下

| 属性     | 说明                                      | 类型                         | 默认值 |
| -------- | ----------------------------------------- | ---------------------------- | ------ |
| onBlur | 失焦回调                                  | Function                     | 'line' |
| value | 值，AntIcon的type 或者iconfont的className | string                       |        |
| type | 值，与value相同，区别见下 |string||
| onChange | 选择回调 | Function(icon: string): void | |
| perfix | 指定iconfont图标中的公共前缀，可以根据具体的iconfont项目来进行更改 | string | `icon-` |

### value、type的区别

当使用type作为属性来显示图标、默认会以行内的形式去展示，在这种情况下,allowEdit和edit都不会生效。
而当使用value、onChange来控制图标显示的时候，自动变为一个受控组件。会以块级元素显示，默认占用一行

### 静态方法

- updateFromIconfontCN function(config) config形式如下

| 属性     | 说明                                      | 类型                         | 默认值 |
| -------- | ----------------------------------------- | ---------------------------- | ------ |
| scriptUrl| iconfont.cn 项目在线生成的 js 地址| string||
| extraCommonProps| 给所有的 svg 图标 <Icon /> 组件设置额外的属性 |`{ [key: string]: any }`|        |


## 注意
如需选择iconfont 需要前置引入iconfont图标