"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactSortableHoc = require("react-sortable-hoc");

var _arrayMove = _interopRequireDefault(require("array-move"));

var _icon = _interopRequireDefault(require("../../icon"));

var _Receiver = _interopRequireDefault(require("../locale/Receiver"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Sortable(props) {
  var dataSource = props.dataSource,
      onChange = props.onChange,
      height = props.height;
  if (!dataSource || !dataSource.length) return null;

  var _useMemo = (0, _react.useMemo)(function () {
    return dataSource.reduce(function (total, dataItem, dataIdx) {
      if (dataItem.fixed === 'left') {
        total[0] = dataIdx;
      }

      if (dataItem.fixed === 'right' && total[1] === -1) {
        total[1] = dataIdx;
      }

      if (!dataItem.dynamic && dataItem.display === 'block') {
        total[2]++;

        if (!dataItem.hide) {
          total[3]++;
        }
      }

      if (dataItem.sortIndex !== undefined) {
        total[4]++;
      }

      return total;
    }, [-1, -1, 0, 0, 0]);
  }, [dataSource]),
      _useMemo2 = (0, _slicedToArray2.default)(_useMemo, 5),
      leftSpinIdx = _useMemo2[0],
      rightSpinIdx = _useMemo2[1],
      selectableCount = _useMemo2[2],
      checkedCount = _useMemo2[3],
      sortCount = _useMemo2[4];

  var handlerSortLock = (0, _react.useCallback)(function (index, fixed) {
    dataSource[index].fixed = fixed === 'top' ? 'left' : 'right';
    onChange((0, _arrayMove.default)(dataSource, index, fixed === 'top' ? 0 : -1));
  }, [dataSource, leftSpinIdx, rightSpinIdx]);
  var handlerLock = (0, _react.useCallback)(function (index, fixed) {
    dataSource[index].fixed = fixed;
    onChange((0, _arrayMove.default)(dataSource, index, fixed === 'left' ? leftSpinIdx + 1 : rightSpinIdx === -1 ? -1 : rightSpinIdx - 1));
  }, [dataSource, leftSpinIdx, rightSpinIdx]);
  var handlerUnlock = (0, _react.useCallback)(function (index) {
    var oldFixed = dataSource[index].fixed;
    delete dataSource[index].fixed;
    onChange((0, _arrayMove.default)(dataSource, index, oldFixed === 'left' ? leftSpinIdx : rightSpinIdx === -1 ? -1 : rightSpinIdx));
  }, [dataSource, leftSpinIdx, rightSpinIdx]);
  var handleSort = (0, _react.useCallback)(function (index, event) {
    if (event.shiftKey) {
      var targetRow = dataSource[index];
      targetRow.sort = targetRow.sort === 'asc' ? 'desc' : targetRow.sort === 'desc' ? 'none' : 'asc';
      var sortIndex = dataSource.reduce(function (memo, row, rowIdx) {
        return row.sortIndex !== undefined && row.sortIndex !== null && rowIdx !== index ? memo + 1 : memo;
      }, 0);
      dataSource.forEach(function (row, rowIdx) {
        if (rowIdx !== index && row.sortIndex > targetRow.sortIndex) {
          row.sortIndex--;
        }
      });

      if (targetRow.sort === 'none') {
        delete targetRow.sortIndex;
      } else {
        targetRow.sortIndex = sortIndex;
      }
    } else {
      dataSource.forEach(function (row, rowIdx) {
        if (rowIdx !== index) {
          row.sort = 'none';
          delete row.sortIndex;
        } else {
          row.sort = row.sort === 'asc' ? 'desc' : row.sort === 'desc' ? 'none' : 'asc';
          row.sortIndex = 0;
        }
      });
    }

    onChange(dataSource);
  }, [dataSource]);
  var handlerFieldVisible = (0, _react.useCallback)(function (index, event) {
    dataSource[index].hide = !event.target.checked;
    onChange(dataSource);
  }, [dataSource]);
  var DragHandler = (0, _react.useMemo)(function () {
    return (0, _reactSortableHoc.SortableHandle)(function () {
      return /*#__PURE__*/_react.default.createElement(_icon.default, {
        className: "dragHandler",
        type: "more"
      });
    });
  }, []);
  var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
    var _ref$dataItem = _ref.dataItem,
        title = _ref$dataItem.title,
        hide = _ref$dataItem.hide,
        fixed = _ref$dataItem.fixed,
        sort = _ref$dataItem.sort,
        sortIndex = _ref$dataItem.sortIndex,
        dataIdx = _ref.dataIdx;
    return /*#__PURE__*/_react.default.createElement(_row.default, {
      type: "flex",
      align: "middle",
      justify: "space-between",
      className: "tableRow gant-table-config-row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexGrow: 0
      }
    }, /*#__PURE__*/_react.default.createElement(_checkbox.default, {
      checked: !hide,
      onChange: handlerFieldVisible.bind(null, dataIdx)
    })), /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        onClick: handleSort.bind(null, dataIdx)
      }, /*#__PURE__*/_react.default.createElement("span", {
        style: {
          display: 'flex',
          flex: 1,
          cursor: 'pointer'
        }
      }, title, sort && sort !== 'none' && /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: sort === 'asc' ? locale.sortAsc : locale.sortDesc
      }, /*#__PURE__*/_react.default.createElement("div", null, sortCount > 1 && sortIndex !== undefined && sortIndex + 1, /*#__PURE__*/_react.default.createElement(_icon.default, {
        className: "gant-margin-h-5",
        style: {
          verticalAlign: 'baseline'
        },
        type: sort === 'asc' ? 'arrow-up' : 'arrow-down'
      }))))), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          flexGrow: 0,
          display: 'flex',
          width: 64,
          flexDirection: 'row-reverse'
        }
      }, /*#__PURE__*/_react.default.createElement(DragHandler, null), fixed ? /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: locale.setNormalColumn
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "lock",
        onClick: function onClick() {
          return handlerUnlock(dataIdx);
        },
        className: "disabledIcon"
      }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: locale.setFixedBottomColumn
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "vertical-align-bottom",
        onClick: function onClick() {
          return handlerSortLock(dataIdx, 'bottom');
        },
        className: "disabledIcon"
      }))), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: locale.setFixedTopColumn
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "vertical-align-top",
        onClick: function onClick() {
          return handlerSortLock(dataIdx, 'top');
        },
        className: "disabledIcon"
      }))), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: locale.setFixedRightColumn
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        style: {
          transform: 'rotateY(180deg)'
        },
        type: "pushpin",
        onClick: function onClick() {
          return handlerLock(dataIdx, 'right');
        },
        className: "disabledIcon"
      }))), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: locale.setFixedLeftColumn
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "pushpin",
        onClick: function onClick() {
          return handlerLock(dataIdx, 'left');
        },
        className: "disabledIcon"
      }))))));
    }));
  });
  var SortableList = (0, _reactSortableHoc.SortableContainer)(function () {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "sortableList"
    }, dataSource.map(function (dataItem, dataIdx) {
      return dataItem.dynamic || dataItem.display === 'none' ? null : /*#__PURE__*/_react.default.createElement(SortableItem, {
        key: dataItem.fieldName,
        index: dataIdx,
        dataIdx: dataIdx,
        dataItem: dataItem
      });
    }));
  });
  var handlerSortEnd = (0, _react.useCallback)(function (_ref2) {
    var oldIndex = _ref2.oldIndex,
        newIndex = _ref2.newIndex;
    var dataItem = dataSource[oldIndex]; // 移出固定区

    if (newIndex > leftSpinIdx && (rightSpinIdx === -1 || newIndex < rightSpinIdx)) {
      delete dataItem.fixed;
    } // 移到左边固定列


    if (newIndex <= leftSpinIdx) {
      dataItem.fixed = 'left';
    } // 移到右边固定列


    if (rightSpinIdx !== -1 && newIndex >= rightSpinIdx) {
      dataItem.fixed = 'right';
    }

    onChange((0, _arrayMove.default)(dataSource, oldIndex, newIndex));
  }, [dataSource, leftSpinIdx, rightSpinIdx]); // 选择

  var indeterminate = (0, _react.useMemo)(function () {
    return checkedCount && checkedCount < selectableCount;
  }, [checkedCount, selectableCount]);
  var checkedAll = (0, _react.useMemo)(function () {
    return checkedCount && checkedCount === selectableCount;
  }, [checkedCount, selectableCount]);
  var onCheckAllChange = (0, _react.useCallback)(function (_ref3) {
    var checked = _ref3.target.checked;
    dataSource.forEach(function (dataItem) {
      // if (dataItem.dynamic || dataItem.hide) {
      if (dataItem.dynamic) {
        dataItem.hide = false;
      } else if (dataItem.display !== 'none') {
        dataItem.hide = !checked;
      }
    });
    onChange(dataSource);
  }, [dataSource]);
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        paddingBottom: 10
      },
      className: "gant-smart-table-sortable"
    }, /*#__PURE__*/_react.default.createElement(_row.default, {
      type: "flex",
      align: "middle",
      justify: "space-between",
      className: "tableHeader"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexGrow: 0
      }
    }, /*#__PURE__*/_react.default.createElement(_checkbox.default, {
      indeterminate: indeterminate,
      onChange: onCheckAllChange,
      checked: checkedAll
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexGrow: 1
      }
    }, locale.checkAll, "\uFF08", "".concat(checkedCount, "/").concat(selectableCount), "\uFF09"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexGrow: 0,
        width: 56
      }
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: height - 142,
        overflowY: 'auto',
        border: '1px solid var(--border-color-split)'
      }
    }, /*#__PURE__*/_react.default.createElement(SortableList, {
      onSortEnd: handlerSortEnd,
      axis: "y",
      helperClass: "sortableHelper",
      useDragHandle: true
    })));
  });
}

var _default = /*#__PURE__*/_react.default.memo(Sortable);

exports.default = _default;