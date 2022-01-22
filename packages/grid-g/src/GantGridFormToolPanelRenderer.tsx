import { RowClickedEvent } from '@ag-grid-enterprise/all-modules';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import GridManager from './gridManager';

interface GantGridRowFormRendererProps {
  columns?: any[]; //表格列定义
  clickedEvent?: RowClickedEvent; //表格行点击参数
  defaultDrawerWidth?: number; //默认侧边栏宽度
  gridManager?: GridManager; //表格数据管理器
  visible?: boolean; //是否显示
  closeDrawer: () => void; // 关闭侧边栏
  onCellEditChange?: (record: any, fieldName: string, newValue: any, oldValue: any) => any; //表格单元格编辑回调函数
  onCellEditingChange?: (
    record: any,
    fieldName: string,
    newValue: any,
    oldValue: any,
    params?: any,
  ) => any; //表格单元格编辑回调函数
  customDrawerContent?: (params: any) => any; //自定义组件
  editable?: boolean; //表格是否编辑状态
}

export default function GantGridRowFormRenderer(props: GantGridRowFormRendererProps) {
  const {
    columns,
    clickedEvent,
    defaultDrawerWidth = 600,
    gridManager,
    visible,
    closeDrawer,
    onCellEditChange,
    onCellEditingChange,
    customDrawerContent,
    editable,
  } = props;

  const [formWidth, setFormWidth] = useState(defaultDrawerWidth);
  const [distance, setDistance] = useState(0);

  const startPositionRef = useRef(0);
  const mouseDownRef = useRef(false);

  const width = formWidth - distance;

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    mouseDownRef.current = true;
    startPositionRef.current = event.clientX;
  }, []);

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

  if (!visible || !clickedEvent) return null;

  //自定义组件
  const customDrawerContentComponent = customDrawerContent({
    formWidth,
    columns,
    clickedEvent,
    onCellEditChange,
    onCellEditingChange,
    gridManager,
    editable,
    closeDrawer,
    visible,
  });

  return (
    <div className="gant-grid-form-wrapper" style={{ width }}>
      <div className="gant-grid-form-cursor" onMouseDown={onMouseDown}></div>
      {customDrawerContent && customDrawerContentComponent}
    </div>
  );
}
