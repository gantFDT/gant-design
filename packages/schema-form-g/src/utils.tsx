import { UISchema, TitleSchema, Schema, Types } from './interface'
import { EditStatus } from '@data-cell'
import { get, isNil } from 'lodash';
interface UIArrayItem {
	alias: string,
	belong: "field" | "form" | string[],
	name: string | string[],
	defaultValue?: any
}
const uiArray = [
	{
		alias: "className",
		belong: ["field", "form"],
		name: ["form:className", "field:className"],
		defaultValue: undefined
	},
	{
		alias: "style",
		belong: "field",
		name: "field:style",
		defaultValue: undefined
	}, {
		alias: "style",
		belong: "form",
		name: "form:style",
		defaultValue: {
		}
	},
	{
		alias: "orders",
		belong: "form",
		name: ["ui:orders", "form:orders"],
		defaultValue: []
	}, {
		alias: "gutter",
		belong: "form",
		name: ["ui:gutter", "form:gutter"],
		defaultValue: 10
	},
	{
		alias: "extra",
		belong: "field",
		name: ["ui:extra", "field:extra"],
		defaultValue: undefined
	},
	{
		alias: "labelAlign",
		belong: "field",
		name: ["ui:labelAlign", "field:labelAlign"],
		defaultValue: undefined
	}, {
		alias: "labelCol",
		belong: "field",
		name: ["ui:labelCol", "field:labelCol"],
		defaultValue: undefined
	},
	{
		alias: "wrapperCol",
		belong: "field",
		name: ["ui:wrapperCol", "field:wrapperCol"],
		defaultValue: undefined
	},
	{
		alias: "col",
		belong: "field",
		name: ["ui:col", "field:col"],
		defaultValue: 24
	},
	{
		alias: "padding",
		belong: "form",
		name: "ui:padding",
		defaultValue: 10,
	},
	{
		alias: "backgroundColor",
		belong: "form",
		name: "ui:backgroundColor",
		defaultValue: undefined,
	}
];
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

export function getUIData(uiSchema: UISchema, type: "field" | "form", pathName?: string): any {
	let uiData = {}, uiSchemaData = pathName ? get(uiSchema, pathName, {}) : uiSchema;
	if (pathName) {
		const arr = pathName.split('.');
		let index = arr.length - 1;
		while (index >= 0) {
			index--;
			uiSchemaData = { ...get(uiSchema, arr.slice(0, index + 1).join('.'), {}), ...uiSchemaData }
		}
	}
	uiSchemaData = { ...uiSchema, ...uiSchemaData };
	uiArray.map(item => {
		if (item.belong === type || item.belong.indexOf(type) >= 0) {
			if (typeof item.name === "string") {
				uiData[item.alias] = get(uiSchemaData, item.name, item.defaultValue)
			} else {
				let itemName = "";
				item.name.map(keyName => {
					if (uiSchemaData[keyName] || typeof uiSchemaData[keyName] === 'number') {
						itemName = keyName
					}
				})
				itemName = itemName ? itemName : item.name[0];
				uiData[item.alias] = get(uiSchemaData, itemName, item.defaultValue)
			}
		}
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

export function getNewValue(formVals: any, data: any, schema) {
	const newVals: any = {};
	formVals = formVals ? formVals : {};
	data = data ? data : {}
	Object.keys(formVals).map((keyname: string) => {
		if (formVals[keyname] && typeof formVals[keyname] === 'object' && !Array.isArray(formVals[keyname])) {
			newVals[keyname] = getNewValue(formVals[keyname], data[keyname], schema)
		} else {
			newVals[keyname] = get(data, `${keyname}`, undefined)
		}
	})
	return { ...newVals }
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

export function getKey(): string {
	return Math.random().toString(32).slice(2)
}

export function getFieldItemSizeClass(className: string) {
	switch (className) {
		case "small":
			return "gant-form-item-sm"
		case "large":
			return "gant-form-item-lg";
		default:
			return "gant-form-item"
	}
}

export function getSchemaRenderCount(schema: Schema): number {
	let index = 0
	const { propertyType } = schema
	const keys = Reflect.ownKeys(propertyType)
	return keys.reduce<number>((count, key: string) => {
		const subSchema = propertyType[key]
		if (!isNil(subSchema.propertyType)) return count + getSchemaRenderCount(subSchema)
		return count + (subSchema.hide ? 0 : 1)
	}, index)
}