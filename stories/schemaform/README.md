## API

SchemaForm

| 属性           | 说明                                                | 类型                | 默认值          |
| -------------- | --------------------------------------------------- | ------------------- | --------------- |
| schema         | 表单结构匹配单，必填                                | Schema              | {}              |
| uiSchema       | 带有继承性，可直接赋予父级，也可指定单独filed或form | UiSchema            | {}              |
| titleConfig    | 带有继承性，可直接赋予父级，也可指定单独filed或form | TitleConfig         | {}              |
| className      | 添加class名称                                       | string              |                 |
| data           | 按照schema结构赋值                                  | object              | {}              |
| edit           | 带有继承性，可直接赋予父级，也可指定单独filed或form | EditStatus          | EditStatus.EDIT |
| customFields   | 自定义组件                                          | array               | []              |
| onChange       | form值改变是调用                                    | (values)=>void      | ()=>{}          |
| onSave         | 在EditStatus.CANCEL状态下编辑单个field触发          | (id,value,cb)=>void | ()=>{}          |
| onSchemaChange | 当依赖项改变，更新schema时的回调                    | (schema)=>void      | ()=>{}          |

Schema

| 属性                 | 说明                                                           | 类型                       | 默认值       |
| -------------------- | -------------------------------------------------------------- | -------------------------- | ------------ |
| title                | 标题,form或field名称                                           | string                     |              |
| type                 | 结构类型，对应该会值的类型，**必填**                           | object                     | string/Types |
| componentType        | 组件类型，默认为Input组件                                      | ComponentType              | Input        |
| required             | 对于form此值为string[]，对于field值为boolean                   | boolean/array              |              |
| propertyType         | 该对应的属性字段分别对应一个schema结构                         | object                     |              |
| items                | 该对应的属性字段分别对应一个schema结构                         | object                     |              |
| options              | field-form效验规则文档                                         | object                     |              |
| props                | field属性上的值                                                | any                        |
| denpendencies        | 依赖项，当依赖项发生改变的时候，会触发onDependenciesChange回调 | string[]                   |              |
| onDependenciesChange | 依赖项，当依赖项发生改变的时候，会触发onDependenciesChange回调 | (value, props, form)=>void |              |


UiSchema

| 属性               | 说明                                      | 类型           | 默认值 |
| ------------------ | ----------------------------------------- | -------------- | ------ |
| form:orders        | 字段排序，仅对form结构生效                | string[]         | []     |
| form:gutter        | Form中filed之间的间隙                     | RowProps       | 10     |
| form:style         | Form style样式                            | CSS            | {padding:0}     |
| form:className     | Form className                            | string         | ''     |
| field:col          | form中field布局方式                       | ColProps       | 24     |
| field:labelCol     | field中Label布局方式                      | ColProps       | 24     |
| field:wrapperCol   | field中Component布局方式                  | ColProps       | 24     |
| field:labelAlign   | label对齐方式                             | 'left'/'right' | 'left' |
| field:style        | field style样式                            | CSS            |      |
| field:className    | field className                            | string         | '     |


TitleConfig  

对应属性说明请参考Header-g

ComponentType

| 属性        | 说明         | 属性             | 说明           |
| ----------- | ------------ | ---------------- | -------------- |
| Input       | 普通输入框   | ColorPicker      | 颜色选择器     |
| Password    | 密码输入框   | Selector         | 普通选择器     |
| InputNumber | 数字输入框   | IconSelector     | 图标选择器     |
| InputMoney  | 金额输入框   | LocationSelector | 地址选择器     |
| Url         | 链接输入框   | Switch           | 开关           |
| Email       | 邮箱输入框   | Checkbox         | 勾选框         |
| Language    | 多语言输入框 | CheckboxGroup    | 勾选框组       |
| CellPhone   | 手机号输入框 | Radio            | 单选           |
| TelePhone   | 电话输入框   | RadioGroup       | 单选组         |
| TextArea    | 多行输入框   | AutoComplete     | 自动完成       |
| DatePicker  | 日期选择器   | RangePicker      | 日期区间选择器 |
 
## 注意

## FAQ
#### 1.schema中type有多少种类型,分别代表的意义？
答：type总共6种类型：“object”、“array”、“number”、“string”、“bool”、“date”；对于SchemaForm来说，其type的类型能决定当前字段渲染结构，例如 object渲染Form，其他则渲染Field。

#### 2.理解继承关系（uiSchema、headerConfig、edit）？
答：在SchemaForm属性中uiSchema、headerConfig、edit具有继承功能，如果没有指定该字段的其属性，则继承父级属性，父级若没有则继承父级的父级，以此类推。

列如：

```ts
const schema={
  title:"父级form",
  type:"object",
  propertyType:{
      class:{
        title:"class"
     },
    childrenForm:{
       name:{
        title:"name",
       },
      age:{
        title:"age",
        componentType:"InputNumber"
       }
    }
  }
}

const uiSchema={
  "ui:col":8,
  childrenForm:{
    "ui:col":12,
    name:{
    "ui:col":24
    }
  }
}
```
在上述结构中最终呈现的表现是：calss继承schema的“ui:col”为8，age继承childrenForm的“ui:col”为12，name自身“ui:col”为24。

#### 3.如何隐藏指定Field？
答：设置其“ui-col”为0即可。

#### 4.如何正确的实现绑定数据？
1).双向绑定
答：双向绑定的方式：利用onChange和data 业务层通过onChange可以获取到修改后的form值然再赋予formshemea的data；data改变的不仅仅是当前form的也会改变form的初始值即使用resetFields方法也不能还原到最开始的数据；
2).如何做到双向绑定，但不影响的初始状态；
答；利用setFieldsValue和onChange业务层实现双向绑定；
双向绑定是业务层中最常规的操作方式，正确利用SchemaForm暴露的方法才能保证不造成内存泄漏；达到最优化。

#### 5.如何拓展自定义组件？
针对不同项目可能出现不同或特定的field组件时，这就需要我们拓展SchemaForm。

###### 使用customFields
具体用法请查看示例(扩展自定义字段)。