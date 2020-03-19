import React from 'react'
import GantColorPicker from '@color-picker'
import { compose, defaultProps, toClass } from 'recompose'
import { withEdit } from '../compose'
export interface GantColorPickerProps {
  onChange?: (color?: string) => void;
  value?: string
}
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
class ColorPicker extends React.Component<GantColorPickerProps> {
  static PurePicker: typeof GantColorPicker;
  render() {
    const { ...props } = this.props

    return (
      <GantColorPicker {...props} />
    )
  }

}

ColorPicker.PurePicker = GantColorPicker;
export default ColorPicker;