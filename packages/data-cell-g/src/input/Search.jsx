import React from 'react'
import { Input } from 'antd'
import Group from './Group'
import { withEdit } from '../compose'

const getText = ({ value }) => value


@withEdit(getText)
class Search extends React.Component {

  static defaultProps = {
    style: {}
  }

  render() {
    const { addonAfter, onChange, onEnter, style, ...props } = this.props
    return (
      <Group gant style={style}>
        <Input.Search {...props} onChange={e => onChange(e.target.value)} onKeyDown={onEnter} />
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }

}

export default Search