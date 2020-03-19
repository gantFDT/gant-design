import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose'
import { PasswordProps } from 'antd/lib/input/Password'
import { WidthBasicProps } from '../compose/widthbasic';
import { get } from 'lodash'
export interface GantPasswordProps extends PasswordProps, WidthBasicProps {
  onChange?: (val: any) => void,
}
const getText = ({ value }) => (value ? <div>{Array.from(value).fill('\u25cf')}</div> : '')
@withEdit(getText)
class Password extends React.Component<GantPasswordProps> {
  static defaultProps = {
    style: {}
  }

  render() {
    const { onChange, ...mapProps } = this.props;
    const _props: any = mapProps;
    const { onEnter, ...props } = _props
    return (<Input.Password
      onKeyDown={onEnter}
      {...props} onChange={e => onChange(e.target.value)} />
    )
  }
}
export default Password