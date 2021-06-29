import React, { useState, useCallback, memo, useMemo } from 'react'
import { Modal, Form, Input, Checkbox, Button, Radio } from 'antd'
import Receiver from '../locale/Receiver'

export interface SaveAsModalProps {
  form: any
  visible?: boolean
  loading?: boolean
  companyViewAuth?: boolean
  onCancel?: () => void
  onSubmit?: (values: object) => void
  systemViews: any[]
  customViews: any[]
  companyViews: any[]
}

function SaveAsModal(props: SaveAsModalProps) {
  const {
    form: { getFieldDecorator, validateFieldsAndScroll },
    visible,
    loading,
    onCancel,
    onSubmit,
    systemViews,
    customViews,
    companyViews,
    companyViewAuth,
    ...nextProps
  } = props

  const allNames = useMemo(() => { return [...systemViews, ...customViews, ...companyViews].map(item => (item.name)) }, [systemViews, customViews, companyViews])

  const onOk = useCallback(() => {
    validateFieldsAndScroll((errors: any, values: object) => {
      if (errors) return
      onSubmit && onSubmit(values)
    })
  }, [onSubmit])

  return (
    <Receiver>
      {(locale) => <Modal
        visible={visible}
        title={locale.viewSaveAs}
        onCancel={onCancel}
        centered
        destroyOnClose
        footer={
          <div>
            <Button size="small" icon="close-circle" onClick={onCancel}>
              {locale.cancel}
            </Button>
            <Button size="small" type="primary" icon="save" loading={loading} onClick={onOk}>
              {locale.save}
            </Button>
          </div>
        }
        {...nextProps}
      >
        <Form>
          <Form.Item label={locale.viewType} style={{marginBottom: 0}}>
            {getFieldDecorator('type', {
              initialValue: 'custom'
            })(
              <Radio.Group size="small" buttonStyle="solid">
                <Radio value="custom">{locale.customView}</Radio>
                { companyViewAuth && <Radio value="company">{locale.companyView}</Radio> }
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label={locale.viewName}>
            {getFieldDecorator('name', {
              rules: [
                {
                  message: locale.viewNameRepeat,
                  validator: function (rule: any, value: string = '', callback: Function) {
                    let res = value.trim()
                    if (!res) {
                      rule.message = locale.viewNameRequired
                      callback(true)
                    } else if (allNames.includes(res)) {
                      callback(true)
                    }
                    callback(undefined)
                  }
                }
              ],
            })(<Input placeholder={locale.viewNamePlaceholder} maxLength={500} autoComplete="off" />)}
          </Form.Item>
        </Form>
      </Modal>}
    </Receiver>
  )
}
export default memo(Form.create<any>()(SaveAsModal))
