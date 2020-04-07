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

### RowSelection

| 属性             | 是否必传 | 类型                         | 默认值 | 说明                       |
|------------------|----------|------------------------------|--------|----------------------------|
| columns          | 是       | Column[]                     | []     |                            |
| dataSource       | 否       | any[]                        | []     | 数据源                     |