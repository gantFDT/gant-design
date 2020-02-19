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
    const { addonAfter, onChange, onEnter, style, ...props } = this.props
    if (addonAfter) {
      return (
        <Group gant style={style}>
          <Input.TextArea {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
          <span className="ant-input-group-addon">{addonAfter}</span>
        </Group>
      )
    }
    return (
      <Input.TextArea style={style} {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
    )
  }

}

export default TextArea