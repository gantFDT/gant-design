import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose';
import { TextAreaProps } from 'antd/lib/input/TextArea'
import { WithBasicProps } from '../compose/withbasic';
export interface GantTextAreaProps extends TextAreaProps, WithBasicProps {
  onChange?: (val: any) => void
}
const getText = ({ value }) => value ? <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{value}</div> : null
@withEdit(getText)
class TextArea extends React.Component<GantTextAreaProps> {
  static defaultProps = {
    style: {}
  }

  render() {
    const { onChange, ...mapProps } = this.props;
    const _props: any = mapProps;
    const { onEnter, wrapperRef, ...props } = _props;
    return (
      <Input.TextArea {...props} ref={wrapperRef} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
    )
  }

}

export default TextArea