"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _context = require("./context");

var _utils = require("./_utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var getPrefixCls = function getPrefixCls(cls) {
  return 'gant-' + cls;
};

var BodyRow = function BodyRow(_a) {
  var isDeleted = _a.isDeleted,
      rowIndex = _a.rowIndex,
      className = _a.className,
      sortable = _a.sortable,
      children = _a.children,
      originRecord = _a.originRecord,
      props = __rest(_a, ["isDeleted", "rowIndex", "className", "sortable", "children", "originRecord"]);

  var rowData = (0, _react.useMemo)(function () {
    return {
      dataRowKey: props['data-row-key'],
      originRecord: originRecord
    };
  }, [props]);

  var _useContext = (0, _react.useContext)(_context.TableContext),
      outlineNum = _useContext.outlineNum,
      thresholdInner = _useContext.thresholdInner,
      renderRowKeys = _useContext.renderRowKeys,
      virtualScroll = _useContext.virtualScroll;

  var style = (0, _react.useMemo)(function () {
    var s = Object.assign({}, props.style || {});

    if (virtualScroll) {
      var keysRange = (0, _utils.getListRange)(renderRowKeys, outlineNum, thresholdInner);

      if (!keysRange.includes(rowData.dataRowKey)) {
        return Object.assign(Object.assign({}, s), {
          display: 'none'
        });
      }
    }

    return s;
  }, [props.style, rowData]);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      trRef = _useState2[0],
      setTrRef = _useState2[1];

  var row = (0, _react.useMemo)(function () {
    // 非拖动排序
    if (!sortable) {
      return /*#__PURE__*/_react.default.createElement("tr", Object.assign({}, props, {
        style: style,
        ref: function ref(tr) {
          return setTrRef(tr);
        },
        className: (0, _classnames3.default)(className, (0, _defineProperty2.default)({}, getPrefixCls('table-row-deleted'), isDeleted))
      }), children);
    }

    return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
      key: rowIndex,
      draggableId: "dragrow".concat(rowIndex),
      index: rowIndex
    }, function (provided, snapshot) {
      var dragStyle = Object.assign(Object.assign({}, style || {}), provided.draggableProps.style);

      if (snapshot.isDragging) {
        dragStyle.display = 'table';
        dragStyle.tableLayout = 'fixed';
        dragStyle.borderSpacing = 0; // 拖动的时候设置单元格的宽度，防止宽度塌陷

        var table = trRef.parentElement.parentElement;
        var cols = table.querySelectorAll("colgroup col");
        (0, _toConsumableArray2.default)(trRef.cells).forEach(function (td, index) {
          (0, _utils.setStyle)(td, cols[index].style.cssText);
        });
      }

      return /*#__PURE__*/_react.default.createElement("tr", Object.assign({}, props, {
        ref: function ref(tr) {
          provided.innerRef(tr);
          setTrRef(tr);
        }
      }, provided.draggableProps, provided.dragHandleProps, {
        style: dragStyle,
        className: (0, _classnames3.default)(className, (0, _defineProperty2.default)({}, getPrefixCls('table-row-deleted'), isDeleted))
      }), children, provided.placeholder);
    });
  }, [isDeleted, rowIndex, className, sortable, children, trRef, style]);
  return /*#__PURE__*/_react.default.createElement(_context.RowContext.Provider, {
    value: rowData
  }, row);
};

var _default = BodyRow;
exports.default = _default;