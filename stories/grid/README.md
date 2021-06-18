## API

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| columns | 是 | Column[] | [] |  |
| dataSource | 否 | any[] | [] | 数据源 |
| rowkey | 是 | string 或 (data:any)=>string | - | 唯一标示 |
| rowSelection | 否 | boolean 或 RowSelection | false | selection 配置 |
| pagination | 否 | Pagination | - | Pagination 配置 |
| onReady | 否 | (params,dataManage)=>void | - | gird 初始完成回调 传递 grid 的 params 和控制数据的 dataManage，参考 manager API |
| editable | 否 | boolean | false | 是否进入编辑状态 |
| groupSuppressAutoColumn | 否 | boolean | false | 是否禁止开启自动生成 group 列 |
| isServerSideGroup | 否 | (data:any)=>boolean | null | 判断是否是子节点 |
| serverGroupExpend | 否 | (params,cb)=>void | - | 异步 tree 当加载异步 children 时调用 |
| treeDataChildrenName | 否 | string | "children" | 树形数据打平计算的 children 数据字段名称 |
| treeData | 否 | boolean | false | 是否开启树形渲染模式 |
| serialNumber | 否 | boolean | false | 添加序号列 序号要与 gantGroupCellRenderer 联用 |
| isCompute | 否 | boolean | true | treeData 为 true 情况下 是否要需要转换为平行数据并在数据中添加 treeDataPath 字段 |
| onCellEditChange | 否 | （newData,filedName,newValue,oldValue）=>record / record[] | - | 在结束编辑时调用，返回需要修改的数据 |
| onCellEditingChange | 否 | （newData,filedName,newValue,oldValue）=>record / record[] | - | 在编辑过程中时调用，返回需要修改的数据 |
| getDataPath | 否 | (data:any)=>array | (data)=>data.treeDataPath | treeData 下判断树形结构路径 ，默认根据数据中的 treeDataPath 字段判断，若数据中没该字段需自己添加获取路径方法 |
| openEditSign | 否 | boolean | false | 是否在 grid header 添加编辑标示 |
| loading | 否 | boolean | false | grid loading 状态 |
| className | 否 | string | - | className |
| filter | 否 | boolean | false | 默认单列过滤 |
| resizable | 否 | boolean | true | 默认单列伸缩 |
| sortable | 否 | boolean | true | 默认单列排序 |
| width | 否 | string 或 number | "100%" | grid 宽度 |
| height | 否 | string 或 number | 400 | grid 宽度 |
| hideMenuItemExport | 否 | boolean | false | 隐藏右键导出 |
| hideMenuItemExpand | 否 | boolean | false | 隐藏右键展开 |
| hideSelectedBox | 否 | boolean | false | 隐藏 selectedBox|


