import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { compose, withState, withProps, defaultProps, mapProps, withPropsOnChange } from 'recompose'

import { withEdit } from '../compose'
import codesList from './codes.json'

const isPhone = /^\d{7,8}$/
const reg = /^\d{0,8}$/
const withCode = compose(
  withProps(({ value = {} }) => {
    const { code = "010", phone } = value
    return {
      code,
      phone
    }
  }),
  defaultProps({
    placeholder: '请输入电话号码'
  }),
  withProps(({ onChange, code: oCode, phone: oPhone }) => {
    return {
      filterOption(text, option) {
        const { key, props: { label } } = option
        return key.includes(text) || label.includes(text)
      },
      onCodeChange(code) {
        onChange({
          code, phone: oPhone
        })
      },
      onPhoneChange(phone) {
        onChange({
          code: oCode, phone
        })
      }
    }
  }),
  withProps(({ code, onCodeChange, filterOption }) => ({
    addonBefore: (
      <Select style={{ width: 130 }} value={code} onChange={onCodeChange} showSearch filterOption={filterOption}>
        {
          codesList.map((citys, index) => {
            let renderCitys = citys
            const [[province, pCode], ...oCitys] = citys
            if (!pCode) renderCitys = oCitys
            return (
              <Select.OptGroup label={province} key={province}>
                {
                  renderCitys.map(city => city.length > 1 ? (
                    <Select.Option key={city[1]} value={city[1]} label={city[0]}>
                      <span>{city[1]}</span><span style={{ display: "inline-block", marginLeft: 6 }}>{city[0]}</span>
                    </Select.Option>
                  ) : undefined)
                }
              </Select.OptGroup>
            )
          })
        }
      </Select>
    )
  })),
  withPropsOnChange(['value'], ({ value }) => ({
    confirmable: isPhone.test(String(value))
  })),
  mapProps(({ filterOption, ...props }) => props)
)


const getValue = ({ code, phone }) => phone ? `${code} - ${phone}` : ''
@compose(
  withCode,
  withEdit(getValue)
)
class TelePhone extends Component {

  onChange = (e) => {
    const { onPhoneChange } = this.props
    const { value } = e.target
    if (!value || reg.test(value)) {
      onPhoneChange(value)
    }
  }

  onKeyDown = (e) => {
    const { value, onEnter } = this.props
    if (!value || isPhone.test(value)) {
      onEnter(e)
    }
  }

  render() {
    const { onEnter, onPhoneChange, phone, ...props } = this.props

    return (
      <Input {...props} value={phone} onKeyDown={this.onKeyDown} onChange={this.onChange} />
    );
  }
}

export default TelePhone