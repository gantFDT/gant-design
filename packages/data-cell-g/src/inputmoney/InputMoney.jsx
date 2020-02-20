import React, { Component } from 'react';
import { Select } from 'antd';
import { isNumber, isNil } from 'lodash'
import numeral from 'numeral'
import proptypes from 'prop-types'
import { compose, defaultProps, withProps, withState } from 'recompose'

import { withEdit } from '../compose'
import Money from './Money'
import symbols from './symbol.json'

const types = Object.keys(symbols)

const getValue = ({ value, type }) => {
  if (isNil(value)) return null
  const num = numeral(value).value()
  if (isNumber(num)) {
    return `${symbols[type]} ${value}`
  }
}



const withMoneyType = compose(
  withState('type', 'setType', types[0]),
  defaultProps({
    allowClear: true,
  }),
  withProps(({ type, setType }) => {
    return ({
      addonBefore: (
        <Select style={{ width: 75 }} value={type} onChange={setType}>
          {
            types.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)
          }
        </Select>
      )
    })
  }),
)

@compose(
  withMoneyType,
  withEdit(getValue)
)
class InputMoney extends Component {

  onKeyDown = (e) => {
    const { value, onEnter, onChange } = this.props

    if (e.keyCode === 13 && e.key === 'Enter') {
      const num = numeral(value).format('0,0.00')
      onChange(num)
    }
    onEnter(e)
  }

  render() {
    const { setType, onEnter, ...props } = this.props

    // if (!isNumber(this.props.value)) return null
    return (
      <Money {...props} onKeyDown={onEnter} />
    );
  }
}

export default InputMoney
