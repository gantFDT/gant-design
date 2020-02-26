import React, { useCallback } from 'react'
import { Modal, Form, Input } from 'antd'
import _ from 'lodash'
import { useIntl } from 'react-intl'

interface EditModalProps {
  loading: boolean
  showModal: boolean
  setShowModal: Function
  initValue: string
  form: any
  onSubmit: (name: string) => void
}

const EditModal = (props: EditModalProps) => {
  const {
    loading,
    showModal,
    setShowModal,
    initValue = '',
    form: { getFieldDecorator, validateFieldsAndScroll },
    onSubmit
  } = props

  const { formatMessage: f } = useIntl()

  const onOk = useCallback((e: any) => {
    e.stopPropagation()
    validateFieldsAndScroll((errors: any, values: any) => {
      if (errors) return
      onSubmit && onSubmit(values.name)
    })
  }, [onSubmit])

  const stoppropagation = useCallback((e) => {
    if (e) {
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    }
  }, [])

  return (
    <div
      onMouseDown={stoppropagation}
      onDoubleClick={stoppropagation}
      style={{ display: 'inline-block' }}
    >
      <Modal
        okText={f({ id: 'ok' })}
        cancelText={f({ id: 'cancel' })}
        title={f({ id: 'setViewName' })}
        visible={showModal}
        destroyOnClose
        centered
        onCancel={setShowModal.bind(null, false)}
        zIndex={1040}
        onOk={onOk}
        confirmLoading={loading}
        okButtonProps={{ size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
      >
        <Form layout='horizontal'>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: initValue,
              rules: [{ required: true, message: f({ id: 'viewNameRequired' }) }],
            })(<Input placeholder={f({ id: 'viewNamePlaceholder' })} maxLength={500} />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create<any>()(EditModal)
