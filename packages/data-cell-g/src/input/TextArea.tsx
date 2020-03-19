import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose';
import { TextAreaProps } from 'antd/lib/input/TextArea'
import { WidthBasicProps } from '../compose/widthbasic';
export interface GantTextAreaProps extends TextAreaProps, WidthBasicProps {
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
    const { onEnter, ...props } = _props;
    return (
      <Input.TextArea {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
    )
  }

}

export default TextArea