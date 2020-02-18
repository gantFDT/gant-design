export const schema = {
    type: "object",
    title: "普通表单",
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
        key_8: {
            title: "多行输入框",
            type: "string",
            componentType: "TextArea"
        },
        key_9: {
            title: "日期选择器",
            type: "string",
            componentType: "DatePicker"
        },
        key_10: {
            title: "日期区间选择器",
            type: "string",
            componentType: "RangePicker"
        },
        // key_11: {
        //     title: "颜色选择",
        //     type: "string",
        //     componentType: "ColorPicker"
        // },
    }

}