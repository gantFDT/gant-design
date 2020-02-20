import React from 'react';
import numeral from 'numeral'
import { Input } from 'antd';



export default class Money extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const { onChange } = this.props;
    if (!value) {
      onChange(value)
      return
    }
    // const { value: newValue } = formatMoney(numeral(value)); // 转换成金额
    // let newValue = numeral(value).format('0,0.00') // 包含小数部分
    // newValue = newValue.replace(/\.\d{2}/, '') // 取得整数部分
    let newValue = numeral(value).format('0,0')
    const reg = /\.(\d{1,2})?/
    const dig = value.match(reg)
    
    if (dig && dig[0]) {
      newValue += dig[0]
    }
    onChange(newValue)
  }

  onBlur() {
    const { value, onChange } = this.props
    // const { integer, decimal } = formatMoney(value)

    // // onChange(`${integer}${decimal}`)
    onChange(numeral(value).format('0,0.00'))

  }

  render() {
    const { onChange, onBlur } = this;

    return (
      <Input {...this.props} onChange={onChange} onBlur={onBlur} />
    );
  }
}
