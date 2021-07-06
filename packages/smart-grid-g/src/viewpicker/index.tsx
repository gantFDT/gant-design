import BlockHeader from '@header'
import { Empty, Icon, Popover, Spin } from 'antd'
import classnames from 'classnames'
import _ from 'lodash'
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import Receiver from '../locale/Receiver'
import EditModal from './EditModal'
import Panel from './Panel'
import { getActiveDefaultView } from './utils'

export type ViewType = 'company' | 'system' | 'custom'

export interface UpdateViewProps {
  type: 'delete' | 'rename' // 操作类型
  views: any[] // 修改后的视图列表
  operateView: any // 当前修改的视图（修改后）
  hideModal?: Function // 关闭modal的回调
}

export interface DefaultView {
  type: ViewType // 视图类型
  viewId: string // 视图id
}

export interface ViewProps {
  splitLine?: boolean // 分割线
  viewId: string // 当前视图id
  viewName: string // 视图名称
  defaultView?: DefaultView // 默认视图
  userId?: string // 用户id，共享视图权限判断
  systemViews: any[] // 系统视图
  customViews: any[] // 用户视图
  companyViews?: any[] // 企业视图
  switchActiveView: (view: any) => void // 切换视图的回调
  updateView: (params: UpdateViewProps) => void // 更新视图的回调
  onDefaultViewChange?: (params: DefaultView) => void // 设置默认视图的回调
  renameLoading?: boolean // 重命名loading
  loading?: boolean // 其他更新loading，例如删除
  config?: ReactNode // 配置按钮
  getPopupContainer?: () => HTMLElement
  withoutAnimation?: boolean
}

/**
 * 视图组件
 * @param props
 */
export default function View(props: ViewProps) {
  const {
    viewId,
    userId,
    viewName,
    systemViews = [],
    companyViews = [],
    customViews = [],
    switchActiveView,
    updateView,
    renameLoading,
    splitLine = true,
    loading = false,
    defaultView,
    onDefaultViewChange,
    config,
    getPopupContainer,
    withoutAnimation,
  } = props

  const [showModal, setShowModal] = useState(false)
  const [editViewName, setEditViewName] = useState('')
  const [editView, setEditView] = useState<any>({ name: '' })
  const currentLoading = loading || renameLoading ? true : false
  const [showPop, setShowPop] = useState(false)

  const switchActiveViewImpl = useCallback(
    (viewType: ViewType, view: any) => {
      view.isSystem = viewType !== 'custom'
      switchActiveView && switchActiveView(view)
      setShowPop(false)
    },
    [switchActiveView],
  )

  const updateEditView = (name: string) => {
    if (editView.name === name) {
      setShowModal(false)
      return
    }
    const [viewType, _userId] = editView.viewId.split('-');
    const newViews = [...viewType === 'company' ? companyViews : customViews].map(item => {
      return {
        ...item,
        name: _.isEqual(item, editView) ? name : item.name,
      }
    })
    editView.name = name
    updateView &&
      updateView({
        views: newViews,
        type: 'rename',
        operateView: editView,
        hideModal: () => setShowModal(false),
      })
  }

  const views = useMemo(() => {
    if (systemViews.length === 0 && customViews.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Receiver>{(locale) => <>{locale.noView}</>}</Receiver>}></Empty >
    }

    const activeDefaultView = getActiveDefaultView({
      systemViews,
      companyViews,
      customViews,
      defaultView,
    })

    return (
      <div style={{ margin: '-10px' }}>
        <Spin spinning={currentLoading}>
          <Receiver>
            {(locale) => {
              return <div>
                <BlockHeader
                  title={locale.view}
                  type="icon"
                  bottomLine
                  icon="unordered-list"
                  style={{padding:'0 5px'}}
                  extra={config}
                />
                <Panel
                  title={<>{locale.sysView}</>}
                  views={systemViews}
                  viewType="system"
                  switchActiveView={switchActiveViewImpl.bind(null, 'system')}
                  updateView={updateView}
                  defaultViewId={activeDefaultView.viewId}
                  onDefaultViewChange={onDefaultViewChange}
                />
                {companyViews.length > 0 && (
                  <Panel
                    title={<>{locale.companyView}</>}
                    views={companyViews}
                    viewType="company"
                    userId={userId}
                    switchActiveView={switchActiveViewImpl.bind(null, 'company')}
                    updateView={updateView}
                    setViewName={setEditViewName}
                    setShowModal={setShowModal}
                    setEditView={setEditView}
                    defaultViewId={activeDefaultView.viewId}
                    onDefaultViewChange={onDefaultViewChange}
                  />
                )}
                <Panel
                  viewId={viewId}
                  title={<>{locale.customView}</>}
                  views={customViews}
                  viewType="custom"
                  switchActiveView={switchActiveViewImpl.bind(null, 'custom')}
                  updateView={updateView}
                  setViewName={setEditViewName}
                  setShowModal={setShowModal}
                  setEditView={setEditView}
                  defaultViewId={activeDefaultView.viewId}
                  onDefaultViewChange={onDefaultViewChange}
                />
              </div>
            }}
          </Receiver>
        </Spin>
      </div>
    )
  }, [
    customViews,
    companyViews,
    systemViews,
    viewId,
    currentLoading,
    defaultView,
    onDefaultViewChange,
    updateView,
    switchActiveViewImpl,
    config,
  ])

  return (
    <>
      <Popover
        visible={showPop}
        content={views}
        placement="bottomLeft"
        trigger="click"
        transitionName={withoutAnimation ? "" : undefined}
        overlayStyle={{ zIndex: config ? 11 : 1008 }}
        onVisibleChange={setShowPop}
        getPopupContainer={getPopupContainer}
      >
        <div
          className={classnames('gant-dropbutton', {
            DefaultShow: !config || showPop,
            SplitLine: splitLine,
          })}
        >
          <Receiver>{(locale) => {
            return <>
              {viewName || locale.view}
              <Icon type="down" style={{ marginLeft: '5px' }} />
            </>
          }}</Receiver>
        </div>
      </Popover>
      <EditModal
        withoutAnimation={withoutAnimation}
        loading={renameLoading}
        initValue={editViewName}
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={updateEditView}
        systemViews={systemViews}
        customViews={customViews}
      />
    </>
  )
}
