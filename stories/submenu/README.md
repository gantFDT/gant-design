## API

属性如下

| 属性               | 说明                                   | 类型                      | 默认值                    |
| ------------------ | -------------------------------------- | ------------------------- | ------------------------- |
| collapsed          | 菜单是否折叠                           | boolean                   | `false`                   |
| mode               | 菜单类型，现在支持水平、和内嵌模式两种 | string/ horizontal inline | inline                    |
| selectedKey        | 选中的菜单name值，默认为第一个 , 必填  | string                    |                           |
| width              | 菜单宽度                               | number / string           | `200`                     |
| fixedTopHeight     | 最小高度与窗口高度的差值               | number                    | 0                         |
| subMinHeight       | 菜单最小高度                           | number / string           | `112`                     |
| collapsedWidth     | 菜单折叠宽度                           | number / string           | `40`                      |
| extra              | 菜单额外内容                           | reactNode                 |                           |
| menuData           | 菜单渲染项, 必填                       | array                     | []                        |
| showMenuMagnet     | 菜单渲染项                             | boolean                   | false                     |
| showFlipOverFooter | 菜单渲染项                             | boolean                   | false                     |
| style              | 额外样式                               | cSSProperties             |                           |
| classname          | classname属性                          | string                    |                           |
| onSwitchChange     | 切换菜单后执行的回调函数               | function                  | (nowMode) => void         |
| onCollapseChange   | 切换菜单后执行的回调函数               | function                  | (collapsed) => void       |
| onSelectedChange   | 切换菜单后执行的回调函数               | function                  | (key,record,item) => void |
## 注意

## FAQ