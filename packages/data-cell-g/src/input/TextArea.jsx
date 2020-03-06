import React from 'react'
import { Input } from 'antd'
import Group from './Group'
import { withEdit } from '../compose'

const getText = ({ value }) => value ? <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{value}</div> : null


@withEdit(getText)
class TextArea extends React.Component {
  static defaultProps = {
    style: {}
  }

  render() {
    const { onChange, onEnter, ...props } = this.props
    return (
      <Input.TextArea {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
    )
  }

}

export default TextArea