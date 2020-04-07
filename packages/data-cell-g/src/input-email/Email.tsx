import React, { Component } from 'react'
import classnames from 'classnames'
import { AutoComplete } from 'antd'
import { compose, withState, defaultProps, withProps, lifecycle } from 'recompose'
import { withEdit } from '../compose'
import { WithBasicProps } from '../compose/withbasic';
export interface GantEmailProps extends WithBasicProps {
  value?: string;
  defaultValue?: string;
  dropdownMenuStyle?: React.CSSProperties;
  autoFocus?: boolean;
  backfill?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean,
  defaultActiveFirstOption?: boolean,
  allowClear?: boolean,
  dropdownClassName?: string,
  className?: string,
  style?: React.CSSProperties,
  placeholder?: string,
}
const emails = ['qq.com', '163.com', '126.com', '139.com', 'gmail.com', 'sohu.com', 'sina.com', 'outlook.com', 'amazon.com', 'yahoo.com', 'hotmail.com']
const emailRegexp = /^[a-zA-Z_\-0-9\u4e00-\u9fa5]+(\.[a-zA-Z_\-0-9\u4e00-\u9fa5]+)?@([a-zA-Z_\-0-9]{2,10}\.){1,3}[a-zA-Z]{2,10}$/

const withResult = compose(
  withState('list', 'setList', []),
  defaultProps({
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
  withEdit(({ value }) => value, 'gant-select-email-dropdown')
)
class Email extends React.Component<any> {
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
    const { dropdownClassName, className, list, wrapperRef, ...props } = this.props;
    return (
      <AutoComplete
        className={classnames('gant-select-email', className)}
        showSearch
        dropdownMatchSelectWidth={false}
        dropdownClassName={classnames('gant-select-email-dropdown', dropdownClassName)}
        {...props}
        onSearch={this.onSearch}
        ref={wrapperRef}

      >
        {this.getDataSource()}
      </AutoComplete>
    )
  }

  render() {
    return this.renderSelect()
  }
}

export default class EmailWrapper extends Component<GantEmailProps>{
  render() {
    return <Email {...this.props} />
  }
}