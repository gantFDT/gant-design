
## API

属性如下

| 属性           | 说明                    | 类型                             | 默认值  |
| -------------- | ----------------------- | -------------------------------- | ------- |
| title          | 提示文字                | string                           | 动态列  |
| icon           | 设置按钮的图标类型      | string                           | eye     |
| data           | 数据数组                | array                            | []      |
| hiddenRows     | 需要隐藏的对应key值集合 | array                            | []      |
| keyName        | 自定义keyName           | string                           | key     |
| labelName      | 自定义labelName         | string                           | value   |
| disabled       | 菜单是否禁用            | boolean                          | `false` |
| handleCheckbox | 点击下拉checkbox的回调  | Function(item, checked, hiddens) |         |

> 注意：组件自身维护 `visible` 属性
> 
> 该组件是基于antd-DropDown的增强组件,支持其相关的其他属性配置
>


## 注意
外部列或图表要实现对应item的显示隐藏，需通过hiddenRows的key集合做对应数据源的过滤才可实现

## FAQ

