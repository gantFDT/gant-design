## Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

### 何时使用

需要用户输入表单域内容时。

提供组合型输入框，带搜索的输入框，还可以进行大小选择。

### API

|参数|说明|类型|默认值|是否所有表单组件都需要的参数
|:-:|:-:|:-:|:-:|:-:|
|allowEdit|是否允许表单组件的自身编辑(读模式下是否显示后面的编辑按钮)|boolean|true|是
|edit|组件的编辑状态(是否处于编辑模式)|boolean|false|是
|value|输入框内容|string| |是
|onChange|输入框内容变化时的回调| function(value)| |是
|onSave|点击对勾按钮的回调|function(id, value, cb)| |是
|onCancel|点击取消按钮的回调|function(value)| | |

> onSave函数参数说明:`id`表示通过`getFieldDecorator`标识的id，没有的时候返回undefined。`value`表示当前输入框的值。`cb`是一个回调，通常用于手动关闭编辑状态

其他更多参数[参考](https://ant-design.gitee.io/components/input-cn/)