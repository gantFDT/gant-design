import React, { memo, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import SchemaForm from '@schema-form';
import { Icon, Tooltip } from 'antd';
import { toFormMap } from './utils';
import { GridApi, ColumnApi, RowClickedEvent } from '@ag-grid-enterprise/all-modules';
import GridManager from './gridManager';
import { isEmpty, get } from 'lodash';
interface GantGridRowFormRendererProps {
  columns?: any[];
  clickedEvent?: RowClickedEvent;
  drawerMode?: boolean;
  context?: any;
  defaultDrawerWidth?: number;
  gridManager?: GridManager;
  visible?: boolean;
  closeDrawer: () => void;
  onCellEditChange?: (record: any, fieldName: string, newValue: any, oldValue: any) => any;
  onCellEditingChange?: (record: any, fieldName: string, newValue: any, oldValue: any,params?:any) => any;
  customDrawerContent?: (params: any) => any;
}

export default function GantGridRowFormRenderer(props: GantGridRowFormRendererProps) {
  const {
    columns,
    clickedEvent,
    drawerMode,
    context,
    defaultDrawerWidth = 600,
    gridManager,
    visible,
    closeDrawer,
    onCellEditChange,
    onCellEditingChange,
    customDrawerContent,
  } = props;
  const [ediable, setEditable] = useState(false);
  const [formWidth, setFormWidth] = useState(defaultDrawerWidth);
  const [distance, setDistance] = useState(0);
  const [data, setData] = useState({});
  const startPositionRef = useRef(0);
  const formRef = useRef<any>();
  const mouseDownRef = useRef(false);

  const { schema, customFields, valueMap, translationName } = useMemo(() => {
    if (!drawerMode || isEmpty(clickedEvent))
      return { schema: {}, customFields: {}, valueMap: {}, translationName: [] };
    return toFormMap(columns, {
      ...clickedEvent,
      context: { ...get(clickedEvent, 'context', {}), globalEditable: drawerMode && ediable },
    });
  }, [columns, get(clickedEvent, 'rowIndex'), drawerMode, ediable]);
  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    mouseDownRef.current = true;
    startPositionRef.current = event.clientX;
  }, []);

  useEffect(() => {
    !visible && setEditable(false);
  }, [visible]);
  useEffect(() => {
    if (isEmpty(get(clickedEvent, 'data'))) return;
    setData(get(clickedEvent, 'data'));
  }, [get(clickedEvent, 'rowIndex')]);
  const onMouseUp = useCallback(() => {
    mouseDownRef.current = false;
    startPositionRef.current = 0;
    setFormWidth(formWidth - distance);
    setDistance(0);
  }, [formWidth, distance]);
  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!mouseDownRef.current) return;
    const dis = event.clientX - startPositionRef.current;
    setDistance(dis);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);

  const width = formWidth - distance;

  const uiSchema = useMemo(() => {
    if (width <= 280) return { 'field:col': 24 };
    if (width > 600) return { 'field:col': 8 };
    return { 'field:col': 12 };
  }, [width]);

  const onChange = useCallback(
    async (val, vals, ...ags) => {
      let filed = Object.keys(val)[0];
      if (!formRef.current?.props?.form?.isFieldTouched(filed)) return;
      const index = translationName.indexOf(filed);
      const newValue = val[filed];
      filed = index >= 0 ? filed.replace(/\_/g, '.') : filed;

      const oldValue = get(clickedEvent, `node.data.${filed}`);
      let data = { ...get(clickedEvent, 'node.data', {}), ...vals };

      data = onCellEditingChange
        ? await onCellEditingChange(data, filed, newValue, oldValue)
        : data;

      data = onCellEditChange ? await onCellEditChange(data, filed, newValue, oldValue) : data;
      if (isEmpty(data)) return;
      setData(data);
      gridManager.modify([data]);
    },
    [clickedEvent, onCellEditChange, onCellEditingChange, translationName],
  );

  const formData = useMemo(() => {
    const newData = {};

    const proptypeType = get(schema, 'propertyType', {});

    Object.keys(proptypeType).map(name => {
      const itemData =
        translationName.indexOf(name) >= 0 ? get(data, name.replace(/\_/g, '.')) : data[name];
      newData[name] = itemData;
    });
    return newData;
  }, [data, valueMap, clickedEvent, translationName, schema]);

  if (!drawerMode || !visible) return null;

  return (
    <div className="gant-grid-form-wrapper" style={{ width }}>
      <div className="gant-grid-form-cursor" onMouseDown={onMouseDown}></div>
      {customDrawerContent ? (
        customDrawerContent({ formWidth, columns, clickedEvent })
      ) : (
        <>
          <div className="gant-grid-form-header">
            <Tooltip title="关闭窗口">
              <span onClick={closeDrawer} style={{ padding: '0px 10px', cursor: 'pointer' }}>
                <Icon type="close" />
              </span>
            </Tooltip>

            {!ediable ? (
              <Tooltip title="编辑">
                <div style={{ cursor: 'pointer' }} onClick={() => setEditable(true)}>
                  <Icon type="edit" />
                </div>
              </Tooltip>
            ) : (
              <Tooltip title="取消编辑">
                <div style={{ cursor: 'pointer' }} onClick={() => setEditable(false)}>
                  <Icon type="poweroff" />
                </div>
              </Tooltip>
            )}
          </div>
          <div className="gant-grid-form">
            <SchemaForm
              schema={schema}
              uiSchema={uiSchema}
              onChange={onChange}
              customFields={customFields}
              data={formData}
              key={get(clickedEvent,'rowIndex',-1)}
              ref={formRef}
              editable={ediable}
            />
          </div>
        </>
      )}
    </div>
  );
}
