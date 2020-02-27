import React, { Component } from 'react';
import { Select } from 'antd';
import { isNumber, isNil } from 'lodash'
import numeral from 'numeral'
import { compose, defaultProps, withProps, withState, toClass } from 'recompose'
import { InputNumber, EditStatus } from '@data-cell';

import { withEdit } from '../compose'
import symbols from './symbol.json'



const withMoneyType = compose(
  toClass,
  defaultProps({
    allowClear: true,
    precision: 2,
    onEnter: () => { },
  }),
  withProps(({ precision }) => {
    const pre = Math.max(0, precision);
    return {
      precision: pre,
      format: '0,0.' + '0'.repeat(pre),
      step: 1 / Math.pow(10, pre),
      reg: new RegExp(`[1-9](?:[0-9]+)?(?:\.[0-9]{0,${pre}})?|0.[0-9]{0,${pre}}`)
    }
  }),
  withProps(({ value = {}, format, onChange }) => {
    console.log(value)
    const { key: currency = symbols[0], value: money } = value
    let obj = {
      currency,
      money,
    }
    if (money) {
      // 去掉超过精度的部分
      const m = Number(numeral(money).format(format))
      if (money !== m) {
        // 改写money
        obj.money = m;
        onChange({
          key: obj.currency,
          value: m
        }) // 可以不用调
      }

    }
    return obj
  }),
  withProps(({ onChange, currency: oCurrency, money: oMoney }) => {
    return {
      onCurrencyChange(currency) {
        onChange({
          key: currency, value: oMoney
        })
      },
      onMoneyChange(money) {
        onChange({
          key: oCurrency, value: money
        })
      }
    }
  }),
  withProps(({ currency, onCurrencyChange }) => {
    return ({
      addonBefore: (
        <Select style={{ width: 75 }} value={currency} onChange={onCurrencyChange}>
          {
            symbols.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)
          }
        </Select>
      ),

    })
  }),
)

@compose(
  withMoneyType,
  withEdit(({ currency, money, format }) => {
    if (!isNumber(money)) return null
    const num = numeral(money).format(format)
    return `${currency} ${num}`
  })
)
class InputMoney extends Component {

  state = {
    value: undefined
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
  }

  onChange(v) {
    const { reg, onMoneyChange } = this.props
    let value = String(numeral(v).value()) // 通过numeral去掉非数字
    const match = value.match(reg) // 最多两位小数
    if (match && match[0]) {
      value = match[0]
    }
    value = numeral(value).value() // 转化成数字
    this.setState({
      value
    })
    onMoneyChange(value)
  }

  render() {
    const { setType, onEnter, onValueChange, precision, format, reg, ...props } = this.props
    const { value } = this.state
    return (
      <InputNumber {...props} isInner value={props.money || value} min={0} edit={EditStatus.EDIT} onPressEnter={onEnter} onChange={this.onChange} />
    );
  }
}

export default InputMoney
