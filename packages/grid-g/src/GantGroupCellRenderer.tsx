import React, { Component } from 'react';
import classnames from 'classnames';
import {
  ICellRendererParams,
  IComponent,
  RowNode,
  GroupCellRenderer,
  Utils,
} from 'ag-grid-community';
import { BindAll } from 'lodash-decorators';
import { isEqual } from 'lodash';
import { Icon } from 'antd';
interface GantGroupCellRendererProps extends ICellRendererParams {
  render?: (showValue: any, data: any, rowIndex: number, params: ICellRendererParams) => any;
  showFolder?: boolean;
}
interface GantGroupCellRendererState {
  expanded: boolean;
  treeDataType: 'sync' | 'async' | 'none' | string;
  hasChildren: boolean;
}

@BindAll()
export default class GantGroupCellRenderer extends Component<
  GantGroupCellRendererProps,
  GantGroupCellRendererState
> {
  constructor(props) {
    super(props);
    this.state = this.getTreeDataInfo(props.node);
    props.node.setExpanded(this.state.expanded);
  }

  getTreeDataInfo(node: RowNode) {
    const { expanded: nodeExpanded, childrenAfterFilter = [], data } = node;
    const {
      context: { isServerSideGroup },
    } = this.props;
    const hasChildren =
      childrenAfterFilter.length > 0 || (isServerSideGroup && isServerSideGroup(data));
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
  }

  onExpend(event: MouseEvent) {
    const {
      node,
      context: { serverDataRequest, getDataPath },
      data,
      api,
    } = this.props;
    Utils.stopPropagationForAgGrid(event);
    if (node.childrenAfterFilter && node.childrenAfterFilter.length > 0) {
      this.setState(state => ({ ...state, expanded: true }));
      return node.setExpanded(true);
    }
    api.showLoadingOverlay();
    serverDataRequest(this.props, getDataPath(data), () => {
      node.setExpanded(true);
      api.hideOverlay();
    });
  }

  onClose(event: MouseEvent) {
    Utils.stopPropagationForAgGrid(event);
    const { node } = this.props;
    node.setExpanded(false);
  }
  selectionChangedCallback(params) {
    const {
      node: { expanded },
    } = params;
    this.setState({ expanded });
  }
  dataChangedCallback(params) {
    this.setState({ ...this.getTreeDataInfo(params.node) });
  }
  rowIndexChanged(params) {
    const node = params.node;
    node.gridApi.refreshCells({
      columns: ['g-index'],
      rowNodes: [node],
      force: true,
    });
  }
  eContracted: any;
  eExpanded: any;
  getLeveLine() {
    const {
      node: { level, data, rowIndex, lastChild },
      showFolder = true,
    } = this.props;
    const { hasChildren } = this.state;
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
        <span className={classnames('gant-level-line', 'gant-folder-line')}></span>
      );
    });
  }
  componentDidMount() {
    if (this.eContracted) {
      this.eContracted.addEventListener('click', this.onExpend);
    }
    if (this.eExpanded) {
      this.eExpanded.addEventListener('click', this.onClose);
    }
    this.props.node.addEventListener(RowNode.EVENT_EXPANDED_CHANGED, this.selectionChangedCallback);
    this.props.node.addEventListener(
      RowNode.EVENT_ALL_CHILDREN_COUNT_CHANGED,
      this.dataChangedCallback,
    );
    this.props.node.addEventListener(RowNode.EVENT_ROW_INDEX_CHANGED, this.rowIndexChanged);
  }

  componentWillUnmount() {
    this.props.node.removeEventListener(
      RowNode.EVENT_EXPANDED_CHANGED,
      this.selectionChangedCallback,
    );
    this.props.node.removeEventListener(RowNode.EVENT_DATA_CHANGED, this.dataChangedCallback);
    this.props.node.addEventListener(RowNode.EVENT_ROW_INDEX_CHANGED, this.rowIndexChanged);
    if (this.eContracted) {
      this.eContracted.removeEventListener('click', this.onExpend);
    }
    if (this.eExpanded) {
      this.eExpanded.removeEventListener('click', this.onClose);
    }
    this.props.node.removeEventListener(RowNode.EVENT_ROW_INDEX_CHANGED, this.rowIndexChanged);
  }
  render() {
    const {
      value,
      valueFormatted,
      node: { level, data, rowIndex },
      render,
      showFolder = true,
    } = this.props;
    const { hasChildren, expanded } = this.state;
    const showValue =
      valueFormatted && valueFormatted !== '[object Object]' ? valueFormatted : value;
    return (
      <span
        className={classnames(
          'ag-cell-wrapper',
          `ag-row-group-indent-${level}`,
          showFolder && `gant-row-group-indent-${level}`,
          ((!hasChildren && !showFolder) || (!hasChildren && level == 0)) &&
            'ag-row-group-leaf-indent ',
        )}
      >
        {this.getLeveLine()}
        <span
          className={classnames('ag-group-expanded', {
            ['ag-hidden']: hasChildren ? !expanded : true,
          })}
          ref={ref => (this.eExpanded = ref)}
        >
          <span className="ag-icon ag-icon-tree-open" unselectable="on"></span>
        </span>
        <span
          className={classnames('ag-group-contracted', {
            ['ag-hidden']: hasChildren ? expanded : true,
          })}
          ref={ref => (this.eContracted = ref)}
        >
          <span className="ag-icon ag-icon-tree-closed" unselectable="on"></span>
        </span>
        {showFolder ? (
          hasChildren ? (
            <span className="gant-treedata-icon gant-treedata-folder">
              <Icon type={expanded ? 'folder-open' : 'folder'} theme="filled" />
            </span>
          ) : (
            level > 0 && (
              <span className="gant-treedata-icon gant-treedata-file">
                <Icon type="file" theme="filled" />
              </span>
            )
          )
        ) : null}
        <span className="ag-group-value" ref="eValue">
          {render ? render(showValue, data, rowIndex, this.props) : showValue}
        </span>
      </span>
    );
  }
}
