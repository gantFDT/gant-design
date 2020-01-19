## API

属性如下

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| prefixCls | 组件类名前缀 | string | `gant-组件名` |
| collapsed | 菜单是否折叠 | boolean | `false` |
| width | 菜单宽度 | number / string | `200` |
| heightDiff | 最小高度与窗口高度的差值 | number / string | `112` |
| selectedKey | 选中的菜单name值，默认为第一个 | string | |
| menuData | 菜单渲染项, 必填 | array | |
| onSelectedChange | 切换菜单后执行的回调函数, 必填 | function | |
| extra | 插槽内容 | string / ReactNode | |
| mode  | 菜单类型，现在支持水平、和内嵌模式两种 | string/ horizontal inline | inline
| isContextMenu | 是否应用于上下文菜单 | Boolean | false
## 注意

## FAQ