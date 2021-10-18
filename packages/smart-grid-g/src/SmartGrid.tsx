import React, { useState, useMemo, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Tooltip, Button } from 'antd';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import Grid from '@grid';
import ConfigModal from './config';
import { SmartGridType, SmartGridProps, ViewConfig } from './interface';
import formatSchema, { formatColumnFields } from './formatschema';
import ViewPicker from './viewpicker';
import { useTableConfig, useLocalStorage } from './hooks';
import withKeyevent from '@keyevent';
import Header from '@header';
import { generateUuid, deepCopy4JSON, JSONisEqual } from '@util';
import Receiver from './locale/Receiver';

const viewVersionFormat: string = 'YYYY-MM-DD HH:mm:SSSS';

const GlobalProps: Partial<SmartGridProps<any>> = {}

export const setProps = (extraProps: Partial<SmartGridProps<any>>) => {
  Object.assign(GlobalProps, extraProps)
}

const GetLocale = ({setLocale}) => {
  return (
    <Receiver>
      {
        (locale) => {
          setLocale(locale)
          return null
        }
      }
    </Receiver>
  )
}

function SmartGrid<T>(props: SmartGridProps<T>): React.ReactElement {
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

    customViews: customViewsProp,
    companyViews: companyViewsProp,
    lastViewKey: lastViewKeyProp,
    onCustomViewsChange,
    onCompanyViewsChange,
    companyViewAuth,
    userId,

    getCustomViews,
    getCompanyViews,
    setCustomViews: setCustomViewsProp,
    setCompanyViews: setCompanyViewsProp,

    initView,
    showDisplayConfig = false,
    prefixCls: customizePrefixCls,
    height,
    style,
    hideHeader = false,
    onReady,
    ...restProps
  } = Object.assign({}, GlobalProps, props);

  const [locale,setLocale] = useState(null)
  const { columns, systemViews } = useMemo(() => formatSchema(schema, originGridKey,locale), [schema,locale]);
  const [baseView] = systemViews;
  const [gridKey, setGridKey] = useState(originGridKey);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [activeView, setActiveView] = useState<ViewConfig>(baseView as ViewConfig);
  const { panelConfig } = activeView;
  const [lastViewKey, setLastViewKey] = useLocalStorage<string>(`grid-last-view-key:${originGridKey}:${userId}`, '');
  const [customViews, setCustomViews] = useLocalStorage<ViewConfig[]>(`grid-custom-views:${originGridKey}:${userId}`, [] as ViewConfig[]);
  const [companyViews, setCompanyViews] = useLocalStorage<ViewConfig[]>(`grid-company-views:${originGridKey}`, [] as ViewConfig[]);

  const apiRef: any = useRef(null)
  const managerRef: any = useRef(null)

  //Grid渲染完成之后的回调方法
  const handleReady = useCallback((params, manager) => {

    apiRef.current = params
    managerRef.current = manager

    onReady && onReady(params, manager)
  }, [onReady])

  useEffect(() => {
    customViewsProp && setCustomViews(customViewsProp)
  }, [customViewsProp])

  useEffect(() => {
    companyViewsProp && setCompanyViews(companyViewsProp)
  }, [companyViewsProp])

  const originCustomViewsRef = useRef(null);
  const originCompanyViewsRef = useRef(null);
  useEffect(() => {
    if (getCustomViews) {
      getCustomViews(`grid-custom-views:${originGridKey}:${userId}`).then(views => {
        originCustomViewsRef.current = deepCopy4JSON(views)
        setCustomViews(views)
      })
    }
  }, [originGridKey, getCustomViews])

  useEffect(() => {
    if (getCompanyViews) {
      getCompanyViews(`grid-company-views:${originGridKey}`).then(views => {
        originCompanyViewsRef.current = deepCopy4JSON(views)
        setCompanyViews(views)
      })
    }
  }, [originGridKey, getCompanyViews])

  /** 直接设置视图配置 */
  useEffect(() => {
    if (viewSchema) {
      setActiveView({
        ...activeView,
        ...viewSchema
      });
    }
  }, [viewSchema]);

  /** 切换初始视图 */
  useEffect(() => {
    let usedView;
    const [baseView] = systemViews;
    const viewKey = lastViewKeyProp || lastViewKey;

    if(!originGridKey){
      usedView = initView;
    }else{
      usedView = initView || [...systemViews, ...companyViews, ...customViews].find((sV: ViewConfig) => sV.viewId === viewKey);
    }

    if (!usedView) {
      usedView = baseView;
    }

    setActiveView(cloneDeep(usedView));
    if (viewKey !== usedView.viewId)
      setLastViewKey(usedView.viewId);
    // onViewChange && onViewChange(usedView); 接口自定义视图，customViewsProp属性冲突
  }, [systemViews, customViews, companyViews, lastViewKey, lastViewKeyProp]);

  /** 手动切换视图 */
  const handlerChangeView = useCallback(view => {
    if(view.viewId === lastViewKey) return;
    managerRef.current && managerRef.current.clearLocalStorageColumns()
    onViewChange && onViewChange(view);
    setLastViewKey(view.viewId);
  }, [originGridKey, lastViewKey, onViewChange]);

  /** 保存自定义、共享视图 */
  const handlerSaveViews = useCallback((params) => {
    const { views, operateView, hideModal } = params;
    if (operateView.viewId.startsWith('company')) {
      onCompanyViewsChange && onCompanyViewsChange(views)
      setCompanyViewsProp && setCompanyViewsProp(`grid-company-views:${originGridKey}`, views)
      setCompanyViews(views);
    } else {
      onCustomViewsChange && onCustomViewsChange(views)
      setCustomViewsProp && setCustomViewsProp(`grid-custom-views:${originGridKey}:${userId}`, views)
      setCustomViews(views);
    }
    hideModal && hideModal();
  }, []);

  /** 修改视图 */
  const handlerSaveConfig = useCallback(config => {
    const newView = { ...config }
    newView.version = moment().format(viewVersionFormat);
    setLastViewKey(newView.viewId)
    const viewList = newView.viewId.startsWith('company') ? companyViews : customViews;
    const curViewIndex = viewList.findIndex((cV: ViewConfig) => cV.viewId === newView.viewId);
    if (~curViewIndex) {
      viewList[curViewIndex] = newView;
    }
    handlerSaveViews({
      operateView: newView,
      type: 'edit',
      views: [...viewList]
    });
    setConfigModalVisible(false);
  }, [customViews, companyViews]);

  /** 另存视图 */
  const onViewSaveAs = useCallback((vals, hideModal) => {
    const { type, name, panelConfig } = vals;
    const newView: ViewConfig = {
      viewId: `${type}-${userId}-${generateUuid(8)}`,
      name,
      version: moment().format(viewVersionFormat),
      panelConfig,
    };
    const oldViews = type === 'company' ? companyViews : customViews;
    handlerSaveViews({
      operateView: newView,
      type: 'add',
      views: [
        ...oldViews,
        newView
      ]
    });
    setLastViewKey(newView.viewId);
    hideModal && hideModal();
    setConfigModalVisible(false);
  }, [customViews, companyViews, userId]);

  const handleSync = useCallback(() => {
    const columnFieldsMap = activeView.panelConfig.columnFields.reduce((memo, columnField) => ({
      ...memo,
      [columnField.fieldName]: columnField
    }), {})

    const columnDefs = managerRef.current.agGridColumnApi.getColumnState().filter(def => {
      return def.colId !== 'defalutSelection' && def.colId !== 'g-index'
    });

    columnDefs.sort((prev, next) => {
      if (
        prev.pinned === 'left' && next.pinned !== 'left' ||
        prev.pinned !== 'right' && next.pinned === 'right'
      ) {
        return -1;
      }
    })

    activeView.panelConfig.columnFields = columnDefs.map(columnDef => Object.assign({}, columnFieldsMap[columnDef.colId], {
      fixed: columnDef.pinned,
      sort: columnDef.sort,
      sortIndex: columnDef.sortIndex,
      hide: columnDef.hide,
      width: columnDef.width
    }))

    handlerSaveConfig(activeView)
  }, [activeView])

  const [finalColumns] = useMemo(() => useTableConfig({
    tableConfig: panelConfig,
    columns,

    tableKey: originGridKey,
  }), [originGridKey,panelConfig,columns]);

  // 动态列修改用户自定义视图
  useEffect(() => {
    setCustomViews((_customViews: ViewConfig[]) => {
      for (const _customView of _customViews) {
        const __columnFields = _customView.panelConfig.columnFields;
        _customView.panelConfig.columnFields = formatColumnFields(__columnFields, columns)
      }

      if (setCustomViewsProp && originCustomViewsRef.current && !JSONisEqual(originCustomViewsRef.current, _customViews)) {
        setCustomViewsProp(`grid-custom-views:${originGridKey}:${userId}`, _customViews)
      }

      return [..._customViews];
    })
    setCompanyViews((_companyViews: ViewConfig[]) => {
      for (const _companyView of _companyViews) {
        const __columnFields = _companyView.panelConfig.columnFields;
        _companyView.panelConfig.columnFields = formatColumnFields(__columnFields, columns)
      }

      if (setCompanyViewsProp && originCompanyViewsRef.current && !JSONisEqual(originCompanyViewsRef.current, _companyViews)) {
        setCompanyViewsProp(`grid-company-views:${originGridKey}`, _companyViews)
      }

      return [..._companyViews];
    })
  }, [columns, originGridKey, setCustomViewsProp, setCompanyViewsProp])

  useEffect(() => {
    setGridKey('gridKey:' + originGridKey + ':' + activeView.viewId +':' + activeView.version);
  }, [finalColumns, originGridKey, activeView])

  const titleRef = useRef(null);

  const TableTitle = useMemo(() => (
    <Receiver>
      {(locale) => <ViewPicker
        viewName={activeView.name}
        viewId={activeView.viewId}
        userId={userId}
        customViews={customViews}
        companyViews={companyViews}
        systemViews={systemViews}
        switchActiveView={handlerChangeView}
        updateView={handlerSaveViews}
        withoutAnimation={withoutAnimation}
        splitLine={!!title}
        config={
          <>
            <Tooltip title={locale.sync}>
              <Button
                size="small"
                icon="sync"
                style={{marginRight: 5}}
                onClick={handleSync}
                disabled={activeView.viewId.startsWith('system')}
              />
            </Tooltip>
            <Tooltip title={locale.config}>
              <Button
                size="small"
                icon="setting"
                style={{marginRight: 0}}
                onClick={setConfigModalVisible.bind(null, true)}
              />
            </Tooltip>
          </>
        }
        getPopupContainer={() => titleRef.current || document.body}
      />}
    </Receiver>
  ), [activeView, customViews, companyViews, systemViews, titleRef, title, userId]);

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
  ), [headerRight, onReload]);

  const gridHeight = useMemo(() => {
    if (!height) return;
    if (hideHeader) return height;
    return typeof height !== 'number' ? `calc(${height} - 30px)` : height - 30;
  }, [height, hideHeader])

  return (
    <div className="gant-smart-table-wrapper" style={{ ...style, height }}>
      <GetLocale setLocale={setLocale}/>
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
            height={
              gridHeight
            }
            onReady={handleReady}
            key={originGridKey ? gridKey : undefined}
            {...restProps}
          />
        )
      }
      <ConfigModal
        visible={configModalVisible}
        originColumns={columns}
        withoutAnimation={withoutAnimation}
        userId={userId}
        companyViewAuth={companyViewAuth}
        showDisplayConfig={showDisplayConfig}
        dataSource={activeView}
        gridKey={originGridKey}
        customViews={customViews}
        companyViews={companyViews}
        systemViews={systemViews}
        onSaveViews={handlerSaveViews}
        onSaveAs={onViewSaveAs}
        onOk={handlerSaveConfig}
        onCancel={() => setConfigModalVisible(false)}
        onViewChange={onViewChange}
      />
    </div>
  );
}

const SmartGridFn: SmartGridType = SmartGrid;

export default SmartGridFn;
