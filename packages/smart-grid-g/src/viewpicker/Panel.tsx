import BlockHeader from '@header';
import { Empty, Icon, Popconfirm, Tooltip } from 'antd';
import _ from 'lodash';
import React, { ReactNode, useCallback } from 'react';
import Receiver from '../locale/Receiver';
import { DefaultView, UpdateViewProps, ViewType } from './index';

interface PanelProps {
  viewId?: string; // 当前视图id
  userId?: string; // 用户id
  viewType: ViewType; // 视图类型
  title: string | ReactNode; // 标题
  views: any[]; // 视图列表
  isSystemDefault?: boolean; // 是否在系统视图显示默认
  switchActiveView: Function; // 切换视图的回调
  updateView: Function; // 更新视图的回调
  setShowModal?: Function; // 显示修改名称modal的回调
  setViewName?: Function; // 修改名称的回调
  setEditView?: Function; // 修改当前编辑中的视图回调
  defaultViewId: string; // 默认视图id
  onDefaultViewChange: (params: DefaultView) => void; // 默认视图更新回调
  extra?: string | ReactNode; // 插槽
}

export default (props: PanelProps) => {
  const {
    viewId,
    userId,
    title,
    views,
    viewType,
    switchActiveView,
    updateView,
    setShowModal,
    setViewName,
    setEditView,
    extra,
  } = props;

  const onViewChange = useCallback(
    (item: any) => {
      switchActiveView && switchActiveView(item);
    },
    [switchActiveView],
  );

  // 删除
  const onDelete = useCallback(
    (item: any, e: any) => {
      e.stopPropagation();
      let newViews: any[] = [];
      newViews = views.filter(item_ => !_.isEqual(item, item_));
      let res: UpdateViewProps = {
        views: newViews,
        type: 'delete',
        operateView: item,
      };
      updateView && updateView(res);
    },
    [views, updateView],
  );

  // 重命名
  const onEditView = useCallback((item: any, e: any) => {
    e.stopPropagation();
    setViewName && setViewName(item.name);
    setShowModal && setShowModal(true);
    setEditView && setEditView(item);
  }, []);

  return (
    <Receiver>
      {(locale) => <div className={`gant-smart-table-viewpicker-panel`}>
        <BlockHeader title={title} extra={extra} type="line" style={{paddingLeft:10,fontWeight:'normal'}}/>
        <ul className="content">
          {views.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={locale.noView}></Empty>
          )}
          {views.map(item => {
            const { viewId: id, name } = item;
            const [ _, _userId ] = id.split('-');
            const editable = viewType === 'custom' || viewType === 'company' && _userId === userId;
            return (
              <li key={name}>
                <div className="leftContent" onClick={onViewChange.bind(null, item)}>
                  <span>{name}</span>
                </div>
                <div className="operates">
                  {editable && (
                    <>
                      <Tooltip title={locale.rename}>
                        <Icon
                          className={`operate`}
                          type="edit"
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
                            <Icon className={`operate delete`} type="delete" />
                          </Tooltip>
                        </Popconfirm>
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>}
    </Receiver>
  );
};
