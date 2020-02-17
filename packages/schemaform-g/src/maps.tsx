import {
	Input, 
	// InputNumber, InputLang, InputMoney,
	// Select, Selector, Email, Location, TelePhone, DatePicker, 
	ColorPicker,
	// Url,
	TextArea,
	// CellPhone,
} from '@gantd/index';
// import { ImageUpload, FileUpload, CodeList, LanguageInput } from '../index'
import { Switch, Checkbox, Radio, AutoComplete } from 'antd'
// const { RangePicker } = DatePicker;
// import { UserSelector, RoleSelector, GroupSelector, UserGroupSelector } from '@/components/specific'
// import {
// 	CodeListSelector, UnitDomanSelector,
// 	UnitSelector, MetadataSelector,
// 	Objectselector, Fieldselector
// } from '@/components/specific/selectors'
// import SelectEdit from '../selectedit'
// import IconHouse from '@/components/common/iconhouse';
const CheckboxGorup = Checkbox.Group;
const RadioGroup = Radio.Group

export enum Fields {
	Input = "Input",
	InputNumber = "InputNumber",
	LanguageInput = "LanguageInput",
	InputMoney = "InputMoney",
	DatePicker = "DatePicker",
	Select = "Select",
	Selector = "Selector",
	Email = "Email",
	Location = "Location",
	TelePhone = "TelePhone",
	ColorPicker = "ColorPicker",
	TextArea = "TextArea",
	Url = "Url",
	CellPhone = "CellPhone",
	ImageUpload = "ImageUpload",
	FileUpload = "FileUpload",
	CodeList = "CodeList",
	UserSelector = "UserSelector",
	RoleSelector = "RoleSelector",
	GroupSelector = "GroupSelector",
	UserGroupSelector = "UserGroupSelector",
	RangePicker = "RangePicker",
	IconHouse = "IconHouse",
	Switch = "Switch",
	Checkbox = "Checkbox",
	CheckboxGorup = "CheckboxGorup",
	Radio = "Radio",
	RadioGroup = "RadioGroup",
	SelectEdit = "SelectEdit",
	CodeListSelector = "UnitDomanSelector",
	UnitSelector = "UnitSelector",
	UnitDomanSelector = "UnitDomanSelector",
	MetadataSelector = "MetadataSelector",
	Objectselector = "Objectselector",
	Fieldselector = "Fieldselector",
	AutoComplete="AutoComplete"
}


let fields = {
	[Fields.Input]: Input,
	// [Fields.InputNumber]: InputNumber,
	// [Fields.LanguageInput]: LanguageInput,
	// [Fields.InputMoney]: InputMoney,
	// [Fields.DatePicker]: DatePicker,
	// [Fields.Select]: Select,
	// [Fields.Selector]: Selector,
	// [Fields.Email]: Email,
	[Fields.Location]: Location,
	// [Fields.TelePhone]: TelePhone,
	[Fields.ColorPicker]: ColorPicker,
	[Fields.TextArea]: TextArea,
	// [Fields.Url]: Url,
	// [Fields.CellPhone]: CellPhone,
	// [Fields.ImageUpload]: ImageUpload,
	// [Fields.FileUpload]: FileUpload,
	// [Fields.CodeList]: CodeList,
	// [Fields.UserSelector]: UserSelector,
	// [Fields.RoleSelector]: RoleSelector,
	// [Fields.GroupSelector]: GroupSelector,
	// [Fields.UserGroupSelector]: UserGroupSelector,
	// [Fields.RangePicker]: RangePicker,
	// [Fields.IconHouse]: IconHouse,
	[Fields.Switch]: Switch,
	[Fields.Checkbox]: Checkbox,
	[Fields.CheckboxGorup]: CheckboxGorup,
	[Fields.Radio]: Radio,
	[Fields.RadioGroup]: RadioGroup,
	// [Fields.SelectEdit]: SelectEdit,
	// [Fields.CodeListSelector]: CodeListSelector,
	// [Fields.UnitDomanSelector]: UnitDomanSelector,
	// [Fields.UnitSelector]: UnitSelector,
	// [Fields.MetadataSelector]: MetadataSelector,
	// [Fields.Objectselector]: Objectselector,
	// [Fields.Fieldselector]: Fieldselector,
	[Fields.AutoComplete]: AutoComplete
}
export function getFields() {
	return {
		...fields
	}
}

export function setFields(field: any) {
	fields = { ...fields, ...field }
}