import React, { RefObject, useRef } from 'react';
import classNames from 'classnames';
import './index.less';
import { useVisibility } from './useVisibility';
import { GridApi } from 'ag-grid-community';
import SelectedGrid from '../SelectedGrid';

export interface OperationBarProps {
  ready: boolean;
  apiRef: RefObject<GridApi>;
  left?: React.ReactNode;
  right?: React.ReactNode;
  // 选中的数据
  selectedRows: any[];
  /** 禁用 */
  disabled?: boolean;
  /** 是否强制显示 */
  show?: boolean;
}

export default function OperationBar(props: OperationBarProps) {
  const { left, right } = props;
  const operationBarRef = useRef<HTMLDivElement>(null);
  const { visible, hasToBottom } = useVisibility({
    ...props,
    operationBarRef,
  });

  return (
    <div
      ref={operationBarRef}
      className={classNames('gantd-grid-footer', 'operation', {
        'operation-float': !hasToBottom,
        'operation-border': hasToBottom,
        'operation-hide': !visible,
      })}
    >
      <div className="left-wrapper">{left}</div>
      {right}
    </div>
  );
}
