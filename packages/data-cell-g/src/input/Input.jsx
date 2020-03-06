import React from 'react'
import { Input as AntInput } from 'antd'
import { withEdit } from '../compose'
import DataCell from '../compose/datacell'
// @withEdit(props => props.value)
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
    const { strict, onChange, ...props } = this.props;
    return (
      <DataCell renderText={() => this.props.value} {...props} onChange={this.onChange}  >
        {
          ({ onEnter, ...childProps }) => <AntInput
            {...childProps}
            onKeyDown={onEnter}
            ref={inputDOM => { this.inputDOM = inputDOM }}
          />
        }
      </DataCell>

    )
  }
}
export default Input