const code1 = `
import React, { useState, useRef } from 'react'
import { Button } from 'antd'
import { FormSchema, EditStatus } from 'gantd'

const schema = {
    type: "object",
    title: "普通表单",
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
            componentType: "Url"
        },
        key_5: {
            title: "邮箱",
            type: "string",
            componentType: "Email"
        },
        key_6: {
            title: "语言",
            type: "string",
            componentType: "Language"
        },
        key_7: {
            title: "手机号",
            type: "string",
            componentType: "CellPhone"
        },
    }
}

const uiSchema = {
    "ui:col": 24,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "#fff"
}

function BasicUse() {
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const formRef = useRef(null)

    const onSubmit = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    return <div style={{ margin: 10 }}>
        <FormSchema
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            uiSchema={uiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}

ReactDOM.render(<BasicUse/>,mountNode)
 `

const code2 = `
import React, { useState, useRef } from 'react'
import { Button, Radio } from 'antd'
import { FormSchema, EditStatus } from 'gantd'

const schema = {
    type: "object",
    title: "可切换编辑状态的表单",
    required: ["key_1"],
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
    }
}

const initalUiSchema = {
    "ui:col": 24,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "#fff"
}

function EditStatusUse() {
    const uiSchema = {
        "ui:col": 24,
        "ui:gutter": 10,
        "ui:labelCol": 4,
        "ui:wrapperCol": 20,
    }
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const [state, setState] = useState({})
    const formRef = useRef(null)
    const onChange2 = (val, vals) => {
        setState(vals)
    }
    const onSubmit = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    const titleConfig = {
        "title:extra": (
            <Radio.Group size='small' onChange={(e) => setEdit(e.target.value)} value={edit}>
                <Radio.Button value={EditStatus.EDIT}>写</Radio.Button>
                <Radio.Button value={EditStatus.CANCEL}>读</Radio.Button>
            </Radio.Group>
        )
    }
    return <div style={{ margin: 10 }}>
        <FormSchema
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            data={state}
            uiSchema={uiSchema}
            onChange={onChange2}
            titleConfig={titleConfig}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}

ReactDOM.render(<EditStatusUse/>,mountNode)
 `

const code3 = `
import React, { useState, useRef } from 'react'
import { Button } from 'antd'
import { FormSchema, EditStatus } from 'gantd'

const schema = {
    type: "object",
    title: "带操作符的高级搜索",
    required: ["key_1"],
    propertyType: {
        key_1: {
            title: "名字",
            type: "string",
            operator: 'LIKE'
        },
        key_2: {
            title: "年纪",
            type: "string",
            componentType: "InputNumber",
            operator: 'LT_EQ'
        },
        key_3: {
            title: "成绩",
            type: "string",
            componentType: "InputNumber",
            operator: 'GT'
        },
    }
}

const uiSchema = {
    "ui:col": 8,
    "ui:gutter": 10,
    "ui:labelCol": 8,
    "ui:wrapperCol": 16,
}

function OperatorUse() {
    const formRef = useRef(null)

    const onSearch = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    const onReset = () => {
        if (!formRef.current) return;
        formRef.current.resetFields()
    }

    return <div style={{ margin: 10 }}>
        <FormSchema
            wrappedComponentRef={formRef}
            edit={EditStatus.EDIT}
            schema={operateSchema}
            uiSchema={uiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSearch}>搜索</Button>
            <Button onClick={onReset} style={{ marginLeft: 5 }}>重置</Button>
        </div>
    </div>
}

ReactDOM.render(<OperatorUse/>,mountNode)
 `

 const code4 = `
 import React, { useState,useMemo, useRef } from 'react'
 import { FormSchema } from 'gantd'
 
 const schema = {
    type: "object",
    title: "普通表单",
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
            componentType: "Url"
        },
        key_5: {
            title: "邮箱",
            type: "string",
            componentType: "Email"
        },
        key_6: {
            title: "语言",
            type: "string",
            componentType: "Language"
        },
        key_7: {
            title: "手机号",
            type: "string",
            componentType: "CellPhone"
        },
    }
 }

 const configSchema={
    type: "object",
    title: "配置普通表单",
    propertyType: {
        "col": {
            title: "col",
            type: "number",
            componentType: "InputNumber",
            props: {
                max: 24,
                min: 0
            }
        },
        "gutter": {
            title: "gutter",
            type: "number",
            componentType: "InputNumber",
            props: {
                min: 0
            }
        },
        "labelCol": {
            title: "labelCol",
            type: "number",
            componentType: "InputNumber",
            props: {
                max: 24,
                min: 0
            }
        },
        "wrapperCol": {
            title: "wrapperCol",
            type: "number",
            componentType: "InputNumber",
            props: {
                max: 24,
                min: 0
            }
        },
        "labelAlign": {
            title: "labelAlign",
            type: "string",
            componentType: "Selector",
            props: {
                defaultList: [
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
        "padding": {
            title: "padding",
            type: 'string',
            componentType: "InputNumber",
        },
        "backgroundColor": {
            title: "backgroundColor",
            type: "string",
            componentType: "ColorPicker",
        }
    }
 }
 
 function CustomOptions() {
    const configUI = {
        "ui:labelCol": 6,
        "ui:wrapperCol": 18,
        backgroundColor: {
            "ui:labelCol": 24,
            "ui:wrapperCol": 24,
        }
    }

    const [uiSchema, setUiSchema] = useState(initalUiSchema)

    const data = useMemo(() => {
        const newData = {}
        Object.keys(uiSchema).map(keyname => {
            const name = keyname.replace('ui:', "");
            newData[name] = uiSchema[keyname]
        })
        return newData
    }, [uiSchema])

    const onChange = (val) => {
        const newData = {}
        Object.keys(val).map(keyname => {
            newData['ui:'+ keyname] = val[keyname]
        });
        setUiSchema(uiSchema => ({ ...uiSchema, ...newData }))
    }
    const Reset = () => setUiSchema(initalUiSchema)

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <FormSchema
                        schema={schema}
                        uiSchema={uiSchema}
                    />
                </div>
                <div style={{ width: 400, marginLeft: 20 }}>
                    <FormSchema schema={configSchma} uiSchema={configUI} data={data} onChange={onChange} />
                </div>
            </div>
            <div style={{ float: 'right' }}><Button onClick={Reset}>重置UI</Button></div>
        </div>
    )
}
 
 ReactDOM.render(<CustomOptions/>,mountNode)
  `

