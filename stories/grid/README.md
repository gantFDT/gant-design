# Table-表格组件

# 甘棠软件 React - Gantd - Table-Grid


## Grid API

| 属性             | 是否必传 | 类型                         | 默认值 | 说明                       |
|------------------|----------|------------------------------|--------|----------------------------|
| columns          | 是       | Column[]                     | []     |                            |
| dataSource       | 否       | any[]                        | []     | 数据源                     |
| rowkey           | 是       | string 或 (data:any)=>string | -      | 唯一标示                   |
| rowSelection     | 否       | boolean 或 RowSelection      | false  | selection配置              |
| pagination       | 否       | Pagination                   | -      | Pagination配置             |
| onReady          | 否       | (params)=>void               | -      | gird初始完成回调           |
| editable         | 否       |                              |        |                            |
| onEditableChange | 否       | (editable:boolean)=>void     | -      | 内部editalbe状态改变时回调 |
| onEdit           | 否       | (editApi)=>void              |        | editApi                    |
| treeData         | 否       | boolean                      | false  | 是否开启树形渲染模式       |
| loading          | 否       | boolean                      | false  | grid loading状态           |
| className        | 否       | string                       | -      | className                  |
| filter           | 否       | boolean                      | false  | 默认单列过滤               |
| resizable        | 否       | boolean                      | true   | 默认单列伸缩               |
| sortable         | 否       | boolean                      | true   | 默认单列排序               |
| width            | 否       | string 或 number             | "100%" | grid 宽度                  |
| height           | 否       | string 或 number             | 400    | grid 宽度                  |
更多属性参考 [ag-grid](https://www.ag-grid.com/documentation-main/documentation.php)
### RowSelection

| 属性                    | 是否必传 | 类型                 | 默认值     | 说明                                           |
|-------------------------|----------|----------------------|------------|------------------------------------------------|
| type                    | 否       | "single"或"multiple" | "multiple" | selection类型                                  |
| checkboxIndex           | 否       | number               | -          | checkbox出现在哪列                             |
| selectedKeys            | 否       | string[]             | -          | 双向绑定选择keys                               |
| onSelect                | 否       | (keys,rows)=>void    | -          | selection change变化回调                       |
| showDefalutCheckbox     | 否       | boolean              | true       | 开启默认selection列                            |
| defaultSelectionCol     | 否       | ColDef               | -          | 默认selection列配置                            |
| rowMultiSelectWithClick | 否       | boolean              | true       | 是否允许单击选择多个行                         |
| rowDeselection          | 否       | boolean              | true       | 是否可在按住Ctrl键并单击该行的情况下取消选择行 |

### Pagination

| 属性       | 是否必传 | 类型   | 默认值 | 说明         |
|------------|----------|--------|--------|--------------|
| beginIndex | 否       | number | 0      | 开始分页位置 |

其他属性参考 [antd-Pagination](https://3x.ant.design/components/pagination-cn/#API?target=_blank)

### Column
| 属性              | 是否必传 | 类型                              | 默认值 | 说明                 |
|-------------------|----------|-----------------------------------|--------|----------------------|
| fieldName         | 否       | string                            | -      | 字段名               |
| title             | 否       | string                            | -      | header列名           |
| render            | 否       | （text,record,index）=>React.Node | -      | 自定义render         |
| width             | 否       | string   或number                 | 150    | 列宽                 |
| checkboxSelection | 否       | boolean                           | false  | 该列是否显示checkbox |
| sortable          | 否       | boolean                           | true   | 该列是否可排序       |
| filter            | 否       | boolean                           | true   | 该列是否过滤         |
| hide              | 否       | boolean                           | false  | 该列是否隐藏         |
| fixed             | 否       | "left"、"right"、 undefined       | -      | 该列是否固定         |
更多Column 属性 [ag-grid Columns](https://www.ag-grid.com/javascript-grid-column-properties/)
### 注意事项：
 1.树形treeData开启后，grid会自动生成一列，设置该列属性请使用autoGroupColumnDef设置;
