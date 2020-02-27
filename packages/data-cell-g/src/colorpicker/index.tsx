import React from 'react'
import GantColorPicker from '@color-picker'
import { compose, defaultProps, toClass } from 'recompose'

import { Group } from '../input'
import { withEdit } from '../compose'

const withColorPicker = compose(
  defaultProps({
    onChange: () => {},
    value: '#ffffff'
  })
)

@compose(
  toClass,
  withColorPicker,
  withEdit(({ value }) => value)
)
class ColorPicker extends React.Component<any> {
  render() {
    const { addonBefore, addonAfter, className, ...props } = this.props

    return (
      <Group gant className={className}>
        {addonBefore ? <span className="ant-input-group-addon">{addonBefore}</span> : null}
        <GantColorPicker {...props}/>
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default ColorPicker;