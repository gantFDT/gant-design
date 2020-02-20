import React from 'react'
import { Input } from 'antd'
import Group from './Group'
import { withEdit } from '../compose'

const getText = ({ value }) => (value ? <div>{Array.from(value).fill('\u25cf')}</div> : '')


@withEdit(getText)
class Password extends React.Component {

  static defaultProps = {
    style: {}
  }

  render() {
    const { addonAfter, onChange, onEnter, style, ...props } = this.props
    return (
      <Group gant style={style}>
        <Input.Password {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default Password