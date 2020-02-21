


import React from 'react'
import { get } from 'lodash'
import { Icon } from 'antd'

import './index.less'
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider'
import EditStatus from './editstatus'
import classnames from 'classnames'

const emptyText = '暂无'

const undef = (a => a)() // 防止undefined被修改
const emptyTextArray = [undef, null, NaN, ''] // 出现哪些值，显示暂无。

export type GetText<P> = (p: P) => any

const renderText = <P extends any>(getText: GetText<P>) => (props) => {

  const { setEdit, allowEdit, style, placeholder, className } = props

  const TextNode = React.memo<ConfigConsumerProps>(({ getPrefixCls }) => {
    // let Textextde = null
    // if (emptyTextArray.includes(value)) { // 如果value是空值, 显示placeholder或者默认文本
    //   TextNode = <span className={getPrefixCls('compose-noContent')}>{placeholder || emptyText}</span>
    // } else {
    //   const factory = React.createFactory(getText)
    //   TextNode = factory({ value })
    // }
    // return TextNode
    const text = getText(props)
    if (emptyTextArray.includes(text)) {
      return <span className={getPrefixCls('compose-noContent')}>{emptyText}</span>
    }
    return text
  })

  const Pen = React.memo<ConfigConsumerProps>(
    ({ getPrefixCls }) => {
      let pen = null
      if (allowEdit) {
        pen = (
          <span className={getPrefixCls('compose-editPen')} onClick={() => setEdit(EditStatus.EDIT)}>
            <Icon type="edit" />
          </span>
        )
      }
      return pen
    }
  )


  return (
    <ConfigConsumer>
      {
        ({ getPrefixCls }) => (
          <div className={classnames(getPrefixCls('compose-readWrapper'),className)} style={{ ...style,width: get(style, 'width', '100%') }}>
            <TextNode getPrefixCls={getPrefixCls} />
            <Pen getPrefixCls={getPrefixCls} />
          </div>
        )
      }
    </ConfigConsumer>
  )

}


export default renderText as any