import React from 'react';
import { Input } from 'antd';
import { withEdit, } from '../compose';
import { compose, toClass } from 'recompose'
import { InputProps } from 'antd/lib/input'
import { WidthBasicProps } from '../compose/widthbasic';
export interface GantUrlProps extends InputProps, WidthBasicProps {
  onChange?: (val: any) => void
}

const getValue = ({ value }) => {
  // const reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
  const isUrl = /[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;

  if (!isUrl.test(value)) return value // 如果不是网址格式，直接返回

  const reg = /^(ht|f)tps?:\/\//
  if (!reg.test(value)) {
    value = `http://${value}`
  }

  return (
    <a href={value} target='_blank' rel='noopener noreferrer'>{value}</a>
  )
}

/**
 * 普通模式下与Input一样
 */
@compose(
  toClass,
  withEdit(getValue)
)
class Url extends React.Component<GantUrlProps> {
  render() {
    const { onChange, ...mapProps } = this.props;
    const _props: any = mapProps;
    const { onEnter, ...props } = _props;
    return <Input onChange={(e: any) => onChange(e.target.value)} onKeyDown={onEnter}  {...props} />
  }

}
export default Url