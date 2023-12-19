"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeaderCell;

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("./_utils");

var _context = require("./context");

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

var antSelectionColumn = 'ant-table-selection-column';
var antSelectionCol = 'ant-table-selection-col'; // 获取移动相关的数据

function getMoveData(dom) {
  var _dom$getBoundingClien = dom.getBoundingClientRect(),
      width = _dom$getBoundingClien.width;

  return [Math.ceil(width), 50]; // const titleSpan = dom.querySelector('.ant-table-column-title')
  // const { width: minWidth } = titleSpan.getBoundingClientRect()
  // const left = titleSpan.offsetLeft
  // // 直接取个整避免与实际dom节点的误差
  // const min = Math.ceil(minWidth + 2 * left + 6) // 6px是多预留出来的，因为不同文字实际站位大小不一样，姓名和年龄在8px+28px+8px的宽度下，年龄会折行，而姓名不会
  // return [Math.ceil(width), Math.max(min, 50)]
} // 获取同级所有自己节点并分组


function splitSibling(cols, colIndex) {
  var isLeft = true;
  var forEach = [].forEach;
  var left = [];
  var right = [];
  forEach.call(cols, function (col, index) {
    if (col.classList.value.includes(antSelectionCol)) return;

    if (isLeft) {
      left.unshift(col);
    } else {
      right.push(col);
    }

    if (colIndex === index) isLeft = false;
  });
  return [left, right];
} // 找到当前移动th的父级table


function findTableElement(th) {
  return th.parentElement.parentElement.parentElement;
}

function findColElements(table) {
  return table.querySelectorAll("colgroup col");
}

function findColElement(table, index) {
  return findColElements(table)[index];
} // 找到bodyTable, 设置scroll.y的时候生效,下同


function findBodyTableElement(table) {
  return table.parentElement.parentElement.querySelector('.ant-table-body table');
}

var orderTypeIcon = new Map([['ASC', 'caret-up'], ['DESC', 'caret-down']]);

