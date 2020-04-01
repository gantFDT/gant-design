## API
快捷键高阶组件

### KeyEvent arguments

| 参数 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| bindKeys | 按键绑定映射, 必填 | BindKey | |
| needFocus | 是否需要聚焦 | boolean | false |

#### BindKey props

| 参数 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| [on][按键名][按键名] | 键为按键名组合, 例如：onCtrlA、onShfitAltD, 必填  | Function(event) |  |