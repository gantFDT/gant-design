## API

#### 1. SmartTable
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableKey | 本地存储配置的键名，必填。 | string | - |
| title | 表格标题 | string &#124; ReactNode | - |
| schema | 表格模型的配置描述，具体项见下表 | SmartTableSchema[] | - |
| viewConfig | 当前配置 | viewConfig | - |
| bindKeys | 绑定的快捷键配置 | {[事件名]: 事件句柄} | - |
| onViewChange | 当前配置改变的回调函数，初始化以及改变的时候都会调用 | Function() | - |
| headerRight | 表格右上角的额外内容 | ReactNode | - |
| hasExport | 表格是否带有导出功能 | Boolean | - |
| bodyHeight | 表格高度 | number | - |
| bodyMinHeight | 表格最小高度，若填了bodyHeight，则无效 | number | 600 |
| onReload | 刷新时触发 | Function() | - |
| rowSelection | 同Antd的Table组件，允许覆盖 | RowSelectionProps | - |
| pageIndex | 当前页码 | number | 1 |
| pageSize | 每页条数 | number | 50 |
| onPageChange | 页码，每页条数 改变的回调，参数是改变后的pageIndex及每页条数。<br />若不传则为本地分页。<br />若传了 pagination 属性，此属性失效。 | Function(pageIndex, pageSize) | - |
| totalCount | 数据总数 | number | 0 |
| pageSizeOptions | 分页条选项 | string[] | ['50', '100', '150', '200'] |

#### 2. Schema
简洁数据模型对象是一个数组，不应包含UI配置项，包括宽度对齐方式等。每一项的属性为：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fieldName | Column键 | string | - |
| title | Column名 | string | - |
| componentType | 渲染器生成组件时的必要条件，若传入`ReactNode`<br />则直接渲染传入的组件，若不传则渲染成`Input` | ReactNode<br /> `DatePicker`<br /> `Input`<br /> `CodeList`<br /> `UserSelector`<br /> `TextArea`<br /> `GroupSelector` | - |
| props | 附加到所生成组件的属性上 | object | - |
| render | 同Antd的Table组件，允许覆盖 | Function(text, record, index) {} | - |


配置UI数据模型是一个对象。<br />其包含`supportColumnFields`属性，同简洁数据模型，是一个数组。<br />另外包含`systemViews`属性，是一个数组，每一项的属性为：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| viewId | 视图ID | string | - |
| name | 视图名 | string | - |
| version | 视图版本号 | string | - |
| panelConfig | 视图配置 | PanelConfig | - |


PanelConfig：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| wrap | 表格是否折行 | boolean | true |
| isZebra | 是否显示斑马线 | boolean | true |
| bordered | 是否显示列边框 | boolean | true |
| clickable | 是否可以点击行选中 | boolean | true |
| footerDirection | 表格底部分页位置 | 'row' 、 'row-reverse' | 'row' |
| heightMode | 表格高度策略 | 'full' 、 'auto' | 'full' |
| columnFields | 列UI配置, 未写的列则隐藏 | ColumnField[] | [] |


ColumnField:

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fieldName | 列字段名 | string | - |
| width | 列宽度 | number | - |
| fixed | 列固定方式 | 'left' 、 'right' | - |
| align | 列对齐方式 | 'left' 、 'center' 、 'right'  | 'left' |

#### 3. TableConfig
表格配置组件。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| viewConfig | 当前配置 | ViewConfig | - |
| schema | 表格模型的配置描述，具体项见下表 | SmartTableSchema[] | - |
| uiFields | 可配置字段 | string[] | ['wrap', 'isZebra', 'bordered', 'clickable', 'footerDirection', 'heightMode'] |
| onChange | 改变配置回调 | Function(viewConfig: ViewConfig) {} | - |

#### 4. viewSchema
表格的初始UI配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| wrap | 表格是否折行 | boolean | true |
| isZebra | 是否显示斑马线 | boolean | true |
| bordered | 是否显示列边框 | boolean | true |
| clickable | 是否可以点击行选中 | boolean | true |
| footerDirection | 表格底部分页位置 | 'row' 、 'row-reverse' | 'row' |
| heightMode | 表格高度策略 | 'full' 、 'auto' | 'full' |

## 注意
1、快捷键命名？<br />诸如： onAltB 、 onCtrlB 、onDelete 、onShiftAltR 等

其他属性请参考：<br />gantd-table: [http://gantd.gantcloud.com/?path=/story/components-list-%E5%88%97%E8%A1%A8--table-%E8%A1%A8%E6%A0%BC](http://gantd.gantcloud.com/?path=/story/components-list-%E5%88%97%E8%A1%A8--table-%E8%A1%A8%E6%A0%BC)<br />antd-table: [https://ant.design/components/table-cn/](https://ant.design/components/table-cn/)

## FAQ
#### 1.如何拓展自定义组件？
导出的默认组件, 包含静态属性 setField, setField接收一个类型为 {\[componentType\]: React.ReactElement} 的对象, 即可扩展schema的componentType类型, 详情参考 示例(行内编辑用法)