# schema-form-g

---
Automatic form generation by schema based on antd with [`React`](https://facebook.github.io/react/)

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/schema-form-g.svg
[npm-url]: https://www.npmjs.com/package/schema-form-g

## Screenshot

<img src='https://zos.alipayobjects.com/rmsportal/JwLASrsOYJuFRIt.png' width='408'>

## Demo

online example: https://favori.gitee.io/gantd-landing (CodePen)

## install

[![rc-tabs](https://nodei.co/npm/schema-form-g.png)](https://npmjs.org/package/schema-form-g)

## Feature

- Build forms quickly
- Style control by uiSchema
- Support read and write separation
- Built-in base field component type
- Support for adding custom components 

## Usage

```js
import React, { useState, useRef } from 'react';
import AutoReload from 'auto-load-g';

const initalUiSchema = {
    "form:gutter":10,
    "field:col":12,
    "field:style":{
        padding:0
    },
    "field:labelAlign":'left',
    "field:labelCol":6,
    "field:wrapperCol":18

}

const schema = {
    type: "object",
    title: "普通表单",
    required:['key_1'],
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
            <Button type='primary' onClick={onSubmit}>submit</Button>
        </div>
    </div>
}

React.render(<BasicUse/>, mountNode);
```

## API

[Documentation](https://jhildenbiddle.github.io/css-vars-ponyfill)

## Contact

- Create a [Github issue](https://github.com/jhildenbiddle/css-vars-ponyfill/issues) for bug reports, feature requests, or questions
- Follow [@GantFDT](https://twitter.com/jhildenbiddle) for announcements
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/css-vars-ponyfill) to support the project❤️!

## Anthor 

GantFDT

## License

MIT