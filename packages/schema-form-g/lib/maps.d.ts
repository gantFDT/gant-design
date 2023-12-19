export declare enum Fields {
    Input = "Input",
    Password = "Password",
    InputNumber = "InputNumber",
    InputMoney = "InputMoney",
    InputUrl = "InputUrl",
    InputEmail = "InputEmail",
    InputLanguage = "InputLanguage",
    InputCellPhone = "InputCellPhone",
    InputTelePhone = "InputTelePhone",
    TextArea = "TextArea",
    DatePicker = "DatePicker",
    RangePicker = "RangePicker",
    ColorPicker = "ColorPicker",
    Selector = "Selector",
    IconSelector = "IconSelector",
    LocationSelector = "LocationSelector",
    Switch = "Switch",
    Checkbox = "Checkbox",
    CheckboxGroup = "CheckboxGroup",
    Radio = "Radio",
    RadioGroup = "RadioGroup",
    AutoComplete = "AutoComplete",
    Search = "Search"
}
export declare type FieldsType = 'Input' | 'Password' | 'InputNumber' | 'InputMoney' | 'InputUrl' | 'InputEmail' | 'InputLanguage' | 'InputCellPhone' | 'InputTelePhone' | 'TextArea' | 'DatePicker' | 'RangePicker' | 'ColorPicker' | 'Selector' | 'IconSelector' | 'LocationSelector' | 'Switch' | 'Checkbox' | 'CheckboxGroup' | 'Radio' | 'RadioGroup' | 'AutoComplete' | 'Search';
export declare function getFields(): any;
export declare function setFields(field: any): void;
export declare let defaultFieldProps: {
    size: string;
};
export declare const setFieldProps: (props: any) => void;
export declare const getFieldProps: () => {
    size: string;
};
export declare const setGlobalConfig: (props: any) => void;
export declare const getGlobalConfig: () => {
    size: string;
};
