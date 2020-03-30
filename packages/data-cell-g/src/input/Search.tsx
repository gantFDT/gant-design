import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose'
import { SearchProps } from 'antd/lib/input/Search'
import { WithBasicProps } from '../compose/withbasic';
export interface GantSearchProps extends SearchProps, WithBasicProps {
  onChange?: (val: any) => void
}
const getText = ({ value }) => value
@withEdit(getText)
class Search extends React.Component<GantSearchProps> {
  static defaultProps = {
    style: {}
  }
  render() {
    const { onChange, style, ...mapProps } = this.props;
    const _props: any = mapProps;
    const { onEnter, ...props } = _props;
    return (<Input.Search onKeyDown={onEnter} {...props} onChange={e => onChange(e.target.value)} />
    )
  }

}

export default Search