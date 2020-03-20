import React from 'react';
import { Icon, Tooltip, Card } from 'antd'
import propTypes from 'prop-types'
import { compose, withState, defaultProps, withPropsOnChange, setStatic, withHandlers, branch, mapProps, withProps } from 'recompose';
import inputwrapper from './inputwrapper'
import EditStatus from '../edit-status'
import computed from './computed'
import { HandlerWithType } from './common'

const defaultComProps = {
	allowEdit: true,
	edit: EditStatus.CANCEL,
	confirmable: true, // 由需要验证的组件指定，例如电话号码的验证，空值是否可以调用onConfirm
	onChange: () => { },
	onCancel: () => { },
	onSave: () => { },
	onEnter: () => { },
	onBlur: () => { },
	onFocus: () => { },
	disabledBlur: false
}

const proptypes = {
	allowEdit: propTypes.bool,
	confirmable: propTypes.bool,
	edit: propTypes.oneOf([EditStatus.EDIT, EditStatus.CANCEL, EditStatus.SAVE]),
	onChange: propTypes.func,
	onCancel: propTypes.func,
	onSave: propTypes.func,
	onEnter: propTypes.func,
	onBlur: propTypes.func,
	onFocus: propTypes.func,
	disabledBlur: propTypes.bool
}

const computedEditStatus = (edit, selfEdit) => edit === EditStatus.EDIT || selfEdit === EditStatus.EDIT

export type OnSave = <T>(id: string, value: T, cb: Function) => void

export interface WidthBasicProps {
	onSave?: OnSave,
	onCancel?: () => void,
	edit?: EditStatus,
	allowEdit?: boolean,
	disabledBlur?: boolean
	isInner?: boolean,
	confirmable?: boolean,
	wrapperStyle?: React.CSSProperties,
	wrapperClassName?: string,
	autoFocus?: boolean
}

// 通过withEdit高阶函数包裹的组件可以接受的参数
export interface WithEditInProps<T> extends WidthBasicProps {
	value?: T,
	onChange?: (v: T) => void,
	onBlur?: Function,
	onFocus?: Function,
}
export const widthBasic = (popupClassName?: string) => compose(
	defaultProps(defaultComProps),
	inputwrapper(popupClassName),
	setStatic('propsTypes', proptypes),
	withState('selfEdit', 'setEdit', EditStatus.CANCEL),
	withState('cacheValue', 'setCacheValue', null),
	withHandlers({
		onConfirm: ({ value, onSave, id, selfEdit, setEdit, confirmable }) => () => { // 点击对勾
			if (selfEdit && confirmable) {
				// 提交数据
				onSave(id, value, () => setEdit(EditStatus.SAVE))
			}
		},
		onCancelCache: ({ onChange, value, cacheValue, setCacheValue, onCancel }) => () => {
			if (value !== cacheValue) { // 避免全局进入编辑，点取消
				onChange && onChange(cacheValue);
				onCancel(cacheValue);
			}
			setCacheValue(null)
		},
	}),
	withHandlers({
		onEnter: ({ onConfirm, onEnter }) => e => {
			if (e.key === "Enter" && e.keyCode === 13) {
				onConfirm()
			}
			onEnter(e)
		}
	}),
	computed,
	withPropsOnChange(
		(prevProps, { edit, selfEdit, setEdit }) => {
			const prevComputedEdit = computedEditStatus(prevProps.edit, prevProps.selfEdit)
			const computedEdit = computedEditStatus(edit, selfEdit)
			const shouldUpdate = prevComputedEdit !== computedEdit
			return shouldUpdate
		},
		({ edit, selfEdit, setCacheValue, value }) => {
			if (computedEditStatus(edit, selfEdit)) setCacheValue(value);
			return ({ computedEdit: computedEditStatus(edit, selfEdit) })
		}
	),

	withProps(({ onConfirm, setEdit, selfEdit, addonAfter: propsAddonAfter, onCancelCache }) => {
		const addonAfter = (
			<React.Fragment>
				{propsAddonAfter ? (
					<div className="gant-compose-extra">
						{propsAddonAfter}
					</div>
				) : undefined}
				<Tooltip title='确认'>
					<Icon type="check" onClick={onConfirm} className={'gant-compose-success'} />
				</Tooltip>
				<Tooltip title='取消'>
					<Icon type="close" onClick={() => {
						setEdit(EditStatus.CANCEL);
						onCancelCache();
					}} className={'gant-compose-error'} style={{ marginLeft: 8 }} />
				</Tooltip>
			</React.Fragment>
		)
		return {
			addonAfter: selfEdit === EditStatus.EDIT && addonAfter || propsAddonAfter
		}
	}),
	mapProps(({
		edit,
		selfEdit,
		cacheValue, setCacheValue,
		onConfirm,
		onCancel,
		onSave,
		confirmable,
		disabledBlur,
		onCancelCache,
		popupClassName,
		...props
	}) => (props))
)