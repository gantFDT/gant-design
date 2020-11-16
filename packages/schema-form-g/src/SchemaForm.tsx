import React, { useCallback, useContext } from 'react'
import Header from '@header'
import { EditStatus } from '@data-cell'
import { Form, Row } from 'antd'
import { Schema, UISchema, TitleSchema } from './interface'
import { FormContext } from './index'
import SchemaField from './SchemaField'
import classnames from 'classnames'
import { get, isEmpty } from 'lodash'
import { getOrders, getUIData, getEdit, getTitle, getBackgroundColor } from './utils'

interface SchemaFormProps {
	schema: Schema,
	uiSchema?: UISchema,
	titleConfig?: TitleSchema,
	withoutAnimation?: boolean,
}
export default function SchemaForm(props: SchemaFormProps) {
	const { uiSchema, schema, titleConfig, withoutAnimation } = props
	const { edit, prefixCls } = useContext(FormContext)

	const renderPropTypeContent: any = useCallback((item: Schema, pathName: string, required: string[]) => {
		const { type, hide } = item
		switch (type) {
			case "object":
				return renderContent(pathName)
			default:
				if (isEmpty(item)) return null
				if (hide) return null
				const nameArray = pathName.split('.')
				const itemName = nameArray[nameArray.length - 1]
				const isRequired = required && required.indexOf(itemName) >= 0
				const filedTitle = item.title
				const filedEdit = getEdit(edit, pathName)
				const { orders, gutter, ...itemUiData } = getUIData(uiSchema, "field", pathName)
				if (withoutAnimation) {
					if (['DatePicker', 'RangePicker', "Selector", "LocationSelector"].includes(item.componentType)) {
						if (item.props) {
							item.props.transitionName = ""
						} else {
							item.props = { transitionName: "" }
						}
					}
				}
				return <SchemaField
					key={pathName} {...item}
					title={filedTitle}
					name={pathName}
					uiData={itemUiData}
					isRequired={isRequired}
					edit={filedEdit} />
		}
	}, [uiSchema, schema, edit, withoutAnimation])

	const renderContent = useCallback((pathName?: string) => {
		let schemaData = schema
		if (pathName) {
			const nameArray = pathName.split('.')
			const getName = nameArray.join('.propertyType.')
			schemaData = get(schema, `propertyType.${getName}`)
		}
		const { orders, gutter, backgroundColor, padding, style, className } = getUIData(uiSchema, "form", pathName)
		const { propertyType, required, title } = schemaData

		if (isEmpty(propertyType)) return null
		const propertyTypeArray = Object.keys(propertyType)
		//处理排序
		const orderKeys = getOrders(orders, propertyTypeArray)
		//处理编辑状态；
		const filedEdit = getEdit(edit, pathName)
		//处理header
		const titleSchema = getTitle(titleConfig, pathName)
		const { visible, id: titleSchemaId, ...restTitleSchema } = titleSchema

		const contents = orderKeys.map(itemName => {
			const item = propertyType[itemName]
			const itemPathName = pathName ? `${pathName}.${itemName}` : itemName
			return renderPropTypeContent(item, itemPathName, required)
		})
		const pathNameArray = pathName ? pathName.split('.') : []
		const id = pathNameArray[pathNameArray.length - 1]
		const containerColor = getBackgroundColor(backgroundColor, pathNameArray.length)
		return <div className={classnames(`${prefixCls}-schemaCard`, filedEdit === EditStatus.EDIT && `${prefixCls}-showRequiredMark`, className)}
			key={pathName}
			style={{ backgroundColor: containerColor, padding: padding, ...style, }}>
			{(pathName ? visible : title) && <Header title={title} style={{ marginBottom: 16 }} {...restTitleSchema} id={titleSchemaId ? titleSchemaId : id} />}
			<Row gutter={gutter}>{contents}</Row>
		</div>
	}, [schema, edit, titleConfig, uiSchema])

	return <Form className={`${prefixCls}-schemaForm`} hideRequiredMark>
		{renderContent()}
	</Form>
}


