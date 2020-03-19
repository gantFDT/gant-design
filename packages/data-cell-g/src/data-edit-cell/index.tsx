import React, { Component } from 'react'
import { widthBasic, WithEditInProps } from '../compose/widthbasic'
import renderText, { GetText } from '../compose/renderText';
import Group from '../input/Group';
import { isEqual } from 'lodash'
interface DataCellProps extends WithEditInProps<any> {
	children?: (props: any) => React.ReactNode | Element | null;
	renderText?: GetText<any>,
	popupClassName?: string
	disabledBlur?: boolean,
	[propsname: string]: any

}
@widthBasic()
export default class DataEditCell extends Component<DataCellProps> {
	componentDidUpdate(prevProps) {
		const { popupClassName, setPopupClassName, disabledBlur, setDisabledBlur } = this.props;
		if (!isEqual(prevProps.popupClassName, popupClassName)) {
			setPopupClassName(popupClassName)
		}
		if (!isEqual(prevProps.disabledBlur, disabledBlur)) {
			setDisabledBlur(disabledBlur)
		}

	}
	render() {
		const {
			computedEdit,
			renderText: propsRenderText,
			addonBefore,
			addonAfter,
			children,
			setPopupClassName,
			setDisabledBlur,
			allowEdit,
			setEdit,
			...props
		} = this.props
		const child = typeof children == 'function' ? children : (props: any) => children;
		return <>
			{
				!computedEdit ? renderText(propsRenderText)({ ...this.props }) : <Group gant>
					{addonBefore ? <span className="ant-input-group-addon">{addonBefore}</span> : null}
					{child(props)}
					{addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
				</Group>
			}
		</>
	}
}
