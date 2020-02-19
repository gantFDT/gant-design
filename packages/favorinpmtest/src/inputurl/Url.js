import React from 'react'

import { Input } from 'antd'
import { withEdit } from '../compose'

const getValue = ({ value }) => {
  // const reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
  const isUrl = /[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;

  if (!isUrl.test(value)) return value // 如果不是网址格式，直接返回

  const reg = /^(ht|f)tps?:\/\//
  if (!reg.test(value)) {
    value = `http://${value}`
  }

  return (
    <a href={value} target='_blank' rel='noopener noreferrer'>{value}</a>
  )
}

/**
 * 普通模式下与Input一样
 */
@withEdit(getValue)
class Url extends React.Component {

  render() {
    const { onEnter,onChange, ...props } = this.props
    return <Input onKeyDown={onEnter} onChange={e => onChange(e.target.value)} {...props} />
  }

}

export default Url