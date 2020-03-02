# Table-表格组件

# 甘棠软件 React - Gantd - Table


## API

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| editActions | 否 | function([dataList, setDataList],selectedRowKeys): ReactNode | - | 当editable为EDIT状态的时候会调用，返回的组件将显示在headerRight处。 |
| editable | 否 | EditStatus |  | 当前表格编辑状态 |
| emptyDescription | 否 | string、ReactNode | - | table无数据时展示的空状态描述 |
| fixedTop | 否 | string、number | - | 开启粘性头部的固定位置,比如：设置为20，表示当页面滚动，table距离顶部距离小于20px的时候，头部会固定在页面中 |
| footerDirection | 否 | 'row'、'row-reverse' | 'row' | 表格底部的排序方式 |
| ~~flex(**deprecated**)~~ | ~~否~~ | ~~boolean~~ | ~~false~~ | ~~是否弹性缩放~~ |
| headerLeft | 否 | ReactNode | - | table头部左边内容 |
| headerMarginBottom | 否 | number | 10 | table头部与table之间的距离 |
| headerProps | 否 |  | - | 表格头部参数,作用于blockheader |
| headerRight | 否 | ReactNode | - | table头部右边内容 |
| isZebra | 否 | boolean | false | 开启斑马条纹 |
| onDragEnd | 否 | function |  | 行排序回调|
| onSave | 否 | function(dataSource,[addList,delList, modifyList]) |  | 当表格状态变为SAVE的时候会调用，返回最新的表格数据，以及新增、删除、修改的数据 |
| orderList | 否 | array | - | 列的排序信息，同smartForm |
| pagination | 否 | object |  | 参考[链接](https://ant-design.gitee.io/components/pagination-cn/) |
| resizable | 否 | boolean | false | 是否允许动态缩放列宽度 |
| rowSelection | 否 | object |  | 行选择功能，其他参数参考[链接]() |
| scrollKey | 否 | string |  |、设置滚动到指定行的key |
| tableKey | 否 | string | - | 用于标识唯一table |
| tail | 否 | function | funciton(pagedata) | 表格尾部的显示,与分页条,和附加选择框在同一区域 |
| title | 否 | string、ReactNode | - | table标题 |
| virtualScroll | 否 | object、true | - | 虚拟滚动相关属性
| wheel | 否 | function | - | 滚动的触发回调 |
| withIndex | 否 | number |  | 当设置大于0的时候，显示**序号**列到对应的位置，部分情况下，可能内置的序号列不满足情况可以自行添加一列并设置dataIndex为'g-index'，就可以使用计算好的序号 |
| wrap | 否 | boolean | false | 规定单元格中文字的是否折行显示 |




### Column API
单元格编辑相关属性

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| editConfig.showDirt | 否 | boolean | true | 是否显示脏标记 |
| editConfig.render | 否 | function | - | 返回编辑时显示的组件 |
| editConfig.editValue | 否 | function、string、object | - | 返回值作为render组件的value并注入,当为function时，function(record, rowIndex, dataIndex) |
| showTip | 否 | boolean | false | 是否显示默认的气泡提示 |
| placement | 否 | string | rightBottom | 气泡提示的位置，参考[链接](https://ant-design.gitee.io/components/tooltip-cn/) |
| expandColumn | 否 | boolean |  | 当表格具有属性结构的时候，由设置expandColumn为true的列显示展开按钮，当所有列都没有这个属性的时候由ant决定展开列 |


### rowSelection API

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| clickable | 否 | boolean | false | 是否允许点击选中 |
| onChange | 否 | function | function(keys, rows) | 当选中值发生改变的时候 |
| onSelect | 否 | function | function(keys,rows,selected) | 当某一项选中或取消选中的时候调用 |
| preventDefault | 否 | boolean | false | 默认情况下，多选模式的树状结构中，勾选父级节点会选中子节点。为true的情况下会阻止这种行为 |
| selectedRowKeys | 否 | Array<string> |  | 已选中的key，根据rowKey计算 |
| showFooterSelection | 否 | boolean | false | 是否显示底部的勾选框，多选模式下生效，单选模式下默认不显示 |
| type | 否 | string | checkbox | 选择类型,'checkbox'为多选，'radio'为单选 |

### virtualScroll API

可以通过指定virtualScroll为true简单的开启虚拟滚动，建议在表格高度教高的情况下指定一个较大的threshold值

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| threshold | 否 | number | 20 | 虚拟滚动下单页显示的条数 |
| rowHeight | 否 | number、string| 24 | 每一行的高度 | 
| center | 否 | boolean | true | 行内容是否居中


## 表格编辑功能重要说明

在[https://gant.yuque.com/fdt/gantreact/zukvrz#hlRTZ](https://gant.yuque.com/fdt/gantreact/zukvrz#hlRTZ)的已有的说明下，添加以下更新说明，和尽可能的说明实现方式。
## 
### WHAT（什么是表格的编辑功能）
在表格中直接展示一个表单区域提供给用户进行数据的修改，并能提供保存用户修改的功能，就是表格的编辑功能


### WHY（为什么要有表格的编辑功能）
表格作为中后台系统中重要的数据展示形式，只具有查看的功能。但是往往又会有修改某些数据的需求，如果为了去支持某一个数据的修改而需要单独增加一个页面，费时费力。而直接在表格上面进行编辑，对提升开发效率和减少用户操作步骤而言，都是非常重要的功能

### HOW（怎么去实现表格的编辑功能）

#### 基本原理
根据用户的操作，决定在单元格中显示文本还是输入框
#### 过程
a、修改editable参数为EditStatus.EDIT，在这个过程下，界面数据不会有明显改变。但是，Table组件会自动切换数据源到一个**clone**的数据上，目的是为了在这种编辑状态下，可以由组件自身决定如何更新数据
b、对于某一个传递有editConfig参数的列，点击列中的某一个单元格，就会显示出editConfig.render方法返回的组件，例如是一个输入框组件。在render方法调用之前，会调用editConfig.editValue，将其作为value传递给render返回的组件的，同时会自定注入一些其他的参数
c、用户编辑输入框中的数据，组件自动更新**clone**的数据。
d、修改editable参数为EditStatus.SAVE，调用onSave回调，将更新后的数据返回。业务层手动更改数据
#### 为什么编辑状态下要clone一份数据
用户在修改数据的过程中需要及时修改表格中数据的呈现，为减少业务层的工作量，就需要在组件中由组件自身来完成数据的更新，而这一步骤自然不能使用原始数据去做修改，否则在业务层的其他操作都可能影响到编辑后的数据。所以需要clone一份，并在保存的时候以回调的方式返回给业务层，由业务层决定如何处理这些更改


