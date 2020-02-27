import React from 'react'
import { isNil, isNumber } from 'lodash'
import { InputNumber as AntInputNumber } from 'antd'
import numeral from 'numeral'
import { compose, defaultProps, withProps, toClass } from 'recompose'

import { Group } from '../input'
import { withEdit } from '../compose'
import classnames from 'classnames'
import "./index.less"

const withInputNumber = compose(
  defaultProps({
    onChange: () => { },
  }),
  withProps(({ value, onChange }) => {
    const notnumber = value && !isNumber(value);
    let $value = value
    if (notnumber) {
      $value = null
      onChange(null)
    }
    if (!isNil($value)) {
      $value = numeral(value).value()
    }
    return {
      value: $value
    }
  })
)

@compose(
  toClass,
  withInputNumber,
  withEdit(({ value }) => value)
)
class InputNumber extends React.Component {

  render() {
    const { addonAfter, addonBefore, className, ...props } = this.props

    return (
      <Group gant className={className}>
        {addonBefore ? <span className="ant-input-group-addon">{addonBefore}</span> : null}
        <AntInputNumber {...props} className={classnames('gant-input-number')} />
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default InputNumber