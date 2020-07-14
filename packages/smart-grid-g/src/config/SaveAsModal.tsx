import React, { useState, useCallback, memo, useMemo } from 'react'
import { Modal, Form, Input, Checkbox, Button } from 'antd'
import Receiver from '../locale/Receiver'

export interface SaveAsModalProps {
  form: any
  visible?: boolean
  loading?: boolean
  onCancel?: () => void
  onSubmit?: (values: object) => void
  systemViews: any[]
  customViews: any[]
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
    ...nextProps
  } = props

  const allNames = useMemo(() => { return [...systemViews, ...customViews].map(item => (item.name)) }, [systemViews, customViews])

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
            })(<Input placeholder={locale.viewNamePlaceholder} maxLength={500} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isDefault', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>{locale.setDefault}</Checkbox>)}
          </Form.Item>
        </Form>
      </Modal>}
    </Receiver>
  )
}
export default memo(Form.create<any>()(SaveAsModal))
