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
  onCellEditingChange?: (
    record: any,
    fieldName: string,
    newValue: any,
    oldValue: any,
    params?: any,
  ) => any;
  customDrawerContent?: (params: any) => any;
  apiRef?: any;
  columnsRef?: any;
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

  const [formWidth, setFormWidth] = useState(defaultDrawerWidth);
  const [distance, setDistance] = useState(0);
  const [data, setData] = useState({});
  const startPositionRef = useRef(0);

  const mouseDownRef = useRef(false);

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    mouseDownRef.current = true;
    startPositionRef.current = event.clientX;
  }, []);

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

  if (!visible) return null;

  const customDrawerContentComponent = customDrawerContent({
    formWidth,
    columns,
    clickedEvent,
    onCellEditChange,
    onCellEditingChange,
    gridManager
  })

  return (
    <div className="gant-grid-form-wrapper" style={{ width }}>
      <div className="gant-grid-form-cursor" onMouseDown={onMouseDown}></div>
      {customDrawerContent && customDrawerContentComponent}
    </div>
  );
}
