import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose'

const getText = ({ value }) => (value ? <div>{Array.from(value).fill('\u25cf')}</div> : '')


@withEdit(getText)
class Password extends React.Component {

  static defaultProps = {
    style: {}
  }

  render() {
    const { onChange, onEnter, style, ...props } = this.props
    return (<Input.Password {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
    )
  }

}

export default Password