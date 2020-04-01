import React, { Component } from 'react';
import { Select } from 'antd';
import { isNumber } from 'lodash'
import numeral from 'numeral'
import { compose, withProps, toClass, defaultProps } from 'recompose'
import InputNumber from '../input-number';
import { withEdit, EditStatus } from '../compose'
import symbols from './symbol.json'
import { WithBasicProps } from '../compose/withbasic';
interface value {
  key?: string,
  value?: string
}
export interface GantInputMoneyProps extends WithBasicProps {
  onChange?: (val: value) => void;
  value?: value,
  placeholder?: string,
  allowClear?: boolean,
  precision?: number
}
const withMoneyType = compose(
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
  withProps(({ value = {} as any, format, onChange }) => {
    const { key: currency = symbols[0], value: money } = value
    let obj = {
      currency,
      money,
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
  })
)

@compose(
  withMoneyType,
  withEdit(({ currency, money, format }) => {
    if (!isNumber(money)) return null
    const num = numeral(money).format(format)
    return `${currency} ${num}`
  }, "gantd-input-money-addonBefore"),
  withProps(({ currency, onCurrencyChange, size }) => {
    return ({
      addonBefore: (
        <Select dropdownClassName="gantd-input-money-addonBefore" className="gant-input-money-select" style={{ width: 75 }} value={currency}
          size={size}
          onChange={onCurrencyChange}>
          {
            symbols.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)
          }
        </Select>
      ),

    })
  }),
)
class InputMoney extends Component<any>{

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
    const { setType, onEnter, onValueChange, precision, format, reg, addonBefore, ...props } = this.props
    const { value } = this.state

    return (
      <span className='gant-input-moeny'>
        {addonBefore}
        <InputNumber {...props} wrapperClassName={'gant-input-moeny-number'} isInner value={props.money || value} min={0} edit={EditStatus.EDIT} onPressEnter={onEnter} onChange={this.onChange} />
      </span>
    );
  }
}

export default class InputMoneyWrapper extends Component<GantInputMoneyProps>{
  render() {
    return <InputMoney {...this.props} />
  }
}
