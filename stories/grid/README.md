# 甘棠软件 React - Gantd - Table-Grid

## Grid API

| 属性                    | 是否必传 | 类型                         | 默认值 | 说明                                                    |
|-------------------------|----------|------------------------------|--------|---------------------------------------------------------|
| columns                 | 是       | Column[]                     | []     |                                                         |
| dataSource              | 否       | any[]                        | []     | 数据源                                                  |
| rowkey                  | 是       | string 或 (data:any)=>string | -      | 唯一标示                                                |
| rowSelection            | 否       | boolean 或 RowSelection      | false  | selection配置                                           |
| pagination              | 否       | Pagination                   | -      | Pagination配置                                          |
| onReady                 | 否       | (params,dataManage)=>void    | -      | gird初始完成回调 传递grid的params和控制数据的dataManage，参考manager API |
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
| onCellChange    | 否       | (val,recrod, list)=>void | -      | 单元格变化时的响应函数，用于修改同行其他列数据，或者修改其他行数据 |

### manager API

**manager对象用于提供对于编辑情况下的数据操作**

#### 如何获得

```js
<Grid onReady={(param, manager)=> { /**保存manager */ }} />
```

一般而言，再一个组件生命周期内，manager不会改变

#### 常用方法及属性

1、新增

```js
manager.create(item, index)
manager.create(item, sibiling, index)
manager.create(item, parent, index, append)
```

sibiling、parent是通过gridApi调用getSelectedNodes方法得到的节点

**需要注意的是新增的数据item中也需要有rowkey所指向的字段**

e.g

```js
rowkey=id
item={id: "asdihdsfp", name: "tom"}
```

2、删除

**删除功能用于删除当前选中的节点**

- 基础用法

```js
manager.delete()
```

- 异步删除

delete方法接收一个删除的回调方法，该方法会获得选中的节点数据

delete方法根据这个回调方法的返回值来确定行为

返回值可以是一个*布尔值*或者是一个*Promise<boolean>*，用于表示删除是否执行。

```js
manager.delete((selected)=> false)

manager.delete((selected)=>new Promise(res => {
        message.info("0.5s后删除")
        setTimeout(() => {
            res(true)
        }, 500)
    }))
```

- 返回值

delete方法返回一个Promise，可以在此获得是否删除成功的信息，用于部分场景下的反馈

*promise.resolved*表示操作成功

*promise.rejected*表示操作失败

```js
manager.delete().then(()=>{
    /**操作成功 */
},()=>{
    /**操作失败 */
}).catch(()=>{
    /**操作失败 */
})
```

- 其他参数 - options

| 属性 | 是否必传 | 类型  | 默认值 | 说明 |
|:-:|:-:|:-:|:-:|:-:|
|showLine| 否 | boolean | true | 是否显示删除线
|removeChildren| 否 | boolean | true | 是否删除子节点

manager.delete(false, options)

```js
options:{
    showLine: true ,
    removeChildren: true
}
```

**需要注意的是**，在removeChildren为false的条件下，如果选中某个节点而其子节点没有被选中的话，会导致删除操作失败

3、保存

保存操作，可以获得当前列表数据和调整的所有数据

```js
const { list, diff } = manager.save()
```

4、遍历

遍历当前状态下的所有行数据、用于修改行数据

接受一个回调函数作为参数、不需要返回值

e.g

```js
manager.mapNodes((row)=>{
    row.age = row.age + 1
})
```

5、其他API

| 属性 | 类型 | 说明 |
|:-:|:-:|:-:|
|isChanged|boolean| 表格数据是否有变化
|undo|function|回退|
|redo|function|重做|
|cancel|function|取消编辑|
|reset|function|重做操作，删除前面所有操作的历史记录，回到最初状态|

**cancel、save方法需要在业务层手动修改editable来禁止编辑**



### 注意事项：
<<<<<<< HEAD
 1.rowkey必须设置，否则会影响很多功能！！！;
 2.树形treeData开启后，grid会自动生成一列，设置该列属性请使用autoGroupColumnDef设置;
 3.异步treeData,ag-grid可以为异步树形设置一个独立与nodeId的groupKey;这是将会影响内部获取唯一id的方式，建议不要设置 getServerSideGroupKey;
=======

 1.rowkey必须设置，否则会影响很多功能！！！

 2.树形treeData开启后，grid会自动生成一列，设置该列属性请使用autoGroupColumnDef设置;

 3.异步treeData,ag-grid可以为异步树形设置一个独立与nodeId的groupKey;这是将会影响内部获取唯一id的方式，建议不要设置 getServerSideGroupKey
>>>>>>> faf9a3b2c53317321d960d2d8fd4ab6404a31ecb
