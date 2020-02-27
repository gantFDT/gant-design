import React from 'react'
import { isNil, isNumber } from 'lodash'
import { InputNumber as AntInputNumber } from 'antd'
import numeral from 'numeral'
import { compose, defaultProps, withProps } from 'recompose'

import { Group } from '../input'
import { withEdit } from '../compose'
import classnames from 'classnames'
import "./index.less"

const withInputNumber = compose(
  defaultProps({
    style: {},
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
  withInputNumber,
  withEdit(({ value }) => value)
)
class InputNumber extends React.Component {

  render() {
    const { addonAfter, addonBefore, style: { width, ...style }, className, ...props } = this.props

    return (
      <Group gant className={className} style={{ width }}>
        {addonBefore ? <span className="ant-input-group-addon">{addonBefore}</span> : null}
        <AntInputNumber {...props} style={style} className={classnames('gant-input-number')} />
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default InputNumber