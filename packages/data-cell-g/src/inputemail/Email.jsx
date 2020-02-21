import React from 'react'
import { AutoComplete } from 'antd'
import { compose, withState, defaultProps, withProps, lifecycle } from 'recompose'

import { Group } from '../input'
import { withEdit } from '../compose'

const emails = ['qq.com', '163.com', '126.com', '139.com', 'gmail.com', 'sohu.com', 'sina.com', 'outlook.com', 'amazon.com', 'yahoo.com', 'hotmail.com']
const emailRegexp = /^[a-zA-Z_\-0-9\u4e00-\u9fa5]+(\.[a-zA-Z_\-0-9\u4e00-\u9fa5]+)?@([a-zA-Z_\-0-9]{2,10}\.){1,3}[a-zA-Z]{2,10}$/

const withResult = compose(
  withState('list', 'setList', []),
  defaultProps({
    style: {},
    allowClear: true,
    placeholder: "请输入邮箱",
    onChange: () => { }
  }),
  withProps(({ value }) => {
    return {
      confirmable: !value || emailRegexp.test(value), // confirmable控制withEdit组件是否可以点击确定按钮
    }
  }),
  lifecycle({
    componentDidMount() {
      const { value, onChange } = this.props
      if (value && !emailRegexp.test(value)) {
        onChange()
      }
    }
  })
)

@compose(
  withResult,
  withEdit(({ value }) => value)
)
class Email extends React.Component {

  onSearch = (value) => {
    const { setList } = this.props
    let result = null
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = emails.map(domain => `${value}@${domain}`);
    }
    setList(result)
  }

  getDataSource = () => {
    const { list } = this.props
    return list.map(item => (<AutoComplete.Option key={item} value={item}>{item}</AutoComplete.Option>))
  }

  renderSelect = () => {
    const { style: { width, ...style } } = this.props

    return (
      <AutoComplete
        {...this.props}
        style={style}
        className={'gant-select-email'}
        showSearch
        dropdownMatchSelectWidth={false}
        onSearch={this.onSearch}
      >
        {this.getDataSource()}
      </AutoComplete>
    )
  }

  render() {
    const { addonAfter, style: { width }, className } = this.props
    return (
      <Group gant style={{ width }} className={className}>
        {this.renderSelect}
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )

  }
}

export default Email