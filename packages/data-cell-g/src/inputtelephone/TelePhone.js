import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { compose, withState, withProps, defaultProps } from 'recompose'

import { withEdit } from '../compose'

const keys = ['1', '2']
const codes = [
  ["010"],
  ['020', '021', '022', '023', '024', '025', '027', '028', '029']
]

const isPhone = /^\d{7,8}$/
const reg = /^\d{0,8}$/
const withCode = compose(
  withState('code', 'setCode', codes[0][0]),
  defaultProps({
    placeholder: '请输入电话号码'
  }),
  withProps(({ code, setCode }) => ({
    addonBefore: (
      <Select style={{ width: 75 }} value={code} onChange={code => setCode(code)}>
        {
          keys.map((key, index) => (
            <Select.OptGroup label={`${key}字头`} key={key}>
              {
                codes[index].map(num => <Select.Option key={num} value={num}>{num}</Select.Option>)
              }
            </Select.OptGroup>))
        }
      </Select>
    )
  }))
)


const getValue = ({ code, value }) => value ? `${code} - ${value}` : ''
@compose(
  withCode,
  withEdit(getValue)
)
class TelePhone extends Component {

  onChange = (e) => {
    const { onChange } = this.props
    const { value } = e.target
    if (!value || reg.test(value)) {
      onChange(value)
    }
  }

  onKeyDown = (e) => {
    const { value, onEnter } = this.props
    if (!value || isPhone.test(value)) {
      onEnter(e)
    }
  }

  render() {
    const { onEnter, setCode, ...props } = this.props

    return (
      <Input {...props} onKeyDown={this.onKeyDown} onChange={this.onChange} />
    );
  }
}

export default TelePhone