const code5 = `
import React from 'react'
import { FormSchema } from 'gantd'

const schema = {
    type: "object",
    title: "普通表单",
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
            componentType: "Url"
        },
        key_5: {
            title: "邮箱",
            type: "string",
            componentType: "Email"
        },
        key_6: {
            title: "语言",
            type: "string",
            componentType: "Language"
        },
        key_7: {
            title: "手机号",
            type: "string",
            componentType: "CellPhone"
        },
    }
}

const uiSchema = {
    "ui:col": {
        xxl: 6,
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
    },
    "ui:labelCol": {
        span: 24,
        sm: 6
    },
    "ui:wrapperCol": {
        span: 24,
        sm: 18
    }

}

function GridLayout() {
    return <div style={{ margin: 10 }} >
        <FormSchema uiSchema={uiSchema} schema={schema} />
    </div>
}

ReactDOM.render(<GridLayout/>,mountNode)
 `



const code6 = `
import React, { useState, useRef } from 'react'
import { FormSchema } from 'gantd'

const schema = {
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

const uiSchema = {
    "ui:col": 24,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "#fff"
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
                <FormSchema
                    wrappedComponentRef={formRef}
                    uiSchema={uiSchema}
                    data={data}
                    onChange={onChange}
                    schema={schema}
                />
            </div>
        </div>
    </div>
}

ReactDOM.render(<BindData/>,mountNode)
 `

const code7 = `
import React, { useState } from 'react'
import { FormSchema } from 'gantd'

const uiSchema = {
    "ui:col": 24,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "#fff"
}

function DependenceData() {
    const dependenceSchema = {
        type: "object",
        title: "依赖关系",
        propertyType: {
            "key_1": {
                title: "姓氏",
                type: "string",
            },
            "key_2": {
                title: "全名",
                type: "string",
                dependencies: ["key_1"],
                onDependenciesChange: (value, props, form) => {
                    form && form.setFieldsValue({ key_2: value })
                }
            },
        }
    }
    return <div style={{ margin: 10 }}>
        <FormSchema
            uiSchema={uiSchema}
            schema={dependenceSchema}
        />
    </div>
}

ReactDOM.render(<DependenceData/>,mountNode)
 `

const code8 = `
import React, { useState } from 'react'
import { Rate } from 'antd'
import { FormSchema } from 'gantd'

const uiSchema = {
    "ui:col": 24,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "#fff"
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
        <FormSchema
            uiSchema={uiSchema}
            schema={customCmpSchema}
            customFields={[{
                type: "CustomComponent",
                component: Rate
            }]}
        />
    </div>
}

ReactDOM.render(<CustomCmp/>,mountNode)
 `

export default [code1, code2, code3, code4, code5, code6, code7, code8]