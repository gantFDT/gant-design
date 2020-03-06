import React from 'react'
import { Input } from 'antd'
import { withEdit } from '../compose'

const getText = ({ value }) => value


@withEdit(getText)
class Search extends React.Component {

  static defaultProps = {
    style: {}
  }
  render() {
    const {  onChange, onEnter, style, getPopupContainer, ...props } = this.props
    return (<Input.Search {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
    )
  }

}

export default Search