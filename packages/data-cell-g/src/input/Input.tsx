import React from 'react'
import { Input as AntInput } from 'antd'
import DataEditCell from '../data-edit-cell'
import TextArea from './TextArea'
import Password from './Password'
import Search from './Search'
import { InputProps } from 'antd/lib/input'
import { WidthBasicProps } from '../compose/widthbasic';
export interface GantInputProps extends InputProps, WidthBasicProps {
  strict?: boolean,
  onChange?: (value: any) => void,
}
class Input extends React.Component<GantInputProps> {
  static TextArea: typeof TextArea;
  static Search: typeof Search;
  static Password: typeof Password;
  onChange = (e) => {
    const { onChange, strict } = this.props;
    let { value } = e.target
    if (strict) {
      value = value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')
    }
    onChange && onChange(value)
  }
  render() {
    const { strict, ...props } = this.props;
    return (
      <DataEditCell  {...props}    >
        {
          ({ onEnter, onChange, ...childProps }) => <AntInput
            {...childProps}
            onChange={(e: any) => this.onChange(e)}
            onKeyDown={onEnter}
          />
        }
      </DataEditCell>

    )
  }
}
export default Input