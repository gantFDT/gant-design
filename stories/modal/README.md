## API

Modal - 属性如下

| 属性          | 说明                                                        | 类型         | 默认值                                              |
| ------------- | ----------------------------------------------------------- | ------------ | --------------------------------------------------- |
| classname     | 弹窗层自定义class                                           | string       |                                                     |
| style         | 弹窗额外样式                                                | css          |                                                     |
| itemState     | 窗自定义默认参数                                            | object       | {x: 0,y: 0,width: 520,height: 520,maximized: false} |
| visible       | 是否可见                                                    | bool         | false                                               |
| isModalDialog | 是否为模态窗口                                              | bool         | false                                               |
| maxZIndex     | 当前最大堆叠等级                                            | number       | 1000                                                |
| children      | 自定义弹窗内容                                              | reactElement |                                                     |
| onSizeChange  | 宽高改变的回调                                              | function     | (width,height)=>{...}                               |
| canMaximize   | 控制最大化、小屏化按钮功能的显隐+双击header切换该状态的功能 | bool         | true                                                |
| canResize     | 是否可以拖动改变窗口大小                                    | bool         | true                                                |
| onOk          | 提交按钮回调                                                | function     | ()=>{ }                                             |
| onCancel      | 取消按钮回调                                                | function     | ()=>{ }                                             |

ResizableProvider - 属性如下

| 属性        | 说明                   | 类型   | 默认值                                              |
| ----------- | ---------------------- | ------ | --------------------------------------------------- |
| maxZIndex   | 当前最大堆叠等级       | number | 0                                                   |
| minWidth    | 拖动伸缩最小宽度限制   | number | 200                                                 |
| minHeight   | 拖动伸缩最小高度限制   | number | 200                                                 |
| initalState | 通用初始化弹窗默认参数 | object | {x: 0,y: 0,width: 520,height: 520,maximized: false} |

ResizableModal - 属性如下

| 属性             | 说明                                                        | 类型         | 默认值                                              |
| ---------------- | ----------------------------------------------------------- | ------------ | --------------------------------------------------- |
| id               | 唯一标识（必填）                                            | string       |                                                     |
| itemState        | 窗自定义默认参数                                            | object       | {x: 0,y: 0,width: 520,height: 520,maximized: false} |
| isModalDialog    | 是否为模态窗口                                              | bool         | false                                               |
| cancelText       | 取消按钮文案                                                | string       | 取消                                                |
| okText           | 提交按钮文案                                                | string       | 确认                                                |
| disabled         | 提交按钮禁用                                                | bool         | false                                               |
| children         | 自定义弹窗内容                                              | reactElement |                                                     |
| canMaximize      | 控制最大化、小屏化按钮功能的显隐+双击header切换该状态的功能 | bool         | true                                                |
| canResize        | 是否可以拖动改变窗口大小                                    | bool         | true                                                |
| footerLeftExtra  | 默认的footer左侧插槽                                        | reactElement |                                                     |
| footerRightExtra | 默认的footer右侧插槽                                        | reactElement |                                                     |
| wrapClassName    | 弹窗层自定义class                                           | string       |                                                     |
| style            | 弹窗额外样式                                                | css          |                                                     |
| onOk             | 提交按钮回调                                                | function     | ()=>{ }                                             |
| onCancel         | 取消按钮回调                                                | function     | ()=>{ }                                             |

## 注意
ResizableModal的其他更多底层modal属性请参考antd-modal

## FAQ