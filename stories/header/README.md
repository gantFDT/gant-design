
## API

属性如下

| 属性        | 说明                               | 类型               | 默认值      |
| ----------- | ---------------------------------- | ------------------ | ----------- |
| type        | 类型，可选值为 `line` `icon` `num` | string             | 'line'      |
| title       | 标题                               | string             |             |
| beforeExtra | 左侧额外容器                       | string \ ReactNode |             |
| extra       | 右侧额外容器                       | string \ ReactNode |             |
| icon        | 供图标型使用指定icon               | string             | 'file-text' |
| num         | 供数字型使用的当前数字             | string \ number    | '0'         |
| color       | 自定义颜色                         | string             | '#000'      |
| bottomLine  | 分割线                             | boolean            | `false`     |
| style       | 额外样式                           | cSSProperties      |             |
| className   | 类名                               | string             |             |


## 注意
type默认为短线，当type为icon时才会显示icon, 当type为num才会显示num