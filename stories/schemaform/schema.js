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
    configSchma,
    nestSchema,
    bindDataSchema,
    customCmpSchema
}