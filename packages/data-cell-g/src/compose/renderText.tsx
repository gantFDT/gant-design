


import React from 'react'
import { get } from 'lodash'
import { Icon } from 'antd'

import './index.less'
import EditStatus from './editstatus'


const emptyText = '暂无'

const undef = (a => a)() // 防止undefined被修改
const emptyTextArray = [undef, null, NaN, ''] // 出现哪些值，显示暂无。

export type GetText<P> = (p: P) => any

const renderText = <P extends any>(getText: GetText<P>) => (props) => {

  const { setEdit, allowEdit, style, placeholder } = props

  const TextNode = React.memo(() => {
    const text = getText(props)
    if (emptyTextArray.includes(text)) {
      return <span className={'gant-compose-noContent'}>{placeholder || emptyText}</span>
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


  return (
    <div className={'gant-compose-readWrapper'} style={{ width: get(style, 'width', '100%') }}>
      <TextNode />
      <Pen />
    </div>
  )

}


export default renderText as any