## API

FormSchema - 属性如下

| 属性           | 说明                                                | 类型                | 默认值          |
| -------------- | --------------------------------------------------- | ------------------- | --------------- |
| schema         | 当前最大堆叠等级                                    | object              | {}              |
| uiSchema       | 带有继承性，可直接赋予父级，也可指定单独filed或form | object              | {}              |
| headerConfig   | 带有继承性，可直接赋予父级，也可指定单独filed或form | object              | {}              |
| className      | 添加class名称                                       | string              |                 |
| data           | 按照schema结构赋值                                  | object              | {}              |
| edit           | 带有继承性，可直接赋予父级，也可指定单独filed或form | EditStatus          | EditStatus.EDIT |
| customFileds   | 自定义组件                                          | array               | []              |
| onChange       | form值改变是调用                                    | (values)=>void      | ()=>{}          |
| onSave         | 在EditStatus.CANCEL状态下编辑单个field触发          | (id,value,cb)=>void | ()=>{}          |
| onSchemaChange | 当依赖项改变，更新schema时的回调                    | (schema)=>void      | ()=>{}          |

uiSchema - 属性如下

| 属性               | 说明                       | 类型           | 默认值 |
| ------------------ | -------------------------- | -------------- | ------ |
| ui:orders          | 字段排序，仅对form结构生效 | object         | {}     |
| ui:col             | form中field布局方式        | ColProps       | 24     |
| ui:labelCol        | field中Label布局方式       | ColProps       | 24     |
| ui:wrapperCol      | field中Component布局方式   | ColProps       | 24     |
| ui:padding         | form的padding值            | number         | 10     |
| ui:gutter          | Form中filed之间的间隙      | RowProps       | 10     |
| ui:labelAlign      | label对齐方式              | 'left'/'right' | 'left' |
| ui:backgroundColor | 背景颜色                   | colorString    | '#fff' |

## 注意

## FAQ