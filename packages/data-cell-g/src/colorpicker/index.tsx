import React from 'react'
import GantColorPicker from '@color-picker'
import { compose, defaultProps, toClass } from 'recompose'

import { Group } from '../input'
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
  render() {
    const { addonAfter, className, ...props } = this.props

    return (
      <Group gant className={className}>
        <span><GantColorPicker {...props} /></span>
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default ColorPicker;