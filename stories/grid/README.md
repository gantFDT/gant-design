# Table-表格组件

# 甘棠软件 React - Gantd - Table-Grid


## Grid API

| 属性                    | 是否必传 | 类型                         | 默认值 | 说明                                                    |
|-------------------------|----------|------------------------------|--------|---------------------------------------------------------|
| columns                 | 是       | Column[]                     | []     |                                                         |
| dataSource              | 否       | any[]                        | []     | 数据源                                                  |
| rowkey                  | 是       | string 或 (data:any)=>string | -      | 唯一标示                                                |
| rowSelection            | 否       | boolean 或 RowSelection      | false  | selection配置                                           |
| pagination              | 否       | Pagination                   | -      | Pagination配置                                          |
| onReady                 | 否       | (params,dataManage)=>void    | -      | gird初始完成回调 传递grid的params和控制数据的dataManage |
| editable                | 否       | boolean                      | false  | 是否进入编辑状态                                        |
| groupSuppressAutoColumn | 否       | boolean                      | false  | 是否禁止开启自动生成group列                             |
| serverGroupExpend       | 否       | (params,cb)=>void            | -      | 异步tree当加载异步children时调用                        |
| treeData                | 否       | boolean                      | false  | 是否开启树形渲染模式                                    |
| isServer                | 否       | boolean                      | false  | 是否开启树异步形渲染模式                                |
| loading                 | 否       | boolean                      | false  | grid loading状态                                        |
| className               | 否       | string                       | -      | className                                               |
| filter                  | 否       | boolean                      | false  | 默认单列过滤                                            |
| resizable               | 否       | boolean                      | true   | 默认单列伸缩                                            |
| sortable                | 否       | boolean                      | true   | 默认单列排序                                            |
| width                   | 否       | string 或 number             | "100%" | grid 宽度                                               |
| height                  | 否       | string 或 number             | 400    | grid 宽度                                               |
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
| editConfig        | 否       | EditConfig                        | -      | 行内编辑配置         |
| width             | 否       | string   或number                 | 150    | 列宽                 |
| checkboxSelection | 否       | boolean                           | false  | 该列是否显示checkbox |
| sortable          | 否       | boolean                           | true   | 该列是否可排序       |
| filter            | 否       | boolean                           | true   | 该列是否过滤         |
| hide              | 否       | boolean                           | false  | 该列是否隐藏         |
| fixed             | 否       | "left"、"right"、 undefined       | -      | 该列是否固定         |

更多Column 属性 [ag-grid Columns](https://www.ag-grid.com/javascript-grid-column-properties/)

### EditConfig
| 属性            | 是否必传 | 类型                     | 默认值 | 说明                                                |
|-----------------|----------|--------------------------|--------|-----------------------------------------------------|
| component       | 是       | Compoent                 | -      | 数据单元组件                                        |
| editable        | 是       | boolean或(data)=>boolean | false  | 单元格是否能编辑                                    |
| props           | 否       | any                      | -      | 传递数据单元组件属性                                |
| changeFormatter | 否       | (val,recrod)=>val        | -      | 单元格onChange时调用 必须要返回一个数作为该单元的值 |


### 注意事项：
 1.rowkey必须设置，否则会影响很多功能！！！
 2.树形treeData开启后，grid会自动生成一列，设置该列属性请使用autoGroupColumnDef设置;
 3.异步treeData,ag-grid可以为异步树形设置一个独立与nodeId的groupKey;这是将会影响内部获取唯一id的方式，建议不要设置 getServerSideGroupKey
