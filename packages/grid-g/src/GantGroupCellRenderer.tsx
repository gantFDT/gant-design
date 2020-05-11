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
interface GantGroupCellRendererProps extends ICellRendererParams {
  render?: (showValue: any, data: any, rowIndex: number, params: ICellRendererParams) => any;
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
    const { allLeafChildren = [node] } = node;
    node.gridApi.refreshCells({
      columns: ['g-index'],
      force: true,
    });
  }
  eContracted: any;
  eExpanded: any;
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
    } = this.props;
    const { hasChildren, expanded } = this.state;
    const showValue =
      valueFormatted && valueFormatted !== '[object Object]' ? valueFormatted : value;

    return (
      <span
        className={classnames('ag-cell-wrapper', ' ag-row-group', ` ag-row-group-indent-${level}`)}
      >
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
        <span className="ag-group-value" ref="eValue">
          {render ? render(showValue, data, rowIndex, this.props) : showValue}
        </span>
      </span>
    );
  }
}
