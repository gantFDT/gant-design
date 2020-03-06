import React, { Component, createContext } from 'react'
import { widthBasic, WithEditInProps } from './withEdit'
import renderText, { GetText } from './renderText';
import EditStatus from './editstatus'
import { Group } from '../input'
interface DataCellProps extends WithEditInProps<any> {
	children?: (props: ChildAgs) => React.ReactNode | Element | null;
	renderText?: GetText<any>,
	[propsname: string]: any
}
interface ChildAgs {
	onChange: (val: any) => void,
	onEnter: Function,
	getPopupContainer: () => HTMLElement,
	value: any
}
@widthBasic
export default class DataCell extends Component<DataCellProps> {
	render() {
		const {
			computedEdit,
			renderText: getText,
			addonBefore,
			addonAfter,
			getPopupContainer,
			children,
			onChange,
			onEnter,
			value,
		} = this.props;
		const child = typeof children == 'function' ? children : (props: ChildAgs) => children
		return <>
			{
				!computedEdit ? renderText(getText)({ ...this.props }) : <Group gant>
					{addonBefore ? <span className="ant-input-group-addon">{addonBefore}</span> : null}
					{child({ getPopupContainer, onChange, value, onEnter })}
					{addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
				</Group>
			}
		</>
	}
}
