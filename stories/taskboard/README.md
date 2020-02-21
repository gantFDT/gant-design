
##如何使用

指定面板的数据源 dataSource 为一个包含标题、唯一标识、与子集内容的数组。

```jsx
const dataSource = [
    {
        title: '卡片1',
        id: 'col1',
        children: [
            {
                name: 'task-1',
                id: '1',
            }, {
                name: 'task-2',
                id: '2',
            }
        ]
    }, {
        title: '卡片2',
        id: 'col2',
        children: []
    },
];

<TaskBoard dataSource={dataSource}  />;

```
## API

常规属性如下

| 属性             | 说明                             | 类型                       | 默认值                                                    |
| ---------------- | -------------------------------- | -------------------------- | --------------------------------------------------------- |
| dataSource       | 数据数组，必填                   | array                      | []                                                        |
| className        | taskboard类名                    | string                     | ' '                                                       |
| idKey            | 数据标识字段Key                  | string                     | 'id'                                                      |
| titleKey         | column标题字段Key                | string                     | 'title'                                                   |
| childrenKey      | tasks集合字段Key                 | string                     | 'name'                                                    |
| taskNameKey      | task名称字段Key                  | string                     | 'id'                                                      |
| hideQuickAdd     | 是否隐藏快速新增按钮             | boolean                    | `false`                                                   |
| handleAddBtn     | 点击快速新增按钮的函数回调       | (task) => void             | -                                                         |
| hightLightWords  | task高亮关键字                   | string                     | ' '                                                       |
| highlightTasksBy | 自定义task高亮筛选函数           | (keywords, task) => void   | (keywords,task)=> task[taskNameKey].indexOf(keywords) < 0 |
| renderHeader     | 自定义column头部渲染函数         | (column) => ReactNode      | -                                                         |
| renderExtra      | 自定义column右侧额外栏目渲染函数 | (column) => ReactNode      | -                                                         |
| renderItem       | 自定义task内容渲染函数           | (task,column) => ReactNode | -                                                         |

拖拽属性如下

| 属性                 | 说明                             | 类型             | 默认值  |
| -------------------- | -------------------------------- | ---------------- | ------- |
| isColumnDragDisabled | column拖拽禁用                   | boolean          | `false` |
| isColumnDropDisabled | column放置禁用                   | boolean          | `false` |
| isTaskDragDisabled   | task拖拽禁用                     | boolean          | `false` |
| isTaskDropDisabled   | task放置禁用                     | boolean          | `false` |
| onBeforeDragStart    | 拖拽开始的函数回调               | (result) => void | -       |
| onDragStart          | 开始拖拽的函数回调               | (result) => void | -       |
| onDragUpdate         | 拖拽位置发生更新变化时的函数回调 | (result) => void | -       |
| onDragEnd            | 拖拽结束的回调函数               | (result) => void | -       |
