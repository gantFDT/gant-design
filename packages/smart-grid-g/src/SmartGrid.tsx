import React, { useState, useMemo, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Tooltip, Button } from 'antd';
import moment from 'moment';
import Grid from '@grid';
import ConfigModal from './config';
import { SmartTableType, SmartTableProps, ViewConfig, ViewListProps } from './interface';
import ViewPicker from './viewpicker';
import { useGridSchema } from './hooks';
import withKeyevent from '@keyevent';
import Header from '@header';
import { generateUuid } from '@util';
import Receiver from './locale/Receiver';

const viewVersionFormat: string = 'YYYY-MM-DD HH:mm:SSSS';

function SmartTable<T>(props: SmartTableProps<T>): React.ReactElement {
  const {
    gridKey: originGridKey,
    title,
    schema: gridSchema,
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

  const {
    gridColumns,
    originColumns,
    currentView,
    setCurrentView,
    systemViews,
    customViews,
    setCustomViews
  } = useGridSchema(originGridKey, gridSchema)

  const [configModalVisible, setConfigModalVisible] = useState(false);

  const { panelConfig = {} } = currentView;
  const [viewList, setViewList] = useState<ViewListProps>({ systemViews, customViews});

  const apiRef: any = useRef(null)
  const managerRef: any = useRef(null)

  //Grid渲染完成之后的回调方法
  const handleReady = useCallback((params, manager) => {
    apiRef.current = params
    managerRef.current = manager
    onReady && onReady(params, manager)
  }, [onReady])

  const handlerChangeView = useCallback(view => {
    managerRef.current && managerRef.current.clearLocalStorageColumns()
    setCurrentView(view);
  }, [originGridKey]);

  useEffect(() => {
    setCurrentView(initView);
    onViewChange && onViewChange(initView);
  }, [initView]);

  useEffect(() => {
    if (viewSchema) {
      setCurrentView(viewSchema);
    }
  }, [viewSchema]);
  
  const handlerSaveViews = useCallback(({ views, hideModal }) => {
    setCustomViews(views);
    setViewList({ ...viewList, customViews: views });
    hideModal && hideModal();
  }, [viewList]);

  const handlerSaveConfig = useCallback(config => {
    config.version = moment().format(viewVersionFormat);
    setCurrentView({ ...config });
    let curViewIndex;
    curViewIndex = viewList.customViews.findIndex((cV: ViewConfig) => cV.viewId === config.viewId);
    if (~curViewIndex) {
      viewList.customViews[curViewIndex] = config;
    }
    handlerSaveViews({ views: viewList.customViews });
    setConfigModalVisible(false);
  }, [viewList]);

  // 另存视图
  const onViewSaveAs = useCallback((vals, hideModal) => {
    let newCustomViews = [];
    const { name, panelConfig } = vals;
    const newView: ViewConfig = {
      viewId: generateUuid(12),
      name,
      version: moment().format(viewVersionFormat),
      panelConfig,
    };
    newCustomViews = viewList.customViews.map(Object.assign.bind(null, {}));
    newCustomViews.push(newView);
    viewList.customViews = newCustomViews;
    handlerSaveViews({ views: newCustomViews });
    setViewList(viewList);
    setCurrentView(newView);
    hideModal();
    setConfigModalVisible(false);
  }, [viewList]);

  const gridKey = useMemo(() => {
    const columnKeys = gridColumns.map(column => column.fieldName).join();
    return `grid-key:${originGridKey}-${currentView.viewId}-${currentView.version}-${columnKeys}`;
  },[gridColumns, originGridKey, currentView])

  const titleRef = useRef(null);

  const TableTitle = useMemo(
    () => (
      <Receiver>
        {(locale) => <ViewPicker
          viewName={currentView.name}
          viewId={currentView.viewId}
          customViews={viewList.customViews}
          systemViews={viewList.systemViews}
          switchActiveView={handlerChangeView}
          updateView={handlerSaveViews}
          withoutAnimation={withoutAnimation}
          splitLine={!!title}
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
    [currentView, viewList, titleRef, title],
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
            columns={gridColumns}
            suppressRowClickSelection={!panelConfig.clickable}
            height={gridHeight}
            onReady={handleReady}
            gridKey={gridKey}
            key={gridKey}
            {...restProps}
          />
        )
      }
      <ConfigModal
        visible={configModalVisible}
        originColumns={originColumns}
        withoutAnimation={withoutAnimation}
        showDisplayConfig={showDisplayConfig}
        dataSource={currentView}
        gridKey={originGridKey}
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
