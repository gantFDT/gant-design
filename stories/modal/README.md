## API
ItemState - 属性如下

| 属性             | 说明                                             | 类型          | 默认值 |
| ---------------- | ------------------------------------------------ | ------------- | ------ |
| x                | 弹窗弹出时定位x轴                                | number        | 无     |
| y                | 弹窗弹出时定位y轴                                | number        | 无     |
| width            | 弹窗宽度(支持px或百分比)                         | number/string | 520    |
| height           | 弹窗高度(支持px或百分比)                         | number/string | 520    |
| maximize         | 默认弹出时是否为最大化状态                       | boolean       | false  |
| keepStateOnClose | 在弹窗挂载期是否保留弹窗关闭前的xy定位与尺寸信息 | boolean       | false  |

Modal - 属性如下

| 属性          | 说明                                                        | 类型         | 默认值                |
| ------------- | ----------------------------------------------------------- | ------------ | --------------------- |
| classname     | 弹窗层自定义class                                           | string       |                       |
| style         | 弹窗额外样式                                                | css          |                       |
| itemState     | 窗自定义默认参数                                            | ItemState    | ItemState             |
| visible       | 是否可见                                                    | bool         | false                 |
| isModalDialog | 是否为模态窗口                                              | bool         | false                 |
| maxZIndex     | 当前最大堆叠等级                                            | number       | 1000                  |
| children      | 自定义弹窗内容                                              | reactElement |                       |
| onSizeChange  | 宽高改变的回调                                              | function     | (width,height)=>{...} |
| canMaximize   | 控制最大化、小屏化按钮功能的显隐+双击header切换该状态的功能 | bool         | true                  |
| canResize     | 是否可以拖动改变窗口大小                                    | bool         | true                  |
| onOk          | 提交按钮回调                                                | function     | ()=>{ }               |
| onCancel      | 取消按钮回调                                                | function     | ()=>{ }               |

ResizableProvider - 属性如下

| 属性        | 说明                   | 类型      | 默认值    |
| ----------- | ---------------------- | --------- | --------- |
| maxZIndex   | 当前最大堆叠等级       | number    | 0         |
| minWidth    | 拖动伸缩最小宽度限制   | number    | 200       |
| minHeight   | 拖动伸缩最小高度限制   | number    | 200       |
| initalState | 通用初始化弹窗默认参数 | ItemState | ItemState |

ResizableModal - 属性如下

| 属性          | 说明                                                        | 类型         | 默认值              |
| ------------- | ----------------------------------------------------------- | ------------ | ------------------- |
| id            | 唯一标识（必填）                                            | string       |                     |
| itemState     | 窗自定义默认参数                                            | ItemState    | ItemState           |
| isModalDialog | 是否为模态窗口                                              | bool         | false               |
| cancelText    | 取消按钮文案                                                | string       | 取消-基于antd国际化 |
| okText        | 提交按钮文案                                                | string       | 确认-基于antd国际化 |
| children      | 自定义弹窗内容                                              | reactElement |                     |
| canMaximize   | 控制最大化、小屏化按钮功能的显隐+双击header切换该状态的功能 | bool         | true                |
| canResize     | 是否可以拖动改变窗口大小                                    | bool         | true                |
| wrapClassName | 弹窗层自定义class                                           | string       |                     |
| style         | 弹窗额外样式                                                | css          |                     |
| onOk          | 提交按钮回调                                                | function     | ()=>{ }             |
| onCancel      | 取消按钮回调                                                | function     | ()=>{ }             |

## 注意
1).ResizableModal的其他更多底层modal属性请参考antd-modal

2).itemState不传递x，y属性时默认弹出从相对浏览器文档显示区的中心位置弹出

3).弹窗设置的坐标定位与尺寸会受浏览器文档宽高限制 (弹窗 <= 浏览器文档内容) 【永不超出】

## FAQ