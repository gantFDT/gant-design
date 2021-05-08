import React, { useState, useMemo, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Tooltip, Button, Spin } from 'antd';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Table from '@table';
import ConfigModal from './config';
import CustomExpandIcon from './customexpandicon';
import { SmartTableType, SmartTableProps, ViewConfig, ViewListProps } from './interface';
import formatSchema from './formatschema';
import ViewPicker, { DefaultView } from './viewpicker';
import { useTableConfig, useLocalStorage } from './hooks';
import withKeyevent from '@keyevent';
import { generateUuid } from '@util';
import Receiver from './locale/Receiver';

const defaultChildrenColumnName: string = 'children';
const defaultRowKey: string = 'id';
const defaultBodyMinHeight: number = 600;
const viewVersionFormat: string = 'YYYY-MM-DD HH:mm:SSSS';
const getPrefixCls = (cls, customizePrefixCls) => customizePrefixCls || 'gant' + cls;

function SmartTable<T>(props: SmartTableProps<T>): React.ReactElement {
  const {
    searchTableCellResizable,
    tableKey,
    title,
    schema,
    viewSchema,
    bindKeys,
    headerRight,
    onReload,
    childrenColumnName = defaultChildrenColumnName,
    // 选择
    rowSelection,
    bodyStyle,
    dataSource,
    bodyMinHeight = defaultBodyMinHeight,
    bodyHeight,
    bodyWidth,
    rowKey = defaultRowKey,
    // 分页
    pagination,
    pageIndex = 1,
    pageSize = 50,
    isGantPageMode = false,
    onPageChange,
    totalCount = 0,
    pageSizeOptions,
    emptyDescription,
    withoutAnimation = false,
    headerProps = {},
    hasExport,
    onViewChange,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('smart-table', customizePrefixCls);

  const { columns, systemViews } = useMemo(() => formatSchema(schema), [schema]);
  const [baseView] = systemViews;
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveAsLoading, setSaveAsLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [updateViewLoading, setUpdateViewLoading] = useState(false);
  const [activeView, setActiveView] = useState<ViewConfig>(baseView as ViewConfig);
  const { panelConfig } = activeView;
  const [defaultView, setDefaultView] = useLocalStorage<DefaultView>(
    `tableKey:${tableKey}`,
    {} as DefaultView,
  );
  const [customViews, setCustomViews] = useLocalStorage<ViewConfig[]>(
    `tableKey:${tableKey}-customViews`,
    [] as ViewConfig[],
  );
  const [viewList, setViewList] = useState<ViewListProps>({
    systemViews: systemViews,
    customViews: customViews || [],
  });
  const [renderable, setRenderable] = useState(true);

  useEffect(() => {
    if (baseView) {
      setActiveView({
        ...activeView,
        ...baseView,
      });
    }
  }, [baseView]);

  const handlerChangeView = useCallback(view => {
    setRenderable(false);
    setTimeout(() => {
      setRenderable(true);
    });
    setActiveView(view);
  }, []);

  useEffect(() => {
    let usedView;

    usedView = [...systemViews, ...customViews].find((sV: ViewConfig) => {
      return sV.viewId === defaultView.viewId;
    });

    if (!usedView) {
      setDefaultView({
        type: 'system',
        viewId: baseView['viewId'],
      });
      usedView = baseView;
    }

    setActiveView(usedView);
    onViewChange && onViewChange(usedView.panelConfig);
  }, []);

  useEffect(() => {
    if (viewSchema) {
      setActiveView({
        ...activeView,
        panelConfig: {
          ...activeView.panelConfig,
          ...viewSchema,
        },
      });
    }
  }, [viewSchema]);

  const handlerSaveViews = useCallback(
    ({ views, hideModal, type }) => {
      let saveLoadngFunc: Function | undefined;
      switch (type) {
        case 'save':
          saveLoadngFunc = setSaveLoading;
          break;
        case 'saveAs':
          saveLoadngFunc = setSaveAsLoading;
          break;
        case 'setDefault':
          saveLoadngFunc = setUpdateViewLoading;
          break;
        case 'delete':
          saveLoadngFunc = setUpdateViewLoading;
          break;
        case 'rename':
          saveLoadngFunc = setRenameLoading;
          break;
      }
      saveLoadngFunc && saveLoadngFunc(true);
      setCustomViews(views);
      saveLoadngFunc && saveLoadngFunc(false);
      setViewList({
        ...viewList,
        customViews: views,
      });
      if (hideModal) {
        hideModal();
      }
    },
    [viewList, tableKey],
  );

  const handlerSaveConfig = useCallback(
    config => {
      setActiveView({ ...config });
      let curViewIndex;
      curViewIndex = viewList.customViews.findIndex(
        (cV: ViewConfig) => cV.viewId === config.viewId,
      );
      if (curViewIndex > -1) {
        viewList.customViews[curViewIndex] = config;
      }
      handlerSaveViews({ views: viewList.customViews });
      setConfigModalVisible(false);
    },
    [viewList],
  );

  // 另存视图
  const onViewSaveAs = useCallback(
    (vals, hideModal) => {
      let newCustomViews = [];
      const { name, panelConfig } = vals;
      const newView: ViewConfig = {
        viewId: generateUuid(12),
        name,
        version: moment().format(viewVersionFormat),
        panelConfig,
      };
      newCustomViews = viewList.customViews.map(item => {
        return {
          ...item,
        };
      });
      newCustomViews.push(newView);
      viewList.customViews = newCustomViews;
      handlerSaveViews({ views: newCustomViews });
      setViewList(viewList);
      setActiveView(newView);
      hideModal();
      setConfigModalVisible(false);
    },
    [viewList],
  );

  const isTreeTable = useMemo(
    () => dataSource && dataSource.some((data: T) => data[childrenColumnName]),
    [dataSource, childrenColumnName],
  );

  const [fakeRowSelection, finalColumns, fakePagination] = useTableConfig({
    tableConfig: panelConfig,
    rowSelection,
    columns,

    pagination,
    pageIndex,
    pageSize,
    isGantPageMode,
    onPageChange,
    totalCount,
    pageSizeOptions,
    tableKey,
  });

  const HeaderRight: ReactNode = (
      <>
        {headerRight}
        {onReload && (
          <Receiver>
            {
              (locale) => <Tooltip title={locale.reload}>
                <Button size="small" icon="reload" className="" onClick={() => onReload()} />
              </Tooltip>
            }
          </Receiver>
        )}
      </>
  );
  const titleRef = useRef(null);

  const TableTitle = useMemo(
    () => (
      <Receiver>
        {(locale) => <ViewPicker
          viewName={activeView.name}
          viewId={activeView.viewId}
          customViews={viewList.customViews}
          systemViews={viewList.systemViews}
          switchActiveView={handlerChangeView}
          updateView={handlerSaveViews}
          renameLoading={renameLoading}
          loading={updateViewLoading}
          withoutAnimation={withoutAnimation}
          splitLine={!!title}
          defaultView={defaultView}
          onDefaultViewChange={setDefaultView}
          config={
            <Tooltip title={locale.config}>
              <Button
                size="small"
                icon="setting"
                className=""
                onClick={() => setConfigModalVisible(true)}
              />
            </Tooltip>
          }
          getPopupContainer={() => titleRef.current || document.body}
        />}
      </Receiver>
    ),
    [activeView, viewList, renameLoading, updateViewLoading, defaultView, titleRef, title],
  );

  const tableHeight = useMemo(
    () =>
      isEmpty(dataSource) ? bodyHeight : panelConfig.heightMode === 'auto' ? 'auto' : bodyHeight,
    [dataSource, panelConfig.heightMode, bodyHeight],
  );

  return (
    <div className="gant-smart-table-wrapper">
      {
        renderable ?
        withKeyevent(
          bindKeys, true
        )(
          <Receiver>
            {(locale) => <Table
              expandIcon={(_prop: any) => CustomExpandIcon(_prop, isTreeTable)}
              {...restProps}
              title={
                <div ref={titleRef}>
                  {title}
                  {TableTitle}
                </div>
              }
              headerRight={HeaderRight}
              headerProps={headerProps}
              columns={finalColumns}
              dataSource={dataSource}
              resizable={searchTableCellResizable}
              bordered={panelConfig.bordered}
              wrap={panelConfig.wrap}
              isZebra={panelConfig.isZebra}
              tableKey={`tableKey:${tableKey}`}
              rowSelection={fakeRowSelection}
              childrenColumnName={childrenColumnName}
              footerDirection={panelConfig.footerDirection}
              bodyStyle={{
                ...bodyStyle,
                minHeight:
                  panelConfig.heightMode === 'auto' || isEmpty(dataSource) ? undefined : bodyHeight,
              }}
              scroll={{ y: tableHeight === 'auto' ? undefined : tableHeight, x: bodyWidth }}
              rowKey={rowKey}
              pagination={fakePagination}
              emptyDescription={emptyDescription || locale.empty}
            />
            }
          </Receiver>
        ) : <Spin>
          <div style={{
            height:
              bodyHeight ?
              typeof bodyHeight === 'string' ? `${bodyHeight.slice(0,-1)} + 29px)` : (bodyHeight + 29) : defaultBodyMinHeight
          }}></div>
        </Spin>
      }
      <ConfigModal
        visible={configModalVisible}
        originColumns={columns}
        withoutAnimation={withoutAnimation}
        dataSource={activeView}
        tableKey={tableKey}
        views={viewList}
        onSaveViews={handlerSaveViews}
        onSaveAs={onViewSaveAs}
        onOk={handlerSaveConfig}
        onCancel={() => setConfigModalVisible(false)}
        onViewChange={onViewChange}
      />
    </div>
  );
}

const SmartTableFn: SmartTableType = SmartTable;

export default SmartTableFn;
