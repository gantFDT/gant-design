import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { notification, Icon, Button } from 'antd'
import Modal from '@modal'
import { ModalProps } from 'antd/lib/modal'
import { cloneDeep } from 'lodash'
import ViewPicker from '../viewpicker'
import SaveAsModal from './SaveAsModal'
import UIContent from './UIContent'
import Receiver from '../locale/Receiver'
interface ConfigModalProps extends ModalProps {
  dataSource: any
  originColumns: any
  systemViews: any[]
  customViews: any[]
  companyViews: any[]
  gridKey: string
  onSaveViews: (vals: any) => void
  companyViewAuth?: boolean,
  userId?: string,
  withoutAnimation?: boolean,
  showDisplayConfig?: boolean,
  onSaveAs: (vals: any, cb: () => void) => void;
  onOk?: (config: any) => void;
  onCancel?: () => void;
  onViewChange?: (viewSchema: any) => void;
}

function ConfigModal(props: ConfigModalProps) {
  const {
    visible,
    originColumns,
    dataSource,
    systemViews,
    customViews,
    companyViews,
    companyViewAuth,
    userId,
    onSaveViews,
    onSaveAs,
    gridKey,
    onOk,
    onCancel,
    onViewChange,
    withoutAnimation,
    showDisplayConfig,
    ...restProps
  } = props

  const [titleModalVisible, setTitleModalVisible] = useState(false)
  const [modalHeight, setModalHeight] = useState(0)

  const [fakeView, setFakeView] = useState(cloneDeep(dataSource))
  const { panelConfig } = fakeView

  useEffect(() => {
    const view = cloneDeep(dataSource)
    visible && setFakeView(view)
    // onViewChange && onViewChange(view) 接口自定义视图，customViewsProp属性冲突
    const onselectstart = (event) => {
      event.returnValue = false;
    }
    document.addEventListener('selectstart', onselectstart)
    return () => {
      document.removeEventListener('selectstart', onselectstart)
    }
  }, [dataSource, visible])

  const handlerClose = useCallback(() => {
    onCancel && onCancel()
  }, [])

  const handlerSave = useCallback(() => {
    if (!panelConfig.columnFields.filter((record: any) => record.checked).length)
      return notification.info({
        message: <Receiver>{(locale) => <>{locale.saveMessage}</>}</Receiver>,
      })
    onOk && onOk(fakeView)
  }, [fakeView])

  const handlerChooseView = useCallback(view => {
    const _view = cloneDeep(view)
    setFakeView(_view)
    onViewChange && onViewChange(_view)
  }, [])

  const handleModalSizeChange = useCallback((width, height) => {
    setModalHeight(height)
  },[])

  const saveDisabled = useMemo(() => {
    if (fakeView.viewId.startsWith('system')) return true;
    const [viewType, _userId] = fakeView.viewId.split('-');
    if (viewType === 'company' && _userId !== userId) {
      return true;
    }
    return false;
  }, [fakeView, userId])

  const handleSaveAs = useCallback(values => {
    const cb = () => {
      setTitleModalVisible(false)
    }
    onSaveAs && onSaveAs({
      panelConfig: {
        ...fakeView.panelConfig,
      },
      ...values,
    }, cb)
  }, [fakeView, onSaveAs])

  const handlerChangeConfig = useCallback(config => {
    const _view = {
      ...fakeView,
      panelConfig: config,
    }
    setFakeView(_view)
    // onViewChange && onViewChange(_view)
  }, [fakeView])

  return (
    <>
      <Modal
        transitionName={withoutAnimation ? "" : undefined}
        maskTransitionName={withoutAnimation ? "" : undefined}
        title={
          <>
            <Icon type="setting" />
            <Receiver>{(locale) => <span style={{ margin: '0 8px' }}>{locale.config}</span>}</Receiver>
            <ViewPicker
              viewName={fakeView.name}
              withoutAnimation={withoutAnimation}
              viewId={fakeView.viewId}
              customViews={customViews}
              companyViews={companyViews}
              systemViews={systemViews}
              switchActiveView={handlerChooseView}
              updateView={onSaveViews}
            />
          </>
        }
        visible={visible}
        onCancel={handlerClose}
        onSizeChange={handleModalSizeChange}
        destroyOnClose
        isModalDialog
        footer={
          <Receiver>
            {(locale) => {
              return <>
                <Button size="small" icon="close-circle" onClick={handlerClose}>
                  {locale.cancel}
                </Button>
                <Button
                  size="small"
                  icon="diff"
                  onClick={setTitleModalVisible.bind(null, true)}
                >
                  {locale.saveAs}
                </Button>
                <Button
                  size="small"
                  type="primary"
                  icon="save"
                  onClick={handlerSave}
                  disabled={saveDisabled}
                >
                  {locale.save}
                </Button>
              </>
            }}
          </Receiver>
        }
        {...restProps}
      >
        <UIContent height={modalHeight} viewConfig={fakeView.panelConfig} gridKey={gridKey} showDisplayConfig={showDisplayConfig} onChange={handlerChangeConfig} />
      </Modal>
      <SaveAsModal
        visible={titleModalVisible}
        onSubmit={handleSaveAs}
        onCancel={setTitleModalVisible.bind(null, false)}
        systemViews={systemViews}
        customViews={customViews}
        companyViews={companyViews}
        companyViewAuth={companyViewAuth}
      />
    </>
  )
}

export default React.memo(ConfigModal)
