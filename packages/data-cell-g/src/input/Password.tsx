import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose'
import { PasswordProps } from 'antd/lib/input/Password'
import { WithBasicProps } from '../compose/withbasic';
import { get } from 'lodash'
export interface GantPasswordProps extends PasswordProps, WithBasicProps {
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
    const { onEnter, wrapperRef, ...props } = _props
    return (<Input.Password
      onKeyDown={onEnter}
      ref={wrapperRef}
      {...props} onChange={e => onChange(e.target.value)} />
    )
  }
}
export default Password