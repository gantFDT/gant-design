import './index.less'
import React, { useCallback, ReactNode } from 'react'
import { Icon, Tag, Tooltip, Popconfirm, Empty } from 'antd'
import _ from 'lodash'
import { UpdateViewProps, ViewType, DefaultView } from './index'
import BlockHeader from '@header'

interface PanelProps {
  locale: any
  viewId?: string // 当前视图id
  viewType: ViewType// 视图类型
  title: string // 标题
  views: any[] // 视图列表
  isSystemDefault?: boolean // 是否在系统视图显示默认
  switchActiveView: Function // 切换视图的回调
  updateView: Function // 更新视图的回调
  setShowModal?: Function // 显示修改名称modal的回调
  setViewName?: Function // 修改名称的回调
  setEditView?: Function // 修改当前编辑中的视图回调
  defaultViewId: string // 默认视图id
  onDefaultViewChange: (params: DefaultView) => void // 默认视图更新回调
  extra?: string | ReactNode// 插槽
}

export default (props: PanelProps) => {
  const {
    locale,
    viewId,
    title,
    views,
    viewType,
    switchActiveView,
    updateView,
    setShowModal,
    setViewName,
    setEditView,
    defaultViewId,
    onDefaultViewChange,
    extra
  } = props

  const onViewChange = useCallback((item: any) => {
    switchActiveView && switchActiveView(item)
  }, [switchActiveView])

  // 删除
  const onDelete = useCallback((item: any, e: any) => {
    e.stopPropagation()
    let newViews: any[] = []
    newViews = views.filter(item_ => !_.isEqual(item, item_))
    let res: UpdateViewProps = {
      views: newViews,
      type: 'delete',
      operateView: item
    }
    updateView && updateView(res)
  }, [views, updateView])

  // 重命名
  const onEditView = useCallback((item: any, e: any) => {
    e.stopPropagation()
    setViewName && setViewName(item.name)
    setShowModal && setShowModal(true)
    setEditView && setEditView(item)
  }, [])

  // 设置默认
  const onSetDefault = (type: ViewType, viewId: string) => {
    onDefaultViewChange && onDefaultViewChange({
      type,
      viewId
    })
  }

  return (
    <div className={`gant-smart-table-viewpicker-panel`}>
      <BlockHeader title={title} extra={extra} />
      <ul className="content">
        {views.length === 0 && (<Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={locale.noView}
        >
        </Empty>)}
        {views.map((item) => {
          const { viewId: id, name } = item
          return (
            <li key={name}>
              <div className="leftContent" onClick={onViewChange.bind(null, item)}>
                <span>{name}</span>
                {id === defaultViewId && (
                  <Tag className="tag">&nbsp;{locale.default}</Tag>
                )}
              </div>
              <div className="operates">
                {id !== defaultViewId && (
                  <span
                    className="operate"
                    onClick={onSetDefault.bind(null, viewType, id)}>{locale.setDefault}</span>
                )}
                {viewType === 'custom' && (
                  <>
                    <Tooltip title={locale.rename}>
                      <Icon
                        className={`marginh5 operate`}
                        type='edit'
                        onClick={onEditView.bind(null, item)}
                      />
                    </Tooltip>
                    {viewId !== id && (
                      <Popconfirm
                        placement="topRight"
                        title={locale.confirmDelView}
                        onConfirm={onDelete.bind(null, item)}
                        okText={locale.ok}
                        cancelText={locale.cancel}
                      >
                        <Tooltip title={locale.delete}>
                          <Icon
                            className={`operate delete`}
                            type='delete'
                          />
                        </Tooltip>
                      </Popconfirm>
                    )}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
