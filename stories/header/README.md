
## API

属性如下

| 属性        | 说明                                   | 类型               | 默认值      |
| ----------- | -------------------------------------- | ------------------ | ----------- |
| type        | 标签类型，可选值为 `line` `icon` `num` | string             | 'line'      |
| id          | 供锚点使用的标识                       | string             |             |
| title       | 提示文字                               | string             |             |
| beforeExtra | 左侧额外容器                           | string \ ReactNode |             |
| extra       | 右侧额外容器                           | string \ ReactNode |             |
| icon        | 供图表型使用指定icon                   | string             | 'file-text' |
| num         | 供数字型使用的当前数字                 | string \ number    | '0'         |
| color       | 自定义颜色                             | string             | 'default'   |
| bottomLine  | 分割线                                 | boolean            | `false`      |



## 注意
color属性设置自定义颜色仅支持16进制hex颜色和'theme'关键字主题色
## FAQ

