import React, { useState, useCallback, memo } from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { useIntl } from 'react-intl';

export interface SaveAsModalProps {
    form: any,
    visible?: boolean,
    loading?: boolean,
    onCancel?: () => void,
    onSubmit?: (values: object) => void,
}

function SaveAsModal(props: SaveAsModalProps) {
    const {
        form: { getFieldDecorator, validateFieldsAndScroll },
        visible,
        loading,
        onCancel,
        onSubmit,
        ...nextProps
    } = props;

    const { formatMessage: f } = useIntl();

    const onOk = useCallback(() => {
        validateFieldsAndScroll((errors: any, values: object) => {
            if (errors) return;
            onSubmit && onSubmit(values)
        })
    }, [onSubmit])

    return <Modal
        visible={visible}
        title={f({ id: 'viewSaveAs' })}
        onCancel={onCancel}
        centered
        destroyOnClose
        footer={<div>
            <Button size="small"   icon='close-circle' onClick={onCancel}>{f({ id: 'cancel' })}</Button>
            <Button size="small"   type='primary' icon='save' loading={loading} onClick={onOk}>{f({ id: 'save' })}</Button>
        </div>}
        {...nextProps}
    >
        <Form>
            <Form.Item label={f({ id: 'viewName' })}>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: f({ id: 'viewNameRequired' }) }],
                })(<Input placeholder={f({ id: 'viewNamePlaceholder' })} maxLength={500} />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('isDefault', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(<Checkbox>{f({ id: 'setDefault' })}</Checkbox>)}
            </Form.Item>
        </Form>
    </Modal>
}
export default memo(Form.create<any>()(SaveAsModal));