function HeaderCell(props) {
  // 来自antd原本的属性
  var style = props.style,
      className = props.className,
      children = props.children; // 自定义属性

  var resizable = props.resizable,
      tableKey = props.tableKey,
      cellKey = props.cellKey,
      dataIndex = props.dataIndex,
      fixed = props.fixed,
      headerFixed = props.headerFixed,
      hasFixed = props.hasFixed,
      flex = props.flex,
      orderType = props.orderType,
      resetProps = __rest(props, ["resizable", "tableKey", "cellKey", "dataIndex", "fixed", "headerFixed", "hasFixed", "flex", "orderType"]);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      handler = _useState2[0],
      sethandler = _useState2[1]; // 移动的小块


  var isSelection = (0, _react.useMemo)(function () {
    return className.includes(antSelectionColumn);
  }, [className]);
  var useHandle = (0, _react.useMemo)(function () {
    return resizable && !isSelection;
  }, [resizable, isSelection]);

  var _useContext = (0, _react.useContext)(_context.DataContext),
      cellPadding = _useContext.cellPadding,
      computedColIndex = _useContext.computedColIndex,
      computedRowSelection = _useContext.computedRowSelection;

  var _useContext2 = (0, _react.useContext)(_context.TableContext),
      onResize = _useContext2.onResize; // 计算col的序号


  var colIndex = (0, _react.useMemo)(function () {
    var index = computedColIndex.findIndex(function (col) {
      return col === dataIndex;
    });
    if (computedRowSelection) return index + 1;
    return index;
  }, [dataIndex, computedRowSelection]);
  var thRef = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      node.dataIndex = dataIndex;
      node.resizable = resizable;
      node.fixed = fixed;
      node.colIndex = colIndex;
    }
  }, []);
  var setWidth = (0, _react.useCallback)(function (ele, width) {
    requestAnimationFrame(function () {
      if (!ele) return;
      var cssText = ele.style.cssText;
      var text = cssText ? "".concat(cssText, ";width: ").concat(width, "px;min-width:").concat(width, "px") : "width: ".concat(width, "px;min-width:").concat(width, "px");
      ele.style.cssText = text;
    });
  }, []); //#region
  // 固定缩放，列与table共同缩放

  var addMouseDownEvent = (0, _react.useCallback)(function (event) {
    var startX = event.pageX,
        target = event.target; // 方案一数据

    var th = target.parentElement;

    var _getMoveData = getMoveData(th),
        _getMoveData2 = (0, _slicedToArray2.default)(_getMoveData, 2),
        width = _getMoveData2[0],
        minWidth = _getMoveData2[1];

    var table = findTableElement(th);
    var col = findColElement(table, colIndex);

    var _getMoveData3 = getMoveData(table),
        _getMoveData4 = (0, _slicedToArray2.default)(_getMoveData3, 1),
        tableWidth = _getMoveData4[0];

    var bodytable = null;
    var bodyCol = null; // 在设置有scroll.y的情况下、找到主体table

    if (headerFixed) {
      bodytable = findBodyTableElement(table);
      bodyCol = findColElement(bodytable, colIndex);
    }

    var mouseMove = function mouseMove(e) {
      var diffX = e.pageX - startX; //#region

      var resultWidth = Math.max(minWidth, width + diffX); // 实际移动的距离

      var disX = resultWidth - width;
      var resultTableWidth = tableWidth + disX; // 设置cell宽度

      setWidth(col, resultWidth); // 设置table宽度

      setWidth(table, resultTableWidth);

      if (headerFixed) {
        setWidth(bodyCol, resultWidth);
        setWidth(bodytable, resultTableWidth);
      }

      if (hasFixed) {
        // 找到容器宽度, 根据宽度大小差去设置固定列的滚动条显示和隐藏
        var _table$parentElement$ = table.parentElement.getBoundingClientRect(),
            bodyWidth = _table$parentElement$.width,
            bodyHeight = _table$parentElement$.height;

        var scrollY = table.parentElement.offsetWidth > table.parentElement.clientWidth;
        var scrollX = resultTableWidth < bodyWidth;
        (0, _utils.toggleFixedTable)(bodytable || table, scrollY, scrollX);
      }
    };

    var mouseUp = function mouseUp(e) {
      (0, _utils.setStorageWidth)(th, tableKey, dataIndex);
      (0, _utils.setStorageWidth)(table, tableKey, 'table');
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      onResize();
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }, [colIndex, hasFixed, headerFixed, onResize]); //#endregion
  //#region
  // table固定,列弹性缩放

  var addFlexMouseDownEvent = (0, _react.useCallback)(function (event) {
    var startX = event.pageX,
        target = event.target;
    var th = target.parentElement;

    var _getMoveData5 = getMoveData(th),
        _getMoveData6 = (0, _slicedToArray2.default)(_getMoveData5, 2),
        width = _getMoveData6[0],
        minWidth = _getMoveData6[1];

    var table = findTableElement(th);
    var cols = findColElements(table);

    var _getMoveData7 = getMoveData(table),
        _getMoveData8 = (0, _slicedToArray2.default)(_getMoveData7, 1),
        tableWidth = _getMoveData8[0];

    var bodytable = null;
    var bodytableCols = null;
    var bodyLeft = null;
    var bodyRight = null; // 在设置有scroll.y的情况下、找到主体table

    if (headerFixed) {
      bodytable = findBodyTableElement(table);
      bodytableCols = findColElements(bodytable);

      var _splitSibling = splitSibling(bodytableCols, colIndex),
          _splitSibling2 = (0, _slicedToArray2.default)(_splitSibling, 2),
          l = _splitSibling2[0],
          r = _splitSibling2[1];

      bodyLeft = l;
      bodyRight = r;
    }

    var _splitSibling3 = splitSibling(cols, colIndex),
        _splitSibling4 = (0, _slicedToArray2.default)(_splitSibling3, 2),
        left = _splitSibling4[0],
        right = _splitSibling4[1];

    var leftInit = left.map(getMoveData);
    var rightInit = right.map(getMoveData);

    var mouseMove = function mouseMove(e) {
      var diffX = e.pageX - startX;
      var leftDis = diffX;
      var rightDis = diffX;

      if (diffX < 0) {
        // 左移动
        // 计算每个列分配多少移动距离
        var distribArr = leftInit.map(function (_ref, index) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              width = _ref2[0],
              minWidth = _ref2[1];

          if (leftDis === 0 || left[index].fixed) return 0; // 剩下的可移动距离为0 或者当前列是固定列，就不分配宽度

          var min = minWidth;

          if (width + leftDis > min) {
            var _need = leftDis;
            leftDis = 0;
            return _need;
          }

          var need = Math.min(min - width, 0);
          leftDis = leftDis - need;
          return need;
        });
        var reset = leftDis; // 向左移动的时候超出的量
        // 操作左边的tr

        for (var i = 0, len = left.length; i < len; i++) {
          var _leftInit$i = (0, _slicedToArray2.default)(leftInit[i], 1),
              _width2 = _leftInit$i[0];

          var need = distribArr[i];

          if (need !== 0) {
            setWidth(left[i], _width2 + need);

            if (bodyLeft) {
              setWidth(bodyLeft[i], _width2 + need);
            }
          }
        } // 将实际移动的距离分配给右边的列


        var _rightInit$ = (0, _slicedToArray2.default)(rightInit[0], 1),
            _width = _rightInit$[0];

        setWidth(right[0], _width + reset - diffX);

        if (bodyRight) {
          setWidth(bodyRight[0], _width + reset - diffX);
        }
      } else {
        // 右移动
        var _distribArr = rightInit.map(function (_ref3, index) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              width = _ref4[0],
              minWidth = _ref4[1];

          if (rightDis === 0 || right[index].fixed) return 0;
          var min = minWidth;

          if (width - rightDis > min) {
            var _need2 = rightDis;
            rightDis = 0;
            return _need2;
          }

          var need = Math.max(width - min, 0);
          rightDis = rightDis - need;
          return need;
        });

        var _reset = rightDis; // 向右移动的时候超出的量
        // 操作右边的tr

        for (var _i = 0, _len = right.length; _i < _len; _i++) {
          var _rightInit$_i = (0, _slicedToArray2.default)(rightInit[_i], 1),
              _width4 = _rightInit$_i[0];

          var _need3 = _distribArr[_i];

          if (_need3 !== 0) {
            setWidth(right[_i], _width4 - _need3);

            if (bodyRight) {
              setWidth(bodyRight[_i], _width4 - _need3);
            }
          }
        }

        var _leftInit$ = (0, _slicedToArray2.default)(leftInit[0], 1),
            _width3 = _leftInit$[0];

        setWidth(left[0], _width3 + diffX - _reset);

        if (bodyLeft) {
          setWidth(bodyLeft[0], _width3 + diffX - _reset);
        }
      }
    };

    var mouseUp = function mouseUp(e) {
      [].concat((0, _toConsumableArray2.default)(left), (0, _toConsumableArray2.default)(right)).forEach(function (th) {
        return (0, _utils.setStorageWidth)(th, tableKey, th.dataIndex);
      });
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }, [colIndex]); //#endregion
  // const listener = useMemo(() => flex ? addFlexMouseDownEvent : addMouseDownEvent, [flex, addFlexMouseDownEvent, addMouseDownEvent])

  var listener = (0, _react.useMemo)(function () {
    return addMouseDownEvent;
  }, [addMouseDownEvent]); // 重新修改事件

  (0, _react.useEffect)(function () {
    if (!handler) return;
    handler.removeEventListener('mousedown', listener);
    handler.addEventListener('mousedown', listener, false);
    return function () {
      handler.removeEventListener('mousedown', listener);
    };
  }, [listener]);
  var handleRef = (0, _react.useCallback)(function (handle) {
    if (handle) {
      handle.removeEventListener('mousedown', listener);
      handle.addEventListener('mousedown', listener, false); // 解决切换固定列的时候resize失效的问题

      if (!handler) sethandler(handle);
    }
  }, [handler, listener]);
  return /*#__PURE__*/_react.default.createElement("th", Object.assign({}, resetProps, {
    className: (0, _classnames.default)([{
      'react-resizable': useHandle
    }, className]),
    style: Object.assign({
      padding: cellPadding
    }, style),
    ref: thRef
  }), children, !isSelection && orderType && /*#__PURE__*/_react.default.createElement("span", {
    className: 'gantd-table-header-sort'
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: orderTypeIcon.get(orderType),
    theme: "filled"
  })), useHandle && /*#__PURE__*/_react.default.createElement("span", {
    className: 'react-resizable-handle',
    ref: handleRef
  }));
}