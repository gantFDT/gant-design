import { UISchema, TitleSchema, Schema } from './interface'
import { EditStatus } from '@gantd/index'
import { get } from 'lodash'
export function getOrders(orders: string[], targetArray: string[]): string[] {
	let _sort = false;
	if (!orders || orders.length <= 0) return targetArray;
	const len = orders.length, targetLen = targetArray.length;
	for (let index = 0; index < len; index++) {
		if (orders[index] === "*") _sort = true;
		const targetIndex = targetArray.indexOf(orders[index]);
		if (targetIndex >= 0) {
			if (!_sort) {
				targetArray.splice(targetIndex, 1);
				targetArray.splice(index, 0, orders[index])

			} else {
				const lastIndex = targetLen - (len - index);
				targetArray.splice(targetIndex, 1);
				targetArray.splice(lastIndex, 0, orders[index])
			}

		}

	}
	return targetArray
}

export function getUIData(uiSchema: UISchema, pathName?: string): any {
	const uiArray = [{
		alias: "orders",
		name: 'ui:orders',
		defaultValue: []
	}, {
		alias: "gutter",
		name: 'ui:gutter',
		defaultValue: 10
	},
	{
		alias: "extra",
		name: "ui:extra",
		defaultValue: ""
	},
	{
		alias: "labelAlign",
		name: "ui:labelAlign",
		defaultValue: "left"
	}, {
		alias: "labelCol",
		name: "ui:labelCol",
		defaultValue: null
	},
	{
		alias: "wrapperCol",
		name: "ui:wrapperCol",
		defaultValue: null
	},
	{
		alias: "padding",
		name: "ui:padding",
		defaultValue: 10
	},
	{
		alias: "backgroundColor",
		name: "ui:backgroundColor",
		defaultValue: null
	},
	{
		alias: "col",
		name: "ui:col",
		defaultValue: {
			span: 24
		}
	}];
	let uiData = {}, uiSchemaData = pathName ? get(uiSchema, pathName) : uiSchema;

	if (uiSchemaData === undefined && pathName) {
		const arr = pathName.split('.');
		let index = arr.length - 1;
		while (uiSchemaData === undefined && index >= 0) {
			index--;
			uiSchemaData = get(uiSchema, arr.slice(0, index + 1))
		}
	}
	if (uiSchemaData == undefined) uiSchemaData = uiSchema;
	uiSchemaData = { ...uiSchema, ...uiSchemaData };
	uiArray.map(item => {
		uiData[item.alias] = get(uiSchemaData, item.name, item.defaultValue)
	})
	return uiData;
}

export function getEdit(edit: EditStatus | object, pathName?: string): EditStatus {
	if (typeof edit !== "object") return edit;
	let newEdit: any = pathName ? get(edit, pathName) : edit;
	if (newEdit === undefined && pathName) {
		const arr = pathName.split('.');
		let index = arr.length - 1;
		while (newEdit === undefined && index >= 0) {
			index--;
			newEdit = index >= 0 ? get(edit, arr.slice(0, index + 1)) : edit
		}
	}
	if (typeof newEdit === "object") {
		if (newEdit['edit:status'] !== undefined) return newEdit['edit:status'];
	}
	if (typeof newEdit === "object" || newEdit === undefined) {
		return EditStatus.EDIT
	}
	return newEdit
}
export function getTitle(title: TitleSchema, pathName?: string): any {
	const titleArray = [{
		alias: "visible",
		name: 'title:visible',
		defaultValue: true
	},
	{
		alias: "id",
		name: "title:id",
		defaultValue: null
	},
	{
		alias: "type",
		name: "title:type",
		defaultValue: "line"
	},
	{
		alias: "size",
		name: "title:size",
		defaultValue: "large"
	},
	{
		alias: "extra",
		name: "title:extra",
		defaultValue: null
	},
	{
		alias: "beforeExtra",
		name: "title:beforeExtra",
		defaultValue: null
	},
	{
		alias: "icon",
		name: "title:icon",
		defaultValue: "file-text"
	},
	{
		alias: "num",
		name: "title:num",
		defaultValue: "1"
	},
	{
		alias: "color",
		name: "title:color",
		defaultValue: "default"
	},
	{
		alias: "bottomLine",
		name: "title:bottomLine",
		defaultValue: true
	},
	{
		alias: "canWrap",
		name: "title:canWrap",
		defaultValue: false
	},
	];
	let titleData = {}, titleSchemaData = pathName ? get(title, pathName) : title;
	if (titleSchemaData === undefined && pathName) {
		const arr = pathName.split('.');
		let index = arr.length - 1;
		while (titleSchemaData === undefined && index >= 0) {
			index--;
			titleSchemaData = get(title, arr.slice(0, index + 1))
		}
	}
	titleSchemaData = { ...title, ...titleSchemaData }
	titleArray.map(item => {
		titleData[item.alias] = get(titleSchemaData, item.name, item.defaultValue)
	})
	return titleData
}

export function getColumns(items: any, required?: string[]) {
	const columns: any[] = Object.keys(items).map((dataIndex) => ({
		dataIndex,
		title: items[dataIndex].title,
	}))
	const schema = {
		type: "object",
		required,
		propertyType: {
			...items
		}
	}
	return { columns, schema }
}

export function getBackgroundColor(backgroundColor: string, len: number): string {
	if (backgroundColor) return backgroundColor;
	if (len === 0) return "var(--component-background)";
	return `rgba(0,0,0,0.04)`;
}

export function getNewValue(formVals: any, data: any) {
	const newVals: any = {};
	formVals = formVals ? formVals : {};
	data = data ? data : {}
	Object.keys(formVals).map((keyname: string) => {
		if (formVals[keyname] && typeof formVals[keyname] === 'object' && !Array.isArray(formVals[keyname])) {
			newVals[keyname] = getNewValue(formVals[keyname], data[keyname])
		} else {
			newVals[keyname] = get(data, `${keyname}`, undefined)
		}
	})
	return { ...data, ...newVals }
}

export function getDateToForm(data: any, schema: Schema) {
	const newVals: any = {};
	data = data ? data : {};
	schema = schema ? schema : {}
	Object.keys(data).map((keyname: string) => {
		if (data[keyname] && typeof data[keyname] === 'object' && !Array.isArray(data[keyname])) {
			newVals[keyname] = getDateToForm(data[keyname], get(schema, "propertyType", {}))
		} else {
			if (get(schema, `propertyType.${keyname}`, undefined)) newVals[keyname] = get(data, `${keyname}`, undefined)
		}
	})
	return newVals
}