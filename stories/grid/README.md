# Table-表格组件

# 甘棠软件 React - Gantd - Table-Grid


## API

| 属性 | 是否必传 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
|columns|是|
|filter|否|boolean|false|是否启用列的过滤功能|
|headerProps|否|object|undefined|用于显示Header的props|
|editActions|否|function|undefined|编辑时的回调用于显示操作按钮
    dataSource: T[],
    onReady: OnReady,
    defaultColumnWidth?: React.ReactText,
    rowSelection: RowSelection