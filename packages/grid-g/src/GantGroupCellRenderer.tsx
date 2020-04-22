import React, { Component } from 'react';
import classnames from 'classnames';
import { ICellRendererParams, IComponent, RowNode, GroupCellRenderer } from 'ag-grid-community';
import { isEqual } from 'lodash';
interface GantGroupCellRendererProps extends ICellRendererParams {}
interface GantGroupCellRendererState {
  expanded: boolean;
  treeDataType: 'sync' | 'async' | 'none' | string;
  hasChildren: boolean;
}

export default class GantGroupCellRenderer extends Component<
  GantGroupCellRendererProps,
  GantGroupCellRendererState
> {
  constructor(props) {
    super(props);
    this.state = this.getTreeDataInfo(props.node, props.data);
  }

  getTreeDataInfo(node: RowNode, data) {
    const { expanded: nodeExpanded, childrenAfterFilter } = node;
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

  onExpend = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {
      node,
      context: { serverDataRequest },
      data: { treeDataPath },
      api,
    } = this.props;
    event.stopPropagation();
    if (node.childrenAfterFilter.length > 0) {
      this.setState(state => ({ ...state, expanded: true }));
      return node.setExpanded(true);
    }
    api.showLoadingOverlay();
    serverDataRequest(this.props, treeDataPath, () => {
      node.setExpanded(true);
      this.setState(state => ({ ...state, expanded: true }));
      api.hideOverlay();
    });
  };
  onClose = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    const { node } = this.props;
    node.setExpanded(false);
    this.setState(state => ({ ...state, expanded: false }));
  };
  cellChangedCallback = params => {
    const { newData, node, update } = params;
    this.props.api.refreshCells({
	  rowNodes: [node],
	  force:update
    });
  };
  componentDidMount() {
    this.props.node.addEventListener(RowNode.EVENT_DATA_CHANGED, this.cellChangedCallback);
  }
  componentWillUnmount() {
    this.props.node.removeEventListener(RowNode.EVENT_DATA_CHANGED, this.cellChangedCallback);
  }
  render() {
    const {
      value,
      valueFormatted,
      node: { level },
    } = this.props;
    const { hasChildren, expanded } = this.state;
    const showValue = valueFormatted ? this.props.formatValue(this.props) : value;

    return (
      <span
        className={classnames('ag-cell-wrapper', ' ag-row-group', ` ag-row-group-indent-${level}`)}
      >
        {hasChildren &&
          (expanded ? (
            <span className="ag-group-expanded" onClick={this.onClose} ref="eExpanded">
              <span className="ag-icon ag-icon-tree-open" unselectable="on"></span>
            </span>
          ) : (
            <span className="ag-group-contracted" onClick={this.onExpend} ref="eContracted">
              <span className="ag-icon ag-icon-tree-closed" unselectable="on"></span>
            </span>
          ))}
        <span className="ag-group-value" ref="eValue">
          {showValue}
        </span>
      </span>
    );
  }
}
