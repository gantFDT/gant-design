import React, { useState, useCallback, memo } from 'react';
import { Modal, Form, Input, Checkbox, Button } from 'antd';

export interface SaveAsModalProps {
    form: any,
    locale: any,
    visible?: boolean,
    loading?: boolean,
    onCancel?: () => void,
    onSubmit?: (values: object) => void,
}

function SaveAsModal(props: SaveAsModalProps) {
    const {
        form: { getFieldDecorator, validateFieldsAndScroll },
        locale,
        visible,
        loading,
        onCancel,
        onSubmit,
        ...nextProps
    } = props;

    const onOk = useCallback(() => {
        validateFieldsAndScroll((errors: any, values: object) => {
            if (errors) return;
            onSubmit && onSubmit(values)
        })
    }, [onSubmit])

    return <Modal
        visible={visible}
        title={locale.viewSaveAs}
        onCancel={onCancel}
        centered
        destroyOnClose
        footer={<div>
            <Button size="small"   icon='close-circle' onClick={onCancel}>{locale.cancel}</Button>
            <Button size="small"   type='primary' icon='save' loading={loading} onClick={onOk}>{locale.save}</Button>
        </div>}
        {...nextProps}
    >
        <Form>
            <Form.Item label={locale.viewName}>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: locale.viewNameRequired }],
                })(<Input placeholder={locale.viewNamePlaceholder} maxLength={500} />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('isDefault', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(<Checkbox>{locale.setDefault}</Checkbox>)}
            </Form.Item>
        </Form>
    </Modal>
}
export default memo(Form.create<any>()(SaveAsModal));