import React, { useState, useRef, useMemo } from 'react'
import { Button, Switch, Radio } from 'antd'
import { EditStatus, SwitchStatus } from '@pkgs/gantd/src/index'
import FormSchema from '@pkgs/schemaform-g/src'
import { schema } from './schema'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'

function BasicUse() {
    const [uiSchema, setUiSchema] = useState({
        "ui:col": 24,
        "ui:gutter": 10,
        "ui:labelCol": 6,
        "ui:wrapperCol": 18,
        "ui:labelAlign": "left",
        "ui:backgroundColor": "#fff"
    })
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
        <Button onClick={onSubmit}>提交</Button>
    </div>
}

const config = {
    codes: code,
    useage: <>
        <p>表单是业务开发中最常见的业务场景，复杂表单的复杂程度往往需要我们使用大量的代码与时间去构建一个表单业务。FormSchema的需求由此诞生：</p>
        <ul>
            <li>1.通过json数据快速的构建出复杂表单；</li>
            <li>2.通过表单的结构，能够快速判断出该json结构的唯一性；</li>
        </ul>
    </>,
    inline: true,
    children: [
        {
            title: '基本用法',
            describe: '',
            cmp: BasicUse
        }
    ]
};

export default () => <CodeDecorator config={config} />