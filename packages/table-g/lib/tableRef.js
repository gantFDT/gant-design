"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./_utils");
var _context = require("./context");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var TableComponent = function TableComponent(props) {
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    table = _useState2[0],
    settable = _useState2[1];
  var _useContext = (0, _react.useContext)(_context.TableContext),
    light = _useContext.light,
    spacing = _useContext.spacing,
    dataSource = _useContext.dataSource,
    emitReCompute = _useContext.emitReCompute,
    headerFixed = _useContext.headerFixed,
    tableColumns = _useContext.tableColumns,
    virtualScroll = _useContext.virtualScroll,
    mainHeight = _useContext.mainHeight,
    tableGroup = _useContext.tableGroup,
    storageWidth = _useContext.storageWidth,
    scrollY = _useContext.scrollY;
  var width = (0, _react.useMemo)(function () {
    return (0, _utils.getStyleText)(storageWidth);
  }, [storageWidth]);
  var spac = (0, _react.useMemo)(function () {
    return (0, _utils.getStyleText)(spacing);
  }, [spacing]);
  var height = (0, _react.useMemo)(function () {
    return (0, _utils.getStyleText)(scrollY);
  }, [scrollY]);
  var hasScrollY = (0, _react.useMemo)(function () {
    return typeof scrollY !== 'undefined';
  }, [scrollY]);
  (0, _react.useEffect)(function () {
    if (table && table.parentElement) {
      // 主table
      var parent = virtualScroll ? table.parentElement.parentElement : table.parentElement;
      if (parent.classList.contains('ant-table-body')) {
        setTimeout(function () {
          // 内容区域不够的时候 , 要隐藏掉固定列的默认滚动条
          // 纵向滚动
          var scrollY = parent.offsetWidth > parent.clientWidth;
          // 横向滚动
          var scrollX = parent.offsetHeight > parent.clientHeight;
          // fix bug:处理不同数据数量下的固定列滚动条的显示与否
          (0, _utils.toggleFixedTable)(parent, scrollY, scrollX, hasScrollY);
          // 根据是否出现纵向滚动条来设置header的overflow-y
          // 通过parent的宽度比较
          var header = parent.parentElement.querySelector('.ant-table-header');
          if (header) {
            // fix bug:当数据多导致出现滚动条的时候，要让header也出现滚动条
            (0, _utils.setStyle)(header, "overflow-y: ".concat(scrollY ? 'scroll' : 'hidden'));
            // fix bug:同时设置负margin，让head和body贴合
            if (scrollY) {
              var headerHeight = header.offsetHeight;
              var tableHeight = header.querySelector('table').offsetHeight;
              (0, _utils.setStyle)(header, "margin-bottom: -".concat(headerHeight - tableHeight, "px"));
            }
          }
          // 明亮模式下，不添加底部边框
          if (!light) {
            (0, _utils.setMainTableBorder)(table, headerFixed, dataSource.length);
          } else {
            (0, _utils.setStyle)(table, "border-spacing: 0 ".concat(spac, ";"));
          }
        });
      } else if (parent.classList.contains('ant-table-body-inner')) {
        // 设置固定列最低高度
        // fix 当数据总高度不足时，滚动条显示在inner底部
        (0, _utils.setStyle)(parent, "min-height: ".concat(height));
      }
    }
    /**
     * emitReCompute用于控制当展开表格的时候高度被撑开，动态去控制header右边的滚动条站位
     */
  }, [table, dataSource.length, tableColumns, emitReCompute, virtualScroll, height, spac, hasScrollY]);
  var tableRef = (0, _react.useCallback)(function (dom) {
    if (dom) {
      settable(dom);
      if (virtualScroll) {
        var scrollContainer = dom.parentElement;
        var parent = scrollContainer.parentElement;
        if (scrollContainer && parent) {
          var isBodyTable = parent.classList.contains('ant-table-body');
          if (isBodyTable) {
            tableGroup.set('bodyTable', dom);
            (0, _utils.setStyle)(scrollContainer, "width: ".concat(width));
          } else {
            var p = parent.parentElement.parentElement;
            var isLeft = p.classList.contains('ant-table-fixed-left');
            tableGroup.set(isLeft ? 'leftTable' : "rightTable", dom);
          }
        }
      }
    }
  }, [virtualScroll, width]);
  if (virtualScroll) {
    return _react.default.createElement("div", {
      className: "scroll--container",
      style: {
        minHeight: mainHeight,
        height: mainHeight,
        overflow: 'hidden'
      }
    }, _react.default.createElement("table", Object.assign({
      ref: tableRef
    }, props, {
      style: Object.assign(Object.assign({}, props.style), {
        border: 0
      })
    })));
  }
  return _react.default.createElement("table", Object.assign({
    ref: tableRef
  }, props));
};
var _default = exports.default = TableComponent;