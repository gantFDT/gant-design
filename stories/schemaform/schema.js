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

const operateSchema = {
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

const editStatusSchema = {
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

const configSchma = {
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
export {
    schema,
    operateSchema,
    editStatusSchema,
    configSchma,
    bindDataSchema,
    customCmpSchema
}