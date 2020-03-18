import {
	Input, InputMoney, InputNumber,
	InputCellPhone, InputTelePhone,
	InputUrl, InputEmail, InputLanguage,
	ColorPicker, DatePicker,
	Selector, LocationSelector, Icon,

} from '@data-cell'
import { Switch, Checkbox, Radio, AutoComplete } from 'antd'
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const { Password, TextArea } = Input;
const { RangePicker } = DatePicker;
const IconSelector = Icon;
export enum Fields {
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
	AutoComplete = "AutoComplete"
}
export type FieldsType =
	"Input"
	| "Password"
	| "InputNumber"
	| "InputMoney"
	| "InputUrl"
	| "InputEmail"
	| "InputLanguage"
	| "InputCellPhone"
	| "InputTelePhone"
	| "TextArea"
	| "DatePicker"
	| "RangePicker"
	| "ColorPicker"
	| "Selector"
	| "IconSelector"
	| "LocationSelector"
	| "Switch"
	| "Checkbox"
	| "CheckboxGroup"
	| "Radio"
	| "RadioGroup"
	| "AutoComplete"

let fields = {
	[Fields.Input]: Input,
	[Fields.Password]: Password,
	[Fields.InputNumber]: InputNumber,
	[Fields.InputMoney]: InputMoney,
	[Fields.InputUrl]: InputUrl,
	[Fields.InputEmail]: InputEmail,
	[Fields.InputLanguage]: InputLanguage,
	[Fields.InputTelePhone]: InputTelePhone,
	[Fields.InputCellPhone]: InputCellPhone,
	[Fields.TextArea]: TextArea,
	[Fields.DatePicker]: DatePicker,
	[Fields.RangePicker]: RangePicker,
	[Fields.ColorPicker]: ColorPicker,
	[Fields.Selector]: Selector,
	[Fields.IconSelector]: IconSelector,
	[Fields.LocationSelector]: LocationSelector,
	[Fields.Switch]: Switch,
	[Fields.Checkbox]: Checkbox,
	[Fields.CheckboxGroup]: CheckboxGroup,
	[Fields.Radio]: Radio,
	[Fields.RadioGroup]: RadioGroup,
	[Fields.AutoComplete]: AutoComplete
}
export function getFields(): any {
	return { ...fields }
}

export function setFields(field: any) {
	fields = { ...fields, ...field }
}