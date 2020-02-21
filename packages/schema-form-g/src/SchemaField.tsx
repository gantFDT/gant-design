import './index.less'
import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { EditStatus, Input } from '@data-cell'
import { FormContext } from './index'
import { Form, Col } from 'antd'
import { Schema } from './interface'
import { get, findIndex } from 'lodash'
import { getFields } from './maps'

const tr = (str) => str;

const SchemaField = (props: Schema) => {
	const { options, title, props: FiledProps, componentType, name, isRequired, initialValue: defaultValue, required, edit, uiData } = props
	const { form: { getFieldDecorator, resetFields, validateFieldsAndScroll }, onSave, data, customFields, emitDependenciesChange, locale, prefixCls } = useContext(FormContext)

	const onCancel = useCallback(() => name && resetFields([name]), [componentType, name])

	const onItemSave = useCallback((id, value, cb) => {
		name && validateFieldsAndScroll([name], (errors: any, values: object) => {
			if (errors) return
			onSave(id, value, cb)
		})
	}, [name])

	const optionsRules = options && options.rules ? options.rules : []
	const { col, labelAlign, labelCol, wrapperCol, extra } = uiData

	let initialValue = useMemo(() => {
		return defaultValue === undefined ? get(data, `${name}`, undefined) : defaultValue
	}, [defaultValue])

	if (initialValue == undefined && componentType === "ColorPicker") initialValue = "#ffffff"

	const itemEdit = FiledProps && FiledProps.allowEdit === false ? EditStatus.CANCEL : edit
	const colLayout = typeof col === "number" ? { span: col } : col
	const labelColLayout = typeof labelCol === "number" ? { span: labelCol } : labelCol
	const wrapperColayout = typeof wrapperCol === "number" ? { span: wrapperCol } : wrapperCol

	const fieldComponent = useMemo(() => {
		let component = get(getFields(), `${componentType}`, null)
		if (component == null) {
			const customIndex = findIndex(customFields, (item) => item.type === componentType)
			component = get(customFields, `[${customIndex}].component`, Input)
		}
		const { initialValue, ...othterProps } = FiledProps || {}
		return React.createElement(component, { ...othterProps, edit: itemEdit, onCancel, onSave: onItemSave })
	}, [FiledProps, itemEdit, onCancel, onItemSave, componentType, customFields])

	useEffect(() => {
		if (![null, undefined].includes(initialValue)) {
			emitDependenciesChange(name as string, initialValue)
		}
	}, [])

	return <Col {...colLayout}>
		<Form.Item
			label={title}
			className={labelAlign == "right" ? `${prefixCls}-right` : `${prefixCls}-left`}
			wrapperCol={wrapperColayout}
			labelCol={labelColLayout}
			extra={extra}
		>
			{
				name && getFieldDecorator(name, {
					initialValue,
					...options,
					rules: [{
						required: typeof required === "boolean" ? required : isRequired,
						message: `${title}${tr("不能为空")}`
					},
					...optionsRules
					]
				})(fieldComponent)
			}
		</Form.Item>
	</Col>
}
export default SchemaField