更多属性参考 [ag-grid](https://www.ag-grid.com/documentation-main/documentation.php)

### RowSelection

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| type | 否 | "single"或"multiple" | "multiple" | selection 类型 |
| checkboxIndex | 否 | number | - | checkbox 出现在哪列 |
| selectedKeys | 否 | string[] | - | 双向绑定选择 keys |
| onSelect | 否 | (keys,rows)=>void | - | selection change 变化回调 |
| showDefalutCheckbox | 否 | boolean | true | 开启默认 selection 列 |
| defaultSelectionCol | 否 | ColDef | - | 默认 selection 列配置 |
| rowMultiSelectWithClick | 否 | boolean | true | 是否允许单击选择多个行 |
| rowDeselection | 否 | boolean | true | 是否可在按住 Ctrl 键并单击该行的情况下取消选择行 |

### Pagination

| 属性       | 是否必传 | 类型   | 默认值 | 说明         |
| ---------- | -------- | ------ | ------ | ------------ |
| beginIndex | 否       | number | 0      | 开始分页位置 |

其他属性参考 [antd-Pagination](https://3x.ant.design/components/pagination-cn/#API?target=_blank)

### Column

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| fieldName | 否 | string | - | 字段名 |
| title | 否 | string | - | header 列名 |
| render | 否 | （text,record,index，params）=>React.Node | - | 自定义 render |
| editConfig | 否 | EditConfig | - | 行内编辑配置 |
| width | 否 | string 或 number | 150 | 列宽 |
| checkboxSelection | 否 | boolean | false | 该列是否显示 checkbox |
| sortable | 否 | boolean | true | 该列是否可排序 |
| filter | 否 | boolean | true | 该列是否过滤 |
| hide | 否 | boolean | false | 该列是否隐藏 |
| fixed | 否 | "left"、"right"、 undefined | - | 该列是否固定 |

更多 Column 属性 [ag-grid Columns](https://www.ag-grid.com/javascript-grid-column-properties/)

### EditConfig

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| component | 是 | Compoent | - | 数据单元组件 |
| editable | 是 | boolean 或(data)=>boolean | false | 单元格是否能编辑 |
| props | 否 | any | - | 传递数据单元组件属性 |
| changeFormatter | 否 | (val,recrod)=>val | - | 单元格 onChange 时调用 必须要返回一个数作为该单元的值 |
| rules | 否 | Rules | - | 验证机制请参考   [https://ant.design/components/form-cn/#Rule](https://ant.design/components/form-cn/#Rule) |
| refName | 否 | string | "warpperRef" | 设置 ref 字段 key 名 (Antd ref) |
| valuePropName | 否 | string | "value" | 设置 value 字段 key 名 （Switch: checked） |
**rules 如何验证**

```js
// 用法一
const columns=[{
            fieldName: 'typeCode',
            title: "产品类型编码",
            width: 300,
            editConfig: {
                component: Input,
                editable: true,
                rules: {
                  required:true,
                  type:"string",
                }
            },
        },]

// 用法二
  const columns=[{
            fieldName: 'typeCode',
            title: "产品类型编码",
            width: 300,
            editConfig: {
                component: Input,
                editable: true,
                rules: [
                    {
                        required: true,
                        message: "产品类型编码必填"
                    },
                    {
                        max: 2,
                        min: 1,
                        message: "产品类型编码范围2-10"
                    },
                ]
            },
        },]
```

### manager API

**manager 对象用于提供对于编辑情况下的数据操作**

#### 如何获得

```js
<Grid
  onReady={(param, manager) => {
    /**保存manager */
  }}
/>
```

一般而言，再一个组件生命周期内，manager 不会改变

#### 常用方法及属性

1、新增

```js
// 根节点上新增数据
manager.create(item);

// 在某个节点上面新增数据;
manager.create(item, id);

// 在某个节点下面新增数据;
manager.create(item, id, false);

//  根节点上新增多个数据
manager.create([item1, item2]);

// 在某个节点上面新增多个数据;
manager.create([item1, item2], id);

// 在多个节点上面新增多个数据;
manager.create([[item1, item2], [[item1, item2]]], [id, id2]); // 在多个节点上面新增多个数据;
```

**需要注意的是新增的数据 item 中也需要有 rowkey 所指向的字段**

**新增树形数据时注意路径**

2、删除

**删除功能用于删除指定节点**

```js
manager.remove(id|id[]);
```

3、标记删除

**标记删除功能用于标记删除指定节点**

```js
manager.tagRemove(id|id[]);
```

4、修改

**修改功能用于修改指定节点**

```js
manager.modify(item|item[]);
```

5、保存

保存操作，可以获得当前列表数据和调整的所有数据 1.基本使用

```js
manager.save()
manager.save(()=>true｜false)
manager.save(async ()=>true｜false)
```
6、验证

验证可验证diff数据或自定定义数据； 返回一个promise 

```js
manager.validate()

manager.validate(data)
```
验证不通过时，返回一个errors对象 key代表gird该数据对应的序号，value则是错误数组；

```js
 {0:[{field: "typeCode", message: "产品类型编码必填"}]}
```
7、其他 API

|    属性     |   类型   |                        说明                        |
| :---------: | :------: | :------------------------------------------------: |
|  isChanged  | boolean  |                 表格数据是否有变化                 |
|    undo     | function |                        回退                        |
|    redo     | function |                        重做                        |
|   cancel    | function |                      取消编辑                      |
|    reset    | function | 重做操作，删除前面所有操作的历史记录，回到最初状态 |
|    diff     |  object  |                   获取 diff 数据                   |
| getRowData  | function |            获取 grid 最新数据带有脏标示            |
| getPureData | function |                获取最新数据纯净数据                |

**cancel、save 方法需要在业务层手动修改 editable 来禁止编辑**

### 注意事项：

1.rowkey 必须设置，否则会影响很多功能，如果 rowkey 对应字段不能为 number！！！

2.树形 treeData 开启后，grid 会自动生成一列，设置该列属性请使用 autoGroupColumnDef 设置;

3.异步 treeData,ag-grid 可以为异步树形设置一个独立与 nodeId 的 groupKey;这是将会影响内部获取唯一 id 的方式，建议不要设置 getServerSideGroupKey

其他 API 请参阅<a href="https://www.ag-grid.com/react-grid" target="_blank">ag-grid 官网</a>
