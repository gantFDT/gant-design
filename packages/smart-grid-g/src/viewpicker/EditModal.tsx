import React, { useCallback } from 'react';
import { Modal, Form, Input } from 'antd';
import _ from 'lodash';
import Receiver from '../locale/Receiver';

interface EditModalProps {
  loading: boolean;
  showModal: boolean;
  setShowModal: Function;
  initValue: string;
  form: any;
  onSubmit: (name: string) => void;
  withoutAnimation?: boolean;
}

const EditModal = (props: EditModalProps) => {
  const {
    loading,
    showModal,
    setShowModal,
    withoutAnimation,
    initValue = '',
    form: { getFieldDecorator, validateFieldsAndScroll },
    onSubmit,
  } = props;


  const onOk = useCallback(
    (e: any) => {
      e.stopPropagation();
      validateFieldsAndScroll((errors: any, values: any) => {
        if (errors) return;
        onSubmit && onSubmit(values.name);
      });
    },
    [onSubmit],
  );

  const stoppropagation = useCallback(e => {
    if (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  }, []);

  return (
    <Receiver>
      {(locale) => <div
        onMouseDown={stoppropagation}
        onDoubleClick={stoppropagation}
        style={{ display: 'inline-block' }}
      >
        <Modal
          okText={locale.ok}
          cancelText={locale.cancel}
          title={locale.setViewName}
          visible={showModal}
          destroyOnClose
          centered
          onCancel={setShowModal.bind(null, false)}
          zIndex={1040}
          onOk={onOk}
          confirmLoading={loading}
          okButtonProps={{ size: 'small' }}
          cancelButtonProps={{ size: 'small' }}
          transitionName={withoutAnimation ? "" : undefined}
        >
          <Form layout="horizontal">
            <Form.Item>
              {getFieldDecorator('name', {
                initialValue: initValue,
                rules: [{ required: true, message: locale.viewNameRequired }],
              })(<Input placeholder={locale.viewNamePlaceholder} maxLength={500} />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>}
    </Receiver>
  );
};

export default Form.create<any>()(EditModal);
