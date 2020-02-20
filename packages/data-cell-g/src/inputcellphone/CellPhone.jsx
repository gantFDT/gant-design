import React, { Component } from 'react';
import proptypes from 'prop-types'
import { Input as AntInput, Select } from 'antd';
import { compose, withProps, defaultProps, withState, mapProps, lifecycle, withHandlers, withPropsOnChange } from 'recompose'

import { withEdit } from '../compose'

const codeTypes = [
  '+86'
]

const reg = /^1$|^(13|14|15|18)$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{0,8}$/
// const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

// 格式化电话号码
const phoneFormatter = phone => Array.from(phone).map((num, index) => index % 4 == 3 ? `-${num}` : num).join('')


const withPhoneCode = compose(
  withState('code', 'setCode', codeTypes[0]),
  defaultProps({
    placeholder: '请输入手机号码', // withEdit中用做空值的展示
    allowClear: true,
  }),
  withProps(({ code, setCode }) => ({
    addonBefore: (
      <Select style={{ width: 75 }} value={code} onChange={setCode} disabled>
        {
          codeTypes.map(code => <Select.Option key={code} value={code}>{code}</Select.Option>)
        }
      </Select>
    )
  })),
  mapProps(({ setCode, ...props }) => props)
)

const withValidate = compose(
  withHandlers({
    validateValue: ({ value }) => () => !value || (value.length === 11 && reg.test(value))
  }),
  withPropsOnChange( // 监听value的变化，并修改是否可以提交的状态
    ['value'],
    ({ validateValue }) => ({
      confirmable: validateValue()
    })
  ),
  lifecycle({
    componentDidMount() {
      const { validateValue, onChange } = this.props
      if (!validateValue()) {
        onChange('')
      }
    }
  })
)

@compose(
  withPhoneCode,
  withValidate,
  withEdit(({ code, value }) => value ? `${code} ${phoneFormatter(value)}` : ''),
)
class CellPhone extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onChange(e) {
    const { onChange } = this.props
    const { value } = e.target
    if (value) {
      if (value.length <= 11 && reg.test(value)) {
        onChange(value)
      }
    }
    else {
      onChange('')
    }
  }

  onKeyDown(e) {
    const { validateValue, onEnter } = this.props
    if (validateValue()) {
      onEnter(e)
    }
  }

  render() {
    return (
      <AntInput {...this.props} onKeyDown={this.onKeyDown} onChange={this.onChange} />
    );
  }
}

export default CellPhone
