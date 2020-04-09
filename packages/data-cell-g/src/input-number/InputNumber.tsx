import React from 'react'
import { isNil, isNumber } from 'lodash'
import { InputNumber as AntInputNumber } from 'antd'
import numeral from 'numeral'
import { compose, withProps, toClass, mapProps } from 'recompose'
import { WithBasicProps } from '../compose/withbasic';
import { withEdit } from '../compose'
import { InputNumberProps } from 'antd/lib/input-number'
import classnames from 'classnames'
export interface GantInputNumberProps extends WithBasicProps, InputNumberProps {

}
const withInputNumber = compose(
  withProps(({ value, onChange, format }) => {
    let $value = value;
    const notnumber = value && !isNumber(value);
    if (notnumber) {
      $value = null
    }
    if (!isNil($value)) {
      $value = numeral($value).value()
    }

    return {
      value: $value,
      onChange: (val) => {
        let numberVal = val;
        if (format) {
          numberVal = Number(numeral(numberVal).format(format));
        }
        onChange && onChange(numberVal);
      }
    }
  })
)

@compose(
  toClass,
  withInputNumber,
  withEdit(({ value }) => value),
  mapProps(({
    onEnter,
    ...props
  }) => ({ onPressEnter: onEnter, ...props }))
)
class InputNumber extends React.Component<GantInputNumberProps>{
  render() {
    const { className, ...props } = this.props;
    const numberProps: any = props;
    return (
      <AntInputNumber  {...props} ref={numberProps.wrapperRef} className={classnames('gant-input-number', className)} />
    )
  }

}

export default InputNumber