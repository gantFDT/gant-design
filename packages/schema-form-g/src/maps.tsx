import {
	Input, Password, TextArea, InputMoney, InputNumber,
	InputCellPhone as CellPhone, InputTelePhone as TelePhone,
	InputUrl as Url, InputEmail as Email, InputLanguage as Language,
	ColorPicker, DatePicker, RangePicker,
	Selector, LocationSelector, IconSelector
} from '@gantd/index'
import { Switch, Checkbox, Radio, AutoComplete } from 'antd'
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

export enum Fields {
	Input = "Input",
	Password = "Password",
	InputNumber = "InputNumber",
	InputMoney = "InputMoney",
	Url = "Url",
	Email = "Email",
	Language = "Language",
	CellPhone = "CellPhone",
	TelePhone = "TelePhone",
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

let fields = {
	[Fields.Input]: Input,
	[Fields.Password]: Password,
	[Fields.InputNumber]: InputNumber,
	[Fields.InputMoney]: InputMoney,
	[Fields.Url]: Url,
	[Fields.Email]: Email,
	[Fields.Language]: Language,
	[Fields.TelePhone]: TelePhone,
	[Fields.CellPhone]: CellPhone,
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
export function getFields() {
	return { ...fields }
}

export function setFields(field: any) {
	fields = { ...fields, ...field }
}