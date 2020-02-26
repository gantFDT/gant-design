import React from 'react'
import { isNil, isNumber } from 'lodash'
import { InputNumber as AntInputNumber } from 'antd'
import numeral from 'numeral'
import { compose, defaultProps, withProps, toClass } from 'recompose'

import { Group } from '../input'
import { withEdit } from '../compose'
import classnames from 'classnames'

const withInputNumber = compose(
  defaultProps({
    style: {},
    onChange: () => { }
  }),
  withProps(({ value, onChange }) => {
    const notnumber = value && !isNumber(value)
    if (notnumber) {
      onChange(null)
    }
    return {
      value: notnumber ? null : value
    }
  })
)

@compose(
  toClass,
  withInputNumber,
  withEdit(({ value }) => value)
)
class InputNumber extends React.Component {

  getValue = () => {
    const { value } = this.props
    let $value = null
    if (!isNil(value)) {
      $value = numeral(value).value()
    }
    return $value
  }


  render() {
    const { addonAfter, style: { width, ...style }, className,...props } = this.props

    return (
      <Group gant className={className} style={{ width }}>
        <AntInputNumber {...props} style={style} value={this.getValue()} className={classnames('gant-input-number')} />
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default InputNumber