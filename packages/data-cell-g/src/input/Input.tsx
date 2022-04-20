import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input';
import React from 'react';
import { WithBasicProps } from '../compose/withbasic';
import DataEditCell from '../data-edit-cell';
import Password from './Password';
import Search from './Search';
import TextArea from './TextArea';
export interface GantInputProps extends InputProps, WithBasicProps {
  strict?: boolean;
  trimmed?: boolean;
  onChange?: (value: any) => void;
  wrapperRef?: any;
}
class Input extends React.Component<GantInputProps> {
  static TextArea: typeof TextArea;
  static Search: typeof Search;
  static Password: typeof Password;
  static defaultProps: GantInputProps = {
    trimmed: false,
  };
  static setDefaultProps = (props: GantInputProps) => {
    Input.defaultProps = props;
  };
  onChange = e => {
    const { onChange, strict } = this.props;
    let { value } = e.target;
    if (strict) {
      value = value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
    }
    onChange && onChange(value);
  };
  onBlur = e => {
    const { onBlur, onChange, trimmed } = this.props;
    onBlur && onBlur(e);
    if (trimmed) {
      let { value } = e.target;
      value = value.trim();
      onChange && onChange(value);
    }
  };
  render() {
    const { strict, wrapperRef, trimmed, ...props } = this.props;
    return (
      <DataEditCell {...props}>
        {({ onEnter, onChange, wrapperRef: ref, ...childProps }) => {
          return (
            <AntInput
              {...childProps}
              ref={wrapperRef}
              onChange={(e: any) => this.onChange(e)}
              onBlur={(e: any) => this.onBlur(e)}
              onPressEnter={onEnter}
              autoComplete={'off'}
              trimmed={typeof trimmed == 'boolean' ? trimmed.toString() : trimmed}
            />
          );
        }}
      </DataEditCell>
    );
  }
}
export default Input;
