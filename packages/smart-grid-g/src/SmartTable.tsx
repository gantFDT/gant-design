import React, { useState, useMemo, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Tooltip, Button } from 'antd';
import moment from 'moment';
import Grid from '@grid';
import ConfigModal from './config';
import { SmartTableType, SmartTableProps, ViewConfig, ViewListProps } from './interface';
import formatSchema, { formatColumnFields } from './formatschema';
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
    gridKey: originGridKey,
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

  // const prefixCls = getPrefixCls('smart-table', customizePrefixCls);

  const { columns, systemViews } = useMemo(() => formatSchema(schema, originGridKey), [schema]);
  const [baseView] = systemViews;
  const [gridKey, setGridKey] = useState(originGridKey);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [activeView, setActiveView] = useState<ViewConfig>(baseView as ViewConfig);
  const { panelConfig } = activeView;
  const [lastViewKey, setLastViewKey] = useLocalStorage<string>(`grid-last-view-key:${originGridKey}`, baseView.viewId);
  const [customViews, setCustomViews] = useLocalStorage<ViewConfig[]>(`grid-custom-views:${originGridKey}`, [] as ViewConfig[]);
  const [viewList, setViewList] = useState<ViewListProps>({ systemViews, customViews: customViews || []});

  const apiRef: any = useRef(null)
  const managerRef: any = useRef(null)

  //Grid渲染完成之后的回调方法
  const handleReady = useCallback((params, manager) => {

    apiRef.current = params
    managerRef.current = manager

    onReady && onReady(params, manager)
  }, [onReady])

  const handlerChangeView = useCallback(view => {
    if(view.viewId === lastViewKey) return;
    managerRef.current && managerRef.current.clearLocalStorageColumns()
    setActiveView(view);
    setLastViewKey(view.viewId)
  }, [originGridKey, lastViewKey]);

  useEffect(() => {
    let usedView;
    const [baseView] = systemViews;

    if(!originGridKey){
      usedView = initView
    }else{
      usedView = initView || [...systemViews, ...customViews].find((sV: ViewConfig) => {
        return sV.viewId === lastViewKey;
      });
    }

    if (!usedView) {
      usedView = baseView;
    }

    setActiveView(usedView);
    setLastViewKey(usedView.viewId)
    onViewChange && onViewChange(usedView);
  }, [systemViews, customViews, lastViewKey]);

  useEffect(() => {
    if (viewSchema) {
      setActiveView({
        ...activeView,
        ...viewSchema
      });
    }
  }, [viewSchema]);
  
  const handlerSaveViews = useCallback(
    ({ views, hideModal }) => {
      setCustomViews(views);
      setViewList({
        ...viewList,
        customViews: views,
      });
      if (hideModal) {
        hideModal();
      }
    },
    [viewList],
  );

  const handlerSaveConfig = useCallback(
    config => {
      config.version = moment().format(viewVersionFormat);
      setActiveView({ ...config });
      setLastViewKey(config.viewId)
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
      setLastViewKey(newView.viewId)
      hideModal();
      setConfigModalVisible(false);
    },
    [viewList],
  );

  const [finalColumns] = useTableConfig({
    tableConfig: panelConfig,
    columns,

    tableKey: originGridKey,
  });

  // 动态列修改用户自定义视图
  useEffect(() => {
    setCustomViews((_customViews: ViewConfig[]) => {
      for (const _customView of _customViews) {
        const __columnFields = _customView.panelConfig.columnFields;
        _customView.panelConfig.columnFields = formatColumnFields(__columnFields, columns)
      }
      return [..._customViews];
    })
  }, [columns])

  useEffect(() => {
    const columnKeys = finalColumns.map(_column => _column.fieldName).join('');
    setGridKey('gridKey:' + originGridKey + ':' + activeView.viewId +':' + activeView.version + ':' + columnKeys);
  }, [finalColumns, originGridKey, activeView])

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
    [activeView, viewList, titleRef, title],
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
            gridKey={originGridKey ? gridKey : undefined}
            key={originGridKey ? gridKey : undefined}
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
