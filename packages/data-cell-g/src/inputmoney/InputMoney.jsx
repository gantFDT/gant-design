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
    precision: 4,
    onEnter: () => { },
  }),
  withProps(({ value = {} }) => {
    const { currency = symbols[0], money } = value
    return {
      currency,
      money,
    }
  }),
  withProps(({ onChange, currenty: oCurrency, money: oMoney }) => {
    return {
      onCurrencyChange(currency) {
        onChange({
          currency, money: oMoney
        })
      },
      onMoneyChange(money) {
        onChange({
          currency: oCurrency, money
        })
      }
    }
  }),
  withProps(({ currency, setType, precision }) => {
    return ({
      addonBefore: (
        <Select style={{ width: 75 }} value={currency} onChange={setType}>
          {
            symbols.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)
          }
        </Select>
      ),
      format: '0,0.' + '0'.repeat(precision),
      step: 1 / Math.pow(10, precision),
      reg: new RegExp(`[1-9](?:[0-9]+)?(?:\.[0-9]{1,${precision}})?|0.[0-9]{1,${precision}}`)
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
    value: 0
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
    const { setType, onEnter, onValueChange, precision, ...props } = this.props
    const { value } = this.state
    return (
      <InputNumber {...props} isInner value={props.money || value} min={0} edit={EditStatus.EDIT} onPressEnter={onEnter} onChange={this.onChange} />
    );
  }
}

export default InputMoney
