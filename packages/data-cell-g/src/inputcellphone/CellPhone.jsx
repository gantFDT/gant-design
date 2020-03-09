import React, { Component } from 'react';
import { Input as AntInput, Select } from 'antd';
import { compose, withProps, defaultProps, toClass, mapProps, lifecycle, withHandlers, withPropsOnChange } from 'recompose'
import classnames from 'classnames'
import { get } from 'lodash'

import { withEdit } from '../compose'
import codeTypes from './codes.json'

const reg = /^1$|^1[3-9]$|^1[3-9][0-9]\d{0,8}$/

// 格式化电话号码
const phoneFormatter = phone => Array.from(phone).map((num, index) => index % 4 == 3 ? `-${num}` : num).join('')

const withPhoneCode = compose(
  toClass,
  withProps(({ value = {} }) => {
    const { key: code = "86", value: phone } = value;
    return {
      code,
      phone
    }
  }),
  defaultProps({
    placeholder: '请输入手机号码', // withEdit中用做空值的展示
    allowClear: true,
  }),
  withProps(({ onChange, phone: oPhone, code: oCode }) => {
    return {
      onCodeChange(code) {
        if (!onChange) return
        // 验证中国大陆电话
        let phone = oPhone
        if (code === "86" && !(oPhone.length <= 11 && reg.test(oPhone))) {
          phone = ''
        }
        onChange({
          key: code, value: phone
        })
      },
      onPhoneChange(phone) {
        if (!onChange) return
        onChange({
          key: oCode, value: phone
        })
      },
      filterOption(inputValue, option) {
        const { key } = option
        return key.includes(inputValue)
      }
    }
  })
)

const withValidate = compose(
  withHandlers({
    validateValue: ({ phone }) => () => !phone || (phone.length === 11 && reg.test(phone))
  }),
  withPropsOnChange( // 监听value的变化，并修改是否可以提交的状态
    ['phone'],
    ({ validateValue }) => ({
      confirmable: validateValue()
    })
  ),
  lifecycle({
    componentDidMount() {
      const { validateValue, onPhoneChange } = this.props
      if (!validateValue()) {
        onPhoneChange('')
      }
    }
  })
)

@compose(
  withPhoneCode,
  withValidate,
  withEdit(({ code, phone }) => phone ? `+${code} ${phone}` : '', "gantd-input-cellphone-addonBefore"),
  withProps(({ code, onCodeChange, filterOption }) => {
    return ({
      addonBefore: (
        <Select  dropdownClassName="gantd-input-cellphone-addonBefore" style={{ width: 86 }} value={code} onChange={onCodeChange} filterOption={filterOption} showSearch>
          {
            codeTypes.map(code => <Select.Option key={code} value={code}>+{code}</Select.Option>)
          }
        </Select>
      )
    })
  }),
  mapProps(({ onCodeChange, searchCode, codeList, filterOption, ...props }) => props)
)
class CellPhone extends Component {

  state = {
    value: ''
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  onChange(e) {
    const { onPhoneChange, code } = this.props
    const { value } = e.target;
    if (value) {
      if (code === "86") {
        if (value.length <= 11 && reg.test(value)) {
          onPhoneChange(value)
          this.setState({ value })
        }
      }
      else {
        onPhoneChange(value)
        this.setState({ value })
      }
    }
    else {
      onPhoneChange('')
      this.setState({ value: '' })
    }
  }

  onKeyDown(e) {
    const { validateValue, onEnter } = this.props
    if (validateValue()) {
      onEnter(e)
    }
  }

  render() {
    const { onPhoneChange, validateValue, onEnter, ...props } = this.props
    const { value } = this.state
    let computedValue = get(props, 'phone', value)
    return (
      <AntInput {...props} value={computedValue}
        onBlur={() => { }}
        onKeyDown={this.onKeyDown} onChange={this.onChange} />
    );
  }
}

export default CellPhone
