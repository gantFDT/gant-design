export default [
`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


function BasicUse() {
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const formRef = useRef(null)

    const onSubmit = async () => {
        if (!formRef.current) return
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    return <div style={{ margin: 10 }}>
        <SchemaForm
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            uiSchema={initalUiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button size="small" type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


function EditStatusUse() {
    const [allowEdit, setAllowEdit] = useState(true)
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const [state, setState] = useState({})
    const formRef = useRef(null)

    const uiSchema = {
        "form:gutter": 10,
        "field:col": 24,
        "field:labelCol": 24,
        "field:wrapperCol": 24,
        "field:labelAlign": "left"
    }

    const schema = useMemo(() => {
        return {
            type: "object",
            title: "可切换编辑状态的表单",
            required: ["key_1"],
            propertyType: {
                key_1: {
                    title: "普通输入框",
                    type: "string",
                    props: { allowEdit: allowEdit }
                },
                key_2: {
                    title: "数字输入框",
                    type: "number",
                    componentType: "InputNumber",
                    props: { allowEdit: allowEdit }
                },
                key_3: {
                    title: "金额",
                    type: "string",
                    componentType: "InputMoney",
                    props: { allowEdit: allowEdit }
                },
            }
        }
    }, [allowEdit])

    const onChange = (val, vals) => {
        setState(vals)
    }
    const onSubmit = async () => {
        if (!formRef.current) return
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    const titleConfig = {
        "title:extra": (
            <>
                <Switch
                    checkedChildren="可编辑"
                    unCheckedChildren="不可编辑"
                    checked={allowEdit}
                    onChange={(checked) => setAllowEdit(checked)}
                />
                <Radio.Group size='small' onChange={(e) => setEdit(e.target.value)} value={edit}>
                    <Radio.Button value={EditStatus.EDIT}>写状态</Radio.Button>
                    <Radio.Button value={EditStatus.CANCEL}>读状态</Radio.Button>
                </Radio.Group>
            </>
        )
    }
    return <div style={{ margin: 10 }}>
        <SchemaForm
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            data={state}
            uiSchema={uiSchema}
            onChange={onChange}
            titleConfig={titleConfig}
        />
        <div style={{ float: 'right' }}>
            <Button size="small" type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}

ReactDOM.render(<EditStatusUse />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


function SearchUse() {
    const [expand, setExpand] = useState(false)

    const schema = useMemo(() => {
        const count = expand ? 10 : 7
        let propertyType = {}
        for (let i = 1; i < count; i++) {
            propertyType[\`key_\${i}\`] = {
                title: \`field_\${i}\`,
                type: "string",
            }
        }
        return {
            type: "object",
            propertyType
        }
    }, [expand])

    const uiSchema = {
        "form:gutter": 10,
        "field:col": 8,
        "field:labelCol": 24,
        "field:wrapperCol": 24,
        "field:labelAlign": "left"
    }
    const formRef = useRef(null)
    const onSearch = async () => {
        if (!formRef.current) return
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    const onReset = () => {
        if (!formRef.current) return
        formRef.current.resetFields()
    }

    return <div style={{ margin: 10 }}>
        <SchemaForm
            wrappedComponentRef={formRef}
            edit={EditStatus.EDIT}
            schema={schema}
            uiSchema={uiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button size="small" type='primary' onClick={onSearch}>搜索</Button>
            <Button size="small" onClick={onReset} style={{ marginLeft: 5 }}>重置</Button>
            <a style={{ marginLeft: 5 }} onClick={() => { setExpand(expand => !expand) }}>Collapse <Icon type={expand ? 'up' : 'down'} /></a>
        </div>
    </div>
}

ReactDOM.render(<SearchUse />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


const configSchma = {
  type: "object",
  title: "配置普通表单",
  propertyType: {
      "field:col": {
          title: "字段列比例 field:col",
          type: "number",
          componentType: "InputNumber",
          props: {
              min: 0
          }
      },
      "field:labelCol": {
          title: "字段描述列宽比例 field:labelCol",
          type: "number",
          componentType: "InputNumber",
          props: {
              max: 24,
              min: 0
          }
      },
      "field:wrapperCol": {
          title: "字段内容列宽占比 field:wrapperCol",
          type: "number",
          componentType: "InputNumber",
          props: {
              max: 24,
              min: 0
          }
      },
      "field:labelAlign": {
          title: "字段描述文字布局 field:labelAlign",
          type: "string",
          componentType: "Selector",
          props: {
              useStorage: false,
              dataSource: [
                  {
                      label: "左",
                      value: "left"
                  },
                  {
                      label: "右",
                      value: "right"
                  }
              ]
          }
      },
      "form:gutter": {
          title: "表单字段横向间隔 form:gutter ",
          type: "number",
          componentType: "InputNumber",
          props: {
              max: 24,
              min: 0
          }
      },
  }
}
function CustomOptions() {
    const configUI = {
        "form:gutter": 10,
        "field:col": 24,
        "field:labelCol": 24,
        "field:wrapperCol": 24,
        "field:labelAlign": "left"
    }

    const [uiSchema, setUiSchema] = useState(initalUiSchema)

    const data = useMemo(() => {
        const newData = {}
        Object.keys(uiSchema).map(keyname => {
            // const name = keyname.replace('ui:', "")
            newData[keyname] = uiSchema[keyname]
        })
        console.log("newData", newData)
        return newData
    }, [uiSchema])

    const onChange = (val) => {
        const newData = {}
        Object.keys(val).map(keyname => {
            newData[\`\${keyname}\`] = val[keyname]
        })
        setUiSchema(uiSchema => ({ ...uiSchema, ...newData }))
    }
    const Reset = () => setUiSchema(initalUiSchema)
    console.log("data", data)
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <SchemaForm
                        schema={schema}
                        uiSchema={uiSchema}
                    />
                </div>
                <div style={{ width: 250, marginLeft: 10 }}>
                    <SchemaForm schema={configSchma} uiSchema={configUI} data={data} onChange={onChange} />
                </div>
            </div>
            <div style={{ float: 'right' }}><Button size="small" onClick={Reset}>重置UI</Button></div>
        </div>
    )
}

ReactDOM.render(<configSchma />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


function GridLayout() {
    const uiSchema = {
        "form:gutter": 10,
        "field:col": {
            xxl: 6,
            xl: 8,
            lg: 8,
            md: 12,
            sm: 24,
            xs: 24,
        },
        "field:labelCol": {
            span: 6,
            sm: 6,
            xs: 24
        },
        "field:wrapperCol": {
            span: 18,
            sm: 18,
            xs: 24
        },
        "field:labelAlign": "left"

    }
    return <div style={{ margin: 10 }} >
        <SchemaForm uiSchema={uiSchema} schema={schema} />
    </div>
}

ReactDOM.render(<GridLayout />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


const bindDataSchema = {
  type: "object",
  title: "支持双向绑定的表单",
  propertyType: {
      key_1: {
          title: "普通输入框_1",
          type: "string",
      },
      key_2: {
          title: "普通输入框_2",
          type: "string",
      },
  }
}
function BindData() {
    const [data, setData] = useState({ key_1: '1', key_2: '2' })
    const formRef = useRef(null)

    const onChange = (val, vals) => {
        setData(vals)
    }

    return <div style={{ margin: 10 }} >
        <div style={{ display: 'flex' }}>
            <div style={{ width: 300 }}>
                <p>key_1：<span>{data.key_1}</span></p>
                <p>key_2：<span>{data.key_2}</span></p>
            </div>
            <div style={{ flex: 1 }}>
                <SchemaForm
                    wrappedComponentRef={formRef}
                    uiSchema={initalUiSchema}
                    data={data}
                    onChange={onChange}
                    schema={bindDataSchema}
                />
            </div>
        </div>
    </div>
}

ReactDOM.render(<bindDataSchema />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


function DependenceData() {
    const dependenceSchema = {
        type: "object",
        title: "依赖关系",
        propertyType: {
            "key_1": {
                title: "姓氏",
                type: "string",
                dependencies: ["key_2"],
                onDependenciesChange: ([key_2], itemSchema, form) => {
                    return {
                        ...itemSchema,
                        options: {
                            rules: [
                                {
                                    max: key_2,
                                    message: "姓氏不能超过" + key_2 + "!"
                                }
                            ]
                        }
                    }
                }
            },
            "key_2": {
                title: "字数限制",
                type: "number",
                componentType: "InputNumber",

            },
        }
    }
    return <div style={{ margin: 10 }}>
        <SchemaForm
            uiSchema={initalUiSchema}
            schema={dependenceSchema}
        />
    </div>
}

ReactDOM.render(<DependenceData />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


const customCmpSchema = {
  type: "object",
  title: "扩展自定义组件",
  propertyType: {
      key_1: {
          title: "普通输入框_1",
          type: "string",
      },
      key_2: {
          title: "自定义组件",
          type: "string",
          componentType: 'CustomComponent'
      },
  }
}
function CustomCmp() {
    return <div style={{ margin: 10 }}>
        <SchemaForm
            uiSchema={initalUiSchema}
            schema={customCmpSchema}
            customFields={[{
                type: "CustomComponent",
                component: Rate
            }]}
        />
    </div>
}

ReactDOM.render(<customCmpSchema />, mountNode)`,`
import React, { useState, useMemo, useRef } from 'react'
import { Button, Radio, Rate, Switch, Icon } from 'antd'
import { EditStatus, SchemaForm } from 'gantd'
const initalUiSchema = {
    "form:gutter": 10,
    "field:col": 24,
    "field:labelCol": 24,
    "field:wrapperCol": 24,
    "field:labelAlign": "left"
}
const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_2: {
          title: "数字输入框",
          type: "number",
          componentType: "InputNumber"
      },
      key_3: {
          title: "金额",
          type: "string",
          componentType: "InputMoney"
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_6: {
          title: "语言",
          type: "string",
          componentType: "InputLanguage"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}


const nestSchema = {
  title: "嵌套表单—— parent",
  type: "object",
  propertyType: {
      input: {
          title: "input 组件",
          type: "string"
      },
      inputNumber: {
          title: "inputNumber 组件",
          type: "number",
          componentType: "InputNumber"
      },
      children: {
          type: "object",
          title: "嵌套表单—— children",
          propertyType: {
              inputMoney: {
                  title: "InputMoney 组件",
                  type: "string",
                  componentType: "InputMoney"
              },
              url: {
                  title: "Url 组件",
                  type: "string",
                  componentType: "Url"
              },
              grandson: {
                  type: "object",
                  title: "嵌套表单—— grandson",
                  propertyType: {
                      telePhone: {
                          title: "TelePhone 组件",
                          type: "string",
                          componentType: "InputNumber"
                      },
                      datePicker: {
                          title: "DatePicker 组件",
                          type: "date",
                          componentType: "DatePicker"
                      }
                  }
              }

          }
      }
  }
}
function NestUse() {
    const uiSchema = {
        "form:gutter": 10,
        "field:col": 24,
        "field:labelCol": 24,
        "field:wrapperCol": 24,
        "field:labelAlign": "left"
    }
    return <div style={{ margin: 10 }} >
        <SchemaForm uiSchema={uiSchema} schema={nestSchema} />
    </div>
}

ReactDOM.render(<nestSchema />, mountNode)`,]