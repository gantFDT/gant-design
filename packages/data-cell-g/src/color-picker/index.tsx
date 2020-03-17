import React from 'react'
import GantColorPicker from '@color-picker'
import { compose, defaultProps, toClass } from 'recompose'

import { withEdit } from '../compose'

const withColorPicker = compose(
  defaultProps({
    onChange: () => { },
    value: '#ffffff'
  })
)

@compose(
  toClass,
  withColorPicker,
  withEdit(({ value }) => value ? <GantColorPicker value={value} edit={false} /> : undefined)
)
class ColorPicker extends React.Component<any> {
  static PurePicker: typeof GantColorPicker;
  render() {
    const { addonAfter, className, ...props } = this.props

    return (
      <span><GantColorPicker {...props} /></span>
    )
  }

}

ColorPicker.PurePicker = GantColorPicker;
export default ColorPicker;