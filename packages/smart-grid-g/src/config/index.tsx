import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { notification, Icon, Button } from 'antd'
import Modal from '@modal'
import { ModalProps } from 'antd/lib/modal'
import { deepCopy4JSON } from '@util'
import ViewPicker from '../viewpicker'
import SaveAsModal from './SaveAsModal'
import UIContent from './UIContent'
import Receiver from '../locale/Receiver'
interface ConfigModalProps extends ModalProps {
  dataSource: any
  originColumns: any
  views: any
  gridKey: string
  onSaveViews: (vals: any) => void
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
    views,
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

  const [fakeView, setFakeView] = useState(deepCopy4JSON(dataSource))
  const { panelConfig } = fakeView

  useEffect(() => {
    const view = deepCopy4JSON(dataSource)
    visible && setFakeView(view)
    onViewChange && onViewChange(view)
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
    const _view = deepCopy4JSON(view)
    setFakeView(_view)
    onViewChange && onViewChange(_view)
  }, [])

  const isSystem = useMemo(() => fakeView.viewId && fakeView.viewId.includes('sys'), [fakeView])

  const handleSaveAs = useCallback(
    values => {
      let cb = () => {
        setTitleModalVisible(false)
      }
      onSaveAs &&
        onSaveAs(
          {
            panelConfig: {
              ...fakeView.panelConfig,
            },
            ...values,
          },
          cb,
        )
    },
    [fakeView, onSaveAs],
  )

  const handlerChangeConfig = useCallback(
    config => {
      const _view = {
        ...fakeView,
        panelConfig: config,
      }
      setFakeView(_view)
      onViewChange && onViewChange(_view)
    },
    [fakeView],
  )

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
          <Receiver>
            {(locale) => {
              return <>
                <Button size="small" icon="close-circle" onClick={handlerClose}>
                  {locale.cancel}
                </Button>
                <Button
                  size="small"
                  icon="diff"
                  onClick={() => {
                    setTitleModalVisible(true)
                  }}
                >
                  {locale.saveAs}
                </Button>
                <Button
                  size="small"
                  type="primary"
                  icon="save"
                  onClick={handlerSave}
                  disabled={isSystem}
                >
                  {locale.save}
                </Button>
              </>
            }}
          </Receiver>
        }
        {...restProps}
      >
        <UIContent viewConfig={fakeView.panelConfig} gridKey={gridKey} showDisplayConfig={showDisplayConfig} onChange={handlerChangeConfig} />
      </Modal>
      <SaveAsModal
        visible={titleModalVisible}
        onSubmit={handleSaveAs}
        onCancel={() => {
          setTitleModalVisible(false)
        }}
        systemViews={views.systemViews}
        customViews={views.customViews}
      />
    </>
  )
}

export default ConfigModal
