import React from 'react'
import { Input as AntInput } from 'antd'


import { withEdit } from '../compose'

@withEdit(props => props.value)
class Input extends React.Component {

  onChange = (e) => {
    const { onChange, strict } = this.props
    let { value } = e.target
    if (strict) {
      value = value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')
    }
    onChange(value)
  }

  render() {
    const { onEnter, ...props } = this.props
    return (
      <AntInput
        {...props}
        onChange={this.onChange}
        onKeyDown={onEnter}
        ref={inputDOM => { this.inputDOM = inputDOM }}
      />
    )
  }
}

export default Input