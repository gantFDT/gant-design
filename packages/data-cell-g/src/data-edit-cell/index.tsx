import React, { Component } from 'react'
import { withBasic, WithEditInProps } from '../compose/withbasic'
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
@withBasic()
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
			editAfter,
			children,
			setPopupClassName,
			setDisabledBlur,
			allowEdit,
			setEdit,
			emptyText,
			...props
		} = this.props;
		const child = typeof children == 'function' ? children : (props: any) => children;
		return <>
			{
				!computedEdit ? renderText(propsRenderText)({ ...this.props }) : <Group gant size={props.size} edit={editAfter} >
					<span className="gant-input-group-inner" >{child(props)}</span>
					{editAfter ? <span className="gant-input-group-addon ant-input-group-addon">{editAfter}</span> : null}
				</Group>
			}
		</>
	}
}
