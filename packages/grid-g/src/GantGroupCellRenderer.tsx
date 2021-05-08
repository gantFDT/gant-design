import React, { useMemo, memo, useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import classnames from 'classnames';
import { ICellRendererParams, RowNode } from '@ag-grid-community/core';
import { Icon } from 'antd';
import { stopPropagationForAgGrid } from './utils';
import { isEqualObj } from './gridManager/utils';
export interface GantGroupCellRendererProps extends ICellRendererParams {
  render?: (showValue: any, data: any, rowIndex: number, params: ICellRendererParams) => any;
  showFolder?: boolean;
  [propsname: string]: any;
}

interface GantGroupCellRendererState {
  expanded: boolean;
  treeDataType: 'sync' | 'async' | 'none' | string;
  hasChildren: boolean;
}

function rowIndexChanged(params) {
  const node = params.node;
  node.gridApi.refreshCells({
    columns: ['g-index'],
    rowNodes: [node],
    force: true,
  });
}

export default memo(
  forwardRef(function GantGroupCellRendererCompoent(props: GantGroupCellRendererProps, ref: any) {
    const {
      node,
      api,
      data,
      context: { serverDataRequest, getDataPath, treeData, isServerSideGroup, getRowNodeId },
      render,
      value,
      valueFormatted,
      showFolder = true,
      rowIndex,
      customIcon,
    } = props;
    const getTreeDataInfo = useCallback(
      (node: RowNode) => {
        const { expanded: nodeExpanded, childrenAfterFilter = [], data } = node;
        const hasChildren =
          (childrenAfterFilter.length > 0 || (isServerSideGroup && isServerSideGroup(data))) &&
          treeData;
        const treeDataType =
          childrenAfterFilter.length > 0
            ? 'sync'
            : isServerSideGroup && isServerSideGroup(data)
            ? 'async'
            : 'none';
        const expanded = nodeExpanded && treeDataType == 'sync';
        return {
          hasChildren,
          treeDataType,
          expanded,
        };
      },
      [treeData],
    );
    const [state, setState]: [GantGroupCellRendererState, any] = useState(getTreeDataInfo(node));
    const { hasChildren, expanded, treeDataType } = state;
    const eContracted = useRef<HTMLSpanElement>(null);
    const eExpanded = useRef<HTMLSpanElement>(null);

    const renderIcon = useMemo(() => {
      if (typeof customIcon === 'function') return customIcon(data);
      if (!customIcon) return null;
      return customIcon
    }, []);
    const onExpend = useCallback((event: MouseEvent) => {
      stopPropagationForAgGrid(event);
      if (node.childrenAfterFilter && node.childrenAfterFilter.length > 0) {
        // setState(state => ({ ...state, expanded: true }));
        return node.setExpanded(true);
      }
      api.showLoadingOverlay();
      serverDataRequest(props, getDataPath(data), () => {
        node.setExpanded(true);
        api.hideOverlay();
      });
    }, []);

    const onClose = useCallback((event: MouseEvent) => {
      stopPropagationForAgGrid(event);
      const { node } = props;
      node.setExpanded(false);
    }, []);
    function expandedChangedCallback(params) {
      const {
        node: { expanded },
      } = params;
      setState(state => ({ ...state, expanded }));
    }
    function childrenCountChangedCallback(params) {
      setState({ ...getTreeDataInfo(params.node) });
    }
    const getLeveLine = useCallback(() => {
      const { level, lastChild } = node;
      const arr = new Array(level).fill(undefined);
      if (!showFolder) return;
      return arr.map((item, index) => {
        const lastLine = index + 1 == arr.length;
        return lastLine ? (
          <span
            key={index + 'folder-icon'}
            className={classnames('gant-level-line', {
              ['gant-folder-line']: hasChildren,
              ['gant-file-line']: !hasChildren && !lastChild,
              ['gant-file-line-last']: !hasChildren && lastChild,
            })}
          ></span>
        ) : (
          <span
            key={index + 'folder-icon'}
            className={classnames('gant-level-line', 'gant-folder-line')}
          ></span>
        );
      });
    }, [node, hasChildren, showFolder]);
    function dataChange(params) {
      if (isEqualObj(data, node.data)) return;
      const newState = getTreeDataInfo(node);
      if (isEqualObj(newState, state)) return;
      setState(newState);
    }
    useEffect(() => {
      if (eContracted.current) {
        eContracted.current.addEventListener('click', onExpend);
      }
      if (eExpanded.current) {
        eExpanded.current.addEventListener('click', onClose);
      }
      node.addEventListener(RowNode.EVENT_EXPANDED_CHANGED, expandedChangedCallback);
      node.addEventListener(RowNode.EVENT_ALL_CHILDREN_COUNT_CHANGED, childrenCountChangedCallback);
      node.addEventListener(RowNode.EVENT_ROW_INDEX_CHANGED, rowIndexChanged);
      // node.addEventListener(RowNode.EVENT_DATA_CHANGED, dataChange);
      return () => {
        if (eContracted.current) {
          eContracted.current.removeEventListener('click', onExpend);
        }
        if (eExpanded.current) {
          eExpanded.current.removeEventListener('click', onClose);
        }
        node.removeEventListener(RowNode.EVENT_EXPANDED_CHANGED, expandedChangedCallback);
        node.removeEventListener(
          RowNode.EVENT_ALL_CHILDREN_COUNT_CHANGED,
          childrenCountChangedCallback,
        );
        node.removeEventListener(RowNode.EVENT_ROW_INDEX_CHANGED, rowIndexChanged);
        // node.addEventListener(RowNode.EVENT_DATA_CHANGED, dataChange);
      };
    }, []);
    const showValue = useMemo(() => {
      return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
    }, [valueFormatted, value]);
    return (
      <span
        className={classnames(
          'ag-cell-wrapper',
          treeData && `ag-row-group-indent-${node.level}`,
          treeData && showFolder && `gant-row-group-indent-${node.level}`,
          ((!hasChildren && !showFolder) || (!hasChildren && node.level == 0)) &&
            treeData &&
            'ag-row-group-leaf-indent ',
        )}
      >
        {getLeveLine()}
        <span
          className={classnames('ag-group-expanded', {
            ['ag-hidden']: hasChildren ? !expanded : true,
          })}
          ref={eExpanded}
        >
          <span className="ag-icon ag-icon-tree-open" unselectable="on"></span>
        </span>
        <span
          className={classnames('ag-group-contracted', {
            ['ag-hidden']: hasChildren ? expanded : true,
          })}
          ref={eContracted}
        >
          <span className="ag-icon ag-icon-tree-closed" unselectable="on"></span>
        </span>
        {showFolder ? (
          hasChildren ? (
            <span className="gant-treedata-icon gant-treedata-folder">
              {renderIcon ? (
                renderIcon
              ) : (
                <Icon type={expanded ? 'folder-open' : 'folder'} theme="filled" />
              )}
            </span>
          ) : node.level > 0 ? (
            <span className="gant-treedata-icon gant-treedata-file">
              {renderIcon ? renderIcon : <Icon type="file" theme="filled" />}
            </span>
          ) : (
            treeData && (
              <span className="gant-treedata-icon gant-treedata-first-file">
                {renderIcon ? renderIcon : <Icon type="file" theme="filled" />}
              </span>
            )
          )
        ) : null}
        <span className="ag-group-value">
          {render ? render(showValue, data, rowIndex, props) : showValue}
        </span>
      </span>
    );
  }),
);
