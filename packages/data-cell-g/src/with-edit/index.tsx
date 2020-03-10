
import React from 'react';
import { Icon, Tooltip } from 'antd'
import propTypes from 'prop-types'
import { compose, withState, defaultProps, withPropsOnChange, setStatic, withHandlers, branch, mapProps, withProps } from 'recompose';

import renderText, { GetText } from '../compose/renderText'
import inputwrapper from '../compose/inputwrapper'
import editwrapper from '../compose/editwrapper'
import EditStatus from '../edit-status'
import { HandlerWithType } from '../compose/common'

const defaultComProps = {
  allowEdit: true,
  edit: EditStatus.CANCEL,
  confirmable: true, // 由需要验证的组件指定，例如电话号码的验证，空值是否可以调用onConfirm
  onChange: () => { },
  onCancel: () => { },
  onSave: () => { },
  onEnter: () => { },
}

const proptypes = {
  allowEdit: propTypes.bool,
  confirmable: propTypes.bool,
  edit: propTypes.oneOf([EditStatus.EDIT, EditStatus.CANCEL, EditStatus.SAVE]),

  style: propTypes.shape({
    width: propTypes.oneOfType([
      propTypes.string,
      propTypes.number
    ])
  }),
  onChange: propTypes.func,
  onCancel: propTypes.func,
  onSave: propTypes.func,
  onEnter: propTypes.func,
}

const computedEditStatus = (edit, selfEdit) => edit === EditStatus.EDIT || selfEdit === EditStatus.EDIT

export type OnSave = <T>(id: string, value: T, cb: Function) => void

// withProps提供的props
export interface WithEditProps<T> {
  value: T,
  allowEdit: boolean,
  confirmable: boolean,
  onChange: (v: T) => void,
  onSave: OnSave,
  onCancel: Function,
  onConfirm: Function,
  onEnter: Function,
  edit: EditStatus,
  isInner: boolean
}

// 通过withEdit高阶函数包裹的组件可以接受的参数
export interface WithEditInProps<T> {
  value?: T,
  allowEdit?: boolean,
  confirmable?: boolean,
  onChange: (v: T) => void,
  onSave?: OnSave,
  onCancel?: Function,
  edit?: EditStatus,
  isInner?: boolean
}

// 通过withEdit高阶函数包裹的组件获得的新参数
export interface WithEditOutProps<T> {
  value: T,
  onChange: (v: T) => any,
  addonAfter: React.ReactElement
}

interface WithEditInnerProps {
  selfEdit: EditStatus,
  setEdit: HandlerWithType<EditStatus>,
  computedCache: (pe: EditStatus, pse: EditStatus) => void,
  computedEdit: boolean
}


export const widthBasic = (popupClassName?: string) => compose(
  inputwrapper(popupClassName),
  defaultProps(defaultComProps),
  setStatic('propsTypes', proptypes),
  withState('selfEdit', 'setEdit', EditStatus.CANCEL),
  withState('cacheValue', 'setCacheValue', null),
  withHandlers({
    computedCache: ({ edit, selfEdit, setCacheValue, value, cacheValue, onChange, onCancel }) => (prevEdit, prevSelfEdit) => {
      if (computedEditStatus(edit, selfEdit)) { // 进入编辑状态
        setCacheValue(value)
      } else {  // 退出编辑  这个时候可能的取值状态有3种[false, false]、[false, 0]、[0, false]，必须知道变化路径才能确定是否要回溯缓存
        const map = [
          [prevEdit, edit],
          [prevSelfEdit, selfEdit]
        ]
        const changeUnit = map.find(([p, c]) => p !== c) // 找到变化的单元
        if (changeUnit[1] === EditStatus.CANCEL) {  // 变化的单元的后面那个值是false,表示当前操作时一个取消操作，需要回溯
          if (value !== cacheValue) { // 避免全局进入编辑，点取消
            onChange(cacheValue)
          }
          onCancel(cacheValue)
        }
        setCacheValue(null)
      }
    },
    onConfirm: ({ value, onSave, id, selfEdit, setEdit, confirmable }) => () => { // 点击对勾
      if (selfEdit && confirmable) {
        // 提交数据
        onSave(id, value, () => setEdit(EditStatus.SAVE))
      }
    }
  }),
  withHandlers({
    onEnter: ({ onConfirm, onEnter }) => e => {
      if (e.key === "Enter" && e.keyCode === 13) {
        onConfirm()
      }
      onEnter(e)
    }
  }),
  // 当编辑状态改变的时候计算缓存值
  withPropsOnChange(
    (prevProps, { edit, selfEdit, computedCache, setEdit }) => {
      const prevComputedEdit = computedEditStatus(prevProps.edit, prevProps.selfEdit)
      const computedEdit = computedEditStatus(edit, selfEdit)
      const shouldUpdate = prevComputedEdit !== computedEdit
      if (shouldUpdate) {
        computedCache(prevProps.edit, prevProps.selfEdit)
      }

      if (edit === EditStatus.EDIT && selfEdit === EditStatus.EDIT) {
        setEdit(EditStatus.CANCEL)
      }

      return shouldUpdate

    },
    ({ edit, selfEdit }) => ({ computedEdit: computedEditStatus(edit, selfEdit) })
  ),
  withProps(({ onConfirm, setEdit, selfEdit, addonAfter: propsAddonAfter, onChange }) => {
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
          <Icon type="close" onClick={() => setEdit(EditStatus.CANCEL)} className={'gant-compose-error'} style={{ marginLeft: 8 }} />
        </Tooltip>
      </React.Fragment>
    )
    return {
      addonAfter: selfEdit === EditStatus.EDIT && addonAfter || propsAddonAfter
    }
  }))

export default <T extends any>(getText: GetText<T>, popupClassName?: string) => compose(
  widthBasic(popupClassName),
  branch(
    props => !props.computedEdit,   // 读模式
    () => {
      return renderText(getText)
    }
  ),
  editwrapper,
  mapProps(({
    edit,
    allowEdit,
    selfEdit, setEdit,
    cacheValue, setCacheValue,
    computedCache,
    onConfirm,
    computedEdit,
    onCancel,
    onSave,
    confirmable,
    setPopupClassName,
    ...props
  }) => (props))
);
