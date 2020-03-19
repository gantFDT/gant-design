import React from 'react'
import { Icon } from 'antd'

import EditStatus from '../edit-status'
import classnames from 'classnames'

const emptyText = '暂无'

const undef = (a => a)() // 防止undefined被修改
const emptyTextArray = [undef, null, NaN, ''] // 出现哪些值，显示暂无。

export type GetText<P> = (p?: P) => any

const renderText = <P extends any>(getText?: GetText<P>) => (props) => {

  const { setEdit, allowEdit } = props

  const TextNode = React.memo(() => {
    const text = getText ? getText(props) : props.value;
    if (emptyTextArray.includes(text)) {
      return <span className={'gant-compose-noContent'}>{emptyText}</span>
    }
    return text
  })

  const Pen = React.memo(
    () => {
      let pen = null
      if (allowEdit) {
        pen = (
          <span className={'gant-compose-editPen'} onClick={() => setEdit(EditStatus.EDIT)}>
            <Icon type="edit" />
          </span>
        )
      }
      return pen
    }
  )

  const style: React.CSSProperties = {
    width: "100%"
  }
  if (allowEdit) {
    style.paddingRight = 15
  }

  return (
    <div className={classnames('gant-compose-readWrapper')} style={style}>
      <TextNode />
      <Pen />
    </div>
  )

}


export default renderText as any