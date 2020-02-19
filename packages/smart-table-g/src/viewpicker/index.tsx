import './index.less'
import React, { useMemo, useCallback, useState, ReactNode, CSSProperties } from 'react'
import { Icon, Popover, Spin, Empty } from 'antd'
import _ from 'lodash'
import Panel from './Panel'
import EditModal from './EditModal'
import { getActiveDefaultView } from './utils'

const styles = {
  dropbutton: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: '20px',
    display: 'inline-block',
    opacity: 0,
    cursor: 'pointer',
    transition: 'all 0.3s'
  } as CSSProperties,

  DefaultShow: {
    opacity: 1
  } as CSSProperties,

  SplitLine: {
    borderLeft: '1px solid #edebe9',
    paddingLeft: 10,
    marginLeft: 10
  } as CSSProperties
}

export type ViewType = 'company' | 'system' | 'custom'

export interface UpdateViewProps {
  type: 'delete' | 'rename' // 操作类型
  views: any[] // 修改后的视图列表
  operateView: any // 当前修改的视图（修改后）
  hideModal?: Function // 关闭modal的回调
}

export interface DefaultView {
  type: ViewType, // 视图类型
  viewId: string // 视图id
}

export interface ViewProps {
  locale: any;
  splitLine?: boolean // 分割线
  viewId: string // 当前视图id
  viewName: string // 视图名称
  defaultView?: DefaultView // 默认视图
  systemViews: any[] // 系统视图
  customViews: any[] // 用户视图
  companyViews?: any[] // 企业视图
  switchActiveView: (view: any) => void// 切换视图的回调
  updateView: (params: UpdateViewProps) => void // 更新视图的回调
  onDefaultViewChange?: (params: DefaultView) => void // 设置默认视图的回调
  renameLoading?: boolean // 重命名loading
  loading?: boolean // 其他更新loading，例如删除
  config?: ReactNode, // 配置按钮
  getPopupContainer?: () => HTMLElement
}

/**
 * 视图组件
 * @param props
 */
export default function View(props: ViewProps) {
  const {
    locale,
    viewId,
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
  } = props

  const [showModal, setShowModal] = useState(false)
  const [editViewName, setEditViewName] = useState('')
  const [editView, setEditView] = useState({ name: '' })
  const currentLoading = (loading || renameLoading) ? true : false
  const [showPop, setShowPop] = useState(false)

  const switchActiveViewImpl = useCallback((viewType: ViewType, view: any) => {
    view.isSystem = viewType !== 'custom'
    switchActiveView && switchActiveView(view)
  }, [switchActiveView])

  const updateEditView = (name: string) => {
    if (editView.name === name) {
      setShowModal(false)
      return
    }
    let newViews: any[] = []
    newViews = customViews.map(item => {
      return {
        ...item,
        name: _.isEqual(item, editView) ? name : item.name
      }
    })
    editView.name = name
    updateView && updateView({
      views: newViews,
      type: 'rename',
      operateView: editView,
      hideModal: () => setShowModal(false)
    })
  }

  const views = useMemo(() => {
    if (systemViews.length === 0 && customViews.length === 0) {
      return <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={locale.noView}
      >
      </Empty>
    }

    const activeDefaultView = getActiveDefaultView({
      systemViews,
      companyViews,
      customViews,
      defaultView
    })

    return (
      <div style={{ margin: '-10px' }}>
        <Spin spinning={currentLoading} >
          <Panel
            locale={locale}
            title={locale.sysView}
            views={systemViews}
            viewType='system'
            switchActiveView={switchActiveViewImpl.bind(null, 'system')}
            updateView={updateView}
            defaultViewId={activeDefaultView.viewId}
            onDefaultViewChange={onDefaultViewChange}
          />
          {companyViews.length > 0 && (
            <Panel
              locale={locale}
              title={locale.companyView}
              views={companyViews}
              viewType='company'
              switchActiveView={switchActiveViewImpl.bind(null, 'company')}
              updateView={updateView}
              defaultViewId={activeDefaultView.viewId}
              onDefaultViewChange={onDefaultViewChange}
            />
          )}
          <Panel
            locale={locale}
            viewId={viewId}
            title={locale.customView}
            views={customViews}
            viewType='custom'
            switchActiveView={switchActiveViewImpl.bind(null, 'custom')}
            updateView={updateView}
            setViewName={setEditViewName}
            setShowModal={setShowModal}
            setEditView={setEditView}
            defaultViewId={activeDefaultView.viewId}
            onDefaultViewChange={onDefaultViewChange}
            extra={config}
          />
        </Spin>
      </div>
    )
  }, [customViews, companyViews, systemViews, viewId, currentLoading, defaultView, onDefaultViewChange, updateView, switchActiveViewImpl, config])

  return (
    <>
      <Popover
        content={views}
        placement='bottomLeft'
        trigger='click'
        overlayStyle={{ zIndex: config ? 11 : 1008 }}
        onVisibleChange={setShowPop}
        getPopupContainer={getPopupContainer}
      >
        <div 
          style={
            {
              ...styles.dropbutton,
              ...(!config || showPop) ? styles.DefaultShow : {},
              ...splitLine ? styles.SplitLine : {},
            }
          }>
          {viewName || locale.view}
          <Icon type='down' style={{ marginLeft: '5px' }} />
        </div>
      </Popover>
      <EditModal
        locale={locale}
        loading={renameLoading}
        initValue={editViewName}
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={updateEditView}
      />
    </>
  )
}
