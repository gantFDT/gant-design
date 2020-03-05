import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { notification, Icon, Button } from 'antd';
import Modal from '@modal';
import { ModalProps } from 'antd/lib/modal';
import { deepCopy4JSON } from '@util';
import ViewPicker from '../viewpicker';
import SaveAsModal from './SaveAsModal';
import UIContent from './UIContent';
import { FormattedMessage } from 'react-intl';

interface ConfigModalProps extends ModalProps {
  dataSource: any;
  originColumns: any;
  views: any;
  onSaveViews: (vals: any) => void;
  onSaveAs: (vals: any, cb: () => void) => void;
  tableKey?: string;
  onOk?: (config: any) => void;
  onCancel?: () => void;
  onViewChange?: (viewSchema: any) => void;
}

function ConfigModal(props: ConfigModalProps) {
  const {
    visible,
    originColumns,
    dataSource,
    tableKey,
    views,
    onSaveViews,
    onSaveAs,
    onOk,
    onCancel,
    onViewChange,
    ...restProps
  } = props;

  const [titleModalVisible, setTitleModalVisible] = useState(false);

  const [fakeView, setFakeView] = useState(deepCopy4JSON(dataSource));
  const { panelConfig } = fakeView;
  const f = ({ id }) => <FormattedMessage id={id} />;

  useEffect(() => {
    const view = deepCopy4JSON(dataSource);
    visible && setFakeView(view);
    onViewChange && onViewChange(view.panelConfig);
  }, [dataSource, visible]);

  const handlerClose = useCallback(() => {
    onCancel && onCancel();
  }, []);

  const handlerSave = useCallback(() => {
    if (!panelConfig.columnFields.filter((record: any) => record.checked).length)
      return notification.info({
        message: f({ id: 'saveMessage' }),
      });
    onOk && onOk(fakeView);
  }, [fakeView]);

  const handlerChooseView = useCallback(view => {
    const _view = deepCopy4JSON(view);
    setFakeView(_view);
    onViewChange && onViewChange(_view.panelConfig);
  }, []);

  const isSystem = useMemo(() => fakeView.viewId && fakeView.viewId.includes('sys'), [fakeView]);

  const handleSaveAs = useCallback(
    values => {
      let cb = () => {
        setTitleModalVisible(false);
      };
      onSaveAs &&
        onSaveAs(
          {
            panelConfig: {
              ...fakeView.panelConfig,
            },
            ...values,
          },
          cb,
        );
    },
    [fakeView, onSaveAs],
  );

  const handlerChangeConfig = useCallback(
    config => {
      setFakeView({
        ...fakeView,
        panelConfig: config,
      });
      onViewChange && onViewChange(config);
    },
    [fakeView],
  );

  return (
    <>
      <Modal
        title={
          <>
            <Icon type="setting" />
            <span style={{ margin: '0 8px' }}>{f({ id: 'config' })}</span>
            <ViewPicker
              viewName={fakeView.name}
              viewId={fakeView.viewId}
              customViews={views.customViews}
              systemViews={views.systemViews}
              switchActiveView={handlerChooseView}
              updateView={onSaveViews}
            />
          </>
        }
        visible={visible}
        onCancel={handlerClose}
        destroyOnClose
        isModalDialog
        footer={
          <div>
            <Button size="small" icon="close-circle" onClick={handlerClose}>
              {f({ id: 'cancel' })}
            </Button>
            <Button
              size="small"
              icon="diff"
              onClick={() => {
                setTitleModalVisible(true);
              }}
            >
              {f({ id: 'saveAs' })}
            </Button>
            <Button
              size="small"
              type="primary"
              icon="save"
              onClick={handlerSave}
              disabled={isSystem}
            >
              {f({ id: 'save' })}
            </Button>
          </div>
        }
        {...restProps}
      >
        <UIContent viewConfig={fakeView.panelConfig} onChange={handlerChangeConfig} />
      </Modal>
      <SaveAsModal
        visible={titleModalVisible}
        onSubmit={handleSaveAs}
        onCancel={() => {
          setTitleModalVisible(false);
        }}
      />
    </>
  );
}

export default ConfigModal;
