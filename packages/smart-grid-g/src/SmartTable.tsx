import React, { useState, useMemo, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Tooltip, Button } from 'antd';
import moment from 'moment';
import Grid from '@grid';
import ConfigModal from './config';
import { SmartTableType, SmartTableProps, ViewConfig, ViewListProps } from './interface';
import formatSchema from './formatschema';
import ViewPicker, { DefaultView } from './viewpicker';
import { useTableConfig, useLocalStorage } from './hooks';
import withKeyevent from '@keyevent';
import Header from '@header';
import { generateUuid } from '@util';
import Receiver from './locale/Receiver';

const viewVersionFormat: string = 'YYYY-MM-DD HH:mm:SSSS';
const getPrefixCls = (cls, customizePrefixCls) => customizePrefixCls || 'gant' + cls;

function SmartTable<T>(props: SmartTableProps<T>): React.ReactElement {
  const {
    tableKey,
    title,
    schema,
    viewSchema,
    bindKeys,
    headerRight,
    onReload,
    dataSource,
    withoutAnimation = false,
    headerProps = {},
    onViewChange,
    initView,
    showDisplayConfig = false,
    prefixCls: customizePrefixCls,
    height,
    style,
    hideHeader = false,
    onReady,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('smart-table', customizePrefixCls);

  const { columns, systemViews } = useMemo(() => formatSchema(schema), [schema]);
  const [baseView] = systemViews;
  const [gridKey, setGridKey] = useState(tableKey);
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

  const apiRef: any = useRef(null)
  const managerRef: any = useRef(null)

  //Grid渲染完成之后的回调方法
  const handleReady = useCallback((params, manager) => {

    apiRef.current = params
    managerRef.current = manager

    onReady && onReady(params, manager)
  }, [onReady])

  useEffect(() => {
    if (baseView) {
      setActiveView({
        ...activeView,
        ...baseView,
      });
    }
  }, [baseView]);

  const handlerChangeView = useCallback(view => {
    setActiveView(view);
  }, []);

  useEffect(() => {
    let usedView;

    usedView = initView || [...systemViews, ...customViews].find((sV: ViewConfig) => {
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
    onViewChange && onViewChange(usedView);
  }, []);

  useEffect(() => {
    if (viewSchema) {
      setActiveView({
        ...activeView,
        ...viewSchema
      });
    }
  }, [viewSchema]);

  // 处理视图修改
  const handleViewChange = useCallback((view) => {
    // apiRef.current && apiRef.current.clearLocalStorageColumns()
    managerRef.current && managerRef.current.clearLocalStorageColumns()
    setTimeout(() => {
      setGridKey('gridKey:'+view.viewId)
      onViewChange && onViewChange(view)
    }, 200);
  },[onViewChange])
  
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

  const [finalColumns] = useTableConfig({
    tableConfig: panelConfig,
    columns,

    tableKey,
  });

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

  const HeaderRightElem: ReactNode = useMemo(()=>(
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
  ),[headerRight, onReload]);

  const gridHeight = useMemo(() => {
    if (hideHeader) { return height }
    let result: string | number
    if (!height) { return }
    if (typeof height !== 'number') {
      result = `calc(${height} - 30px)`
    } else {
      result = height - 30
    }
    return result
  }, [height, hideHeader])

  return (
    <div className="gant-smart-table-wrapper" style={{ ...style, height }}>
      {!hideHeader && <Header
        title={
          <div ref={titleRef}>
            {title}
            {TableTitle}
          </div>
        }
        extra={HeaderRightElem}
        {...headerProps}
      ></Header>}
      {
        withKeyevent(
          bindKeys, true
        )(
          <Grid
            dataSource={dataSource}
            columns={finalColumns}
            suppressRowClickSelection={!panelConfig.clickable}
            height={
              gridHeight
            }
            onReady={handleReady}
            gridKey={gridKey}
            {...restProps}
          />
        )
      }
      <ConfigModal
        visible={configModalVisible}
        originColumns={columns}
        withoutAnimation={withoutAnimation}
        showDisplayConfig={showDisplayConfig}
        dataSource={activeView}
        tableKey={tableKey}
        views={viewList}
        onSaveViews={handlerSaveViews}
        onSaveAs={onViewSaveAs}
        onOk={handlerSaveConfig}
        onCancel={() => setConfigModalVisible(false)}
        onViewChange={handleViewChange}
      />
    </div>
  );
}

const SmartTableFn: SmartTableType = SmartTable;

export default SmartTableFn;
