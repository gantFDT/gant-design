"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _agGridCommunity = require("ag-grid-community");

var _utils = require("./utils");

var _utils2 = require("./gridManager/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(function GantGroupCellRendererCompoent(props, ref) {
  var node = props.node,
      api = props.api,
      data = props.data,
      _props$context = props.context,
      serverDataRequest = _props$context.serverDataRequest,
      getDataPath = _props$context.getDataPath,
      treeData = _props$context.treeData,
      isServerSideGroup = _props$context.isServerSideGroup,
      getRowNodeId = _props$context.getRowNodeId,
      render = props.render,
      value = props.value,
      valueFormatted = props.valueFormatted,
      _props$showFolder = props.showFolder,
      showFolder = _props$showFolder === void 0 ? true : _props$showFolder,
      rowIndex = props.rowIndex,
      customIcon = props.customIcon;

  var _useState = (0, _react.useState)(node.rowHeight),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      rowHeight = _useState2[0],
      setRowHeight = _useState2[1];

  var getTreeDataInfo = (0, _react.useCallback)(function (node) {
    var nodeExpanded = node.expanded,
        _node$childrenAfterFi = node.childrenAfterFilter,
        childrenAfterFilter = _node$childrenAfterFi === void 0 ? [] : _node$childrenAfterFi,
        data = node.data;
    var hasChildren = (childrenAfterFilter.length > 0 || isServerSideGroup && isServerSideGroup(data)) && treeData;
    var treeDataType = childrenAfterFilter.length > 0 ? 'sync' : isServerSideGroup && isServerSideGroup(data) ? 'async' : 'none';
    var expanded = nodeExpanded && treeDataType == 'sync';
    return {
      hasChildren: hasChildren,
      treeDataType: treeDataType,
      expanded: expanded
    };
  }, [treeData]);

  var _useState3 = (0, _react.useState)(getTreeDataInfo(node)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];

  var hasChildren = state.hasChildren,
      expanded = state.expanded,
      treeDataType = state.treeDataType;
  var eContracted = (0, _react.useRef)(null);
  var eExpanded = (0, _react.useRef)(null);
  var renderIcon = (0, _react.useMemo)(function () {
    if (typeof customIcon === 'function') return customIcon(data);
    if (!customIcon) return null;
    return customIcon;
  }, []);
  var rowIndexChanged = (0, _react.useCallback)(function (params) {
    api.refreshCells({
      columns: ['g-index'],
      rowNodes: [node],
      force: true
    });
  }, []);
  var onExpend = (0, _react.useCallback)(function (event) {
    (0, _utils.stopPropagationForAgGrid)(event);

    if (node.childrenAfterGroup && node.childrenAfterGroup.length > 0) {
      // setState(state => ({ ...state, expanded: true }));
      if (node.childrenAfterFilter && node.childrenAfterFilter.length > 0) return node.setExpanded(true);
      return;
    }

    api.showLoadingOverlay();
    serverDataRequest(props, getDataPath(data), function () {
      node.setExpanded(true);
      api.hideOverlay();
    });
  }, []);
  var onClose = (0, _react.useCallback)(function (event) {
    (0, _utils.stopPropagationForAgGrid)(event);
    var node = props.node;
    node.setExpanded(false);
  }, []);

  function expandedChangedCallback(params) {
    var expanded = params.node.expanded;
    setState(function (state) {
      return Object.assign(Object.assign({}, state), {
        expanded: expanded
      });
    });
  }

  function childrenCountChangedCallback(params) {
    setState(Object.assign({}, getTreeDataInfo(params.node)));
  }

  var onRowHeightChange = (0, _react.useCallback)(function (_ref) {
    var node = _ref.node;
    setRowHeight(node.rowHeight);
  }, []);
  var getLeveLine = (0, _react.useCallback)(function () {
    var level = node.level,
        lastChild = node.lastChild;
    var arr = new Array(level).fill(undefined);
    if (!showFolder) return;
    return arr.map(function (item, index) {
      var _classnames;

      var lastLine = index + 1 == arr.length;
      return lastLine ? /*#__PURE__*/_react.default.createElement("span", {
        key: index + 'folder-icon',
        style: {
          height: rowHeight
        },
        className: (0, _classnames4.default)('gant-level-line', (_classnames = {}, (0, _defineProperty2.default)(_classnames, 'gant-folder-line', hasChildren), (0, _defineProperty2.default)(_classnames, 'gant-file-line', !hasChildren && !lastChild), (0, _defineProperty2.default)(_classnames, 'gant-file-line-last', !hasChildren && lastChild), _classnames))
      }) : /*#__PURE__*/_react.default.createElement("span", {
        key: index + 'folder-icon',
        style: {
          height: rowHeight
        },
        className: (0, _classnames4.default)('gant-level-line', 'gant-folder-line')
      });
    });
  }, [node, node.lastChild, hasChildren, showFolder, rowHeight]);

  function dataChange(params) {
    if ((0, _utils2.isEqualObj)(data, node.data)) return;
    var newState = getTreeDataInfo(node);
    if ((0, _utils2.isEqualObj)(newState, state)) return;
    setState(newState);
  }

  (0, _react.useEffect)(function () {
    if (eContracted.current) {
      eContracted.current.addEventListener('click', onExpend);
    }

    if (eExpanded.current) {
      eExpanded.current.addEventListener('click', onClose);
    }

    node.addEventListener(_agGridCommunity.RowNode.EVENT_EXPANDED_CHANGED, expandedChangedCallback);
    node.addEventListener(_agGridCommunity.RowNode.EVENT_ALL_CHILDREN_COUNT_CHANGED, childrenCountChangedCallback);
    node.addEventListener(_agGridCommunity.RowNode.EVENT_ROW_INDEX_CHANGED, rowIndexChanged);
    node.addEventListener(_agGridCommunity.RowNode.EVENT_HEIGHT_CHANGED, onRowHeightChange);
    node.addEventListener(_agGridCommunity.RowNode.EVENT_LAST_CHILD_CHANGED, childrenCountChangedCallback);
    return function () {
      if (eContracted.current) {
        eContracted.current.removeEventListener('click', onExpend);
      }

      if (eExpanded.current) {
        eExpanded.current.removeEventListener('click', onClose);
      }

      node.removeEventListener(_agGridCommunity.RowNode.EVENT_EXPANDED_CHANGED, expandedChangedCallback);
      node.removeEventListener(_agGridCommunity.RowNode.EVENT_ALL_CHILDREN_COUNT_CHANGED, childrenCountChangedCallback);
      node.removeEventListener(_agGridCommunity.RowNode.EVENT_ROW_INDEX_CHANGED, rowIndexChanged);
      node.removeEventListener(_agGridCommunity.RowNode.EVENT_HEIGHT_CHANGED, onRowHeightChange); // node.addEventListener(RowNode.EVENT_DATA_CHANGED, dataChange);
    };
  }, []);
  var showValue = (0, _react.useMemo)(function () {
    return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
  }, [valueFormatted, value]);
  return /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames4.default)('ag-cell-wrapper', treeData && "ag-row-group-indent-".concat(node.level), treeData && showFolder && "gant-row-group-indent-".concat(node.level), (!hasChildren && !showFolder || !hasChildren && node.level == 0) && treeData && 'ag-row-group-leaf-indent ')
  }, getLeveLine(), /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames4.default)('ag-group-expanded', (0, _defineProperty2.default)({}, 'ag-hidden', hasChildren ? !expanded : true)),
    ref: eExpanded
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ag-icon ag-icon-tree-open",
    unselectable: "on"
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames4.default)('ag-group-contracted', (0, _defineProperty2.default)({}, 'ag-hidden', hasChildren ? expanded : true)),
    ref: eContracted
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "ag-icon ag-icon-tree-closed",
    unselectable: "on"
  })), showFolder ? hasChildren ? /*#__PURE__*/_react.default.createElement("span", {
    className: "gant-treedata-icon gant-treedata-folder"
  }, renderIcon ? renderIcon : /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: expanded ? 'folder-open' : 'folder',
    theme: "filled"
  })) : node.level > 0 ? /*#__PURE__*/_react.default.createElement("span", {
    className: "gant-treedata-icon gant-treedata-file"
  }, renderIcon ? renderIcon : /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "file",
    theme: "filled"
  })) : treeData && /*#__PURE__*/_react.default.createElement("span", {
    className: "gant-treedata-icon gant-treedata-first-file"
  }, renderIcon ? renderIcon : /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "file",
    theme: "filled"
  })) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "ag-group-value"
  }, render ? render(showValue, data, rowIndex, props) : showValue));
}));

exports.default = _default;