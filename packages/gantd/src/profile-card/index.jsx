import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Tag, Tooltip, Popover } from 'antd';
import classnames from 'classnames'
import { ConfigConsumer } from '../config-provider'
import { Icon } from '@data-cell'

class Item extends Component {
  render() {
    const { value, mode } = this.props
    return <>
      {
        mode === 'tags' ?
          value.map(v => <Tag key={v}>{v}</Tag>) :
          <Tooltip placement="bottomLeft" title={value}>
            <p className="itemText omitdisplay" style={{ color: value ? 'rgba(0,0,0,.9)' : '#ccc' }}>{value || '暂无'}</p>
          </Tooltip>
      }
    </>
  }
}

@Form.create()
class ProfileCard extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    data: PropTypes.object,
    fields: PropTypes.array,
    showAvatar: PropTypes.bool,
    labelAlign: PropTypes.oneOf(['default', 'left']),
    avatarAlign: PropTypes.oneOf(['top', 'left', 'right']),
    extraLeftTop: PropTypes.element,
    extraRightTop: PropTypes.element,
    extraBottom: PropTypes.element,
    backgroundImage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    backgroundBlur: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    layout: PropTypes.shape({
      labelCol: PropTypes.object,
      wrapperCol: PropTypes.object
    }),
    trigger: PropTypes.oneOf(['hover', 'click']),
    placement: PropTypes.string,
    overlayClassName: PropTypes.string,
    onAvatarClick: PropTypes.func
  }

  static defaultProps = {
    labelAlign: 'default',
    showAvatar: true,
    avatarAlign: 'top',
    backgroundBlur: 3,
    layout: {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    },
    trigger: 'hover'
  }


  getField = (fields) => {
    const { form: { getFieldDecorator }, layout, data } = this.props;
    return (edit) => (
      <>
        <Row gutter={24} style={{ marginBottom: '20px', width: '100%' }}>
          {
            fields.map(field => (
              <Col key={field.key}>
                <Form.Item
                  label={field.label}
                  {...layout}
                >
                  {
                    getFieldDecorator(field.key, {
                      initialValue: data[field.key] || '',
                      ...field.options
                    })(
                      <Item {...field} />
                    )
                  }
                </Form.Item>
              </Col>
            ))
          }
        </Row>
      </>
    )
  }

  renderWithConfigConsumer = ({ getPrefixCls }) => {
    const {
      prefixCls: customizePrefixCls,
      data,
      fields,
      showAvatar,
      labelAlign,
      avatarAlign,
      extraLeftTop,
      extraRightTop,
      extraBottom,
      backgroundImage,
      backgroundBlur,
      height,
      trigger,
      children,
      className,
      placement = 'bottom',
      overlayClassName,
      onAvatarClick
    } = this.props;
    const prefixCls = getPrefixCls('profilecard', customizePrefixCls);
    const content = (
      <div className={classnames(prefixCls, avatarAlign, className)} style={{ height: height || 'auto', paddingBottom: extraBottom && 40 }}>
        {extraLeftTop && (
          <div className={`${prefixCls}-fixedlefttop`}>{extraLeftTop}</div>
        )}
        {extraRightTop && (
          <div className={`${prefixCls}-fixedrighttop`}>{extraRightTop}</div>
        )}
        {showAvatar &&
          <div className={classnames(`${prefixCls}-avatarBox`, avatarAlign)}>
            <div className={classnames(`${prefixCls}-avatarBox-bg`, avatarAlign)} style={backgroundImage === false ? {} : { backgroundImage: `url(${backgroundImage || data.avatarUrl})`, backgroundSize: 'cover', filter: `blur(${backgroundBlur}px)` }}></div>
            <div className={classnames(`${prefixCls}-avatarBox-avatar`, avatarAlign)} style={{ backgroundImage: `url(${data.avatarUrl})`, cursor: onAvatarClick ? 'pointer' : 'default' }} onClick={onAvatarClick && onAvatarClick}>
              {!data.avatarUrl && <Icon type="user" />}
            </div>
          </div>
        }
        <div className={classnames(`${prefixCls}-fields`, labelAlign == 'left' && 'dataform', avatarAlign)} style={{ width: children ? 'auto' : 'auto' }}>
          <Form labelAlign={labelAlign}>
            {this.getField(fields)(false)}
          </Form>
        </div>
        {extraBottom && (
          <div className={`${prefixCls}-fixedbottom`}>{extraBottom}</div>
        )}
      </div>
    )

    return (
      data && (children ?
        (
          <Popover placement={placement} content={content} trigger={trigger} overlayClassName={overlayClassName}>
            {children}
          </Popover>
        ) : content
      )
    )
  }

  render() {
    return <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
  }
}

// export 

export default ProfileCard