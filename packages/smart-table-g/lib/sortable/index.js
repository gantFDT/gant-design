"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/tooltip/style/css");
var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
require("antd/es/radio/style/css");
var _radio = _interopRequireDefault(require("antd/es/radio"));
require("antd/es/checkbox/style/css");
var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));
require("antd/es/row/style/css");
var _row = _interopRequireDefault(require("antd/es/row"));
require("antd/es/notification/style/css");
var _notification2 = _interopRequireDefault(require("antd/es/notification"));
var _react = _interopRequireWildcard(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _arrayMove = _interopRequireDefault(require("array-move"));
var _dataCell = require("data-cell-g");
var _Receiver = _interopRequireDefault(require("../locale/Receiver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Sortable(props) {
  var dataSource = props.dataSource,
    onChange = props.onChange;
  if (!dataSource || !dataSource.length) return null;
  var fakeDataSource = (0, _react.useMemo)(function () {
    var sliceDataSource = function sliceDataSource(start, end) {
      return dataSource.slice(start, end).map(function (v, i) {
        return Object.assign(Object.assign({}, v), {
          realIndex: start + i
        });
      });
    };
    var locks = dataSource.map(function (v) {
      v.clickable = false;
      v.fixed = undefined;
      return Boolean(v.lock);
    });
    var firstIndex = locks.indexOf(false);
    var lastIndex = locks.lastIndexOf(false);
    if (!~firstIndex) {
      dataSource[0].clickable = true;
      dataSource[dataSource.length - 1].clickable = true;
      return [[], sliceDataSource(0), []];
    }
    if (~firstIndex) {
      dataSource[firstIndex - 1] && (dataSource[firstIndex - 1].clickable = true);
      dataSource[firstIndex].clickable = true;
      for (var idx = 0; idx < firstIndex; idx++) {
        var item = dataSource[idx];
        item.fixed = 'left';
      }
    }
    if (~lastIndex) {
      dataSource[lastIndex].clickable = true;
      dataSource[lastIndex + 1] && (dataSource[lastIndex + 1].clickable = true);
      for (var last = dataSource.length - 1, _idx = last; _idx > lastIndex; _idx--) {
        var _item = dataSource[_idx];
        _item.fixed = 'right';
      }
    }
    var prevDataSource = sliceDataSource(0, firstIndex);
    var unlocakDataSource = sliceDataSource(firstIndex, lastIndex + 1);
    var afterDataSource = sliceDataSource(lastIndex + 1);
    return [prevDataSource, unlocakDataSource, afterDataSource];
  }, [dataSource]);
  var handlerLock = (0, _react.useCallback)(function (index) {
    if (dataSource[index].clickable) {
      dataSource[index].lock = true;
      onChange(dataSource);
    } else {
      _notification2.default.info({
        message: _react.default.createElement(_Receiver.default, null, function (locale) {
          return _react.default.createElement(_react.default.Fragment, null, locale.onlySide);
        })
      });
    }
  }, [dataSource]);
  var handlerUnlock = (0, _react.useCallback)(function (index) {
    if (dataSource[index].clickable) {
      dataSource[index].lock = false;
      onChange(dataSource);
    } else {
      _notification2.default.info({
        message: _react.default.createElement(_Receiver.default, null, function (locale) {
          return _react.default.createElement(_react.default.Fragment, null, locale.onlyNearUnlock);
        })
      });
    }
  }, [dataSource]);
  var handlerChangeAlign = (0, _react.useCallback)(function (index, event) {
    dataSource[index].align = event.target.value;
    onChange(dataSource);
  }, [dataSource]);
  var handlerFieldVisible = (0, _react.useCallback)(function (index, event) {
    dataSource[index].checked = event.target.checked;
    onChange(dataSource);
  }, [dataSource]);
  var DragHandler = (0, _reactSortableHoc.SortableHandle)(function () {
    return _react.default.createElement(_dataCell.Icon, {
      className: "dragHandler",
      type: "icon-drag"
    });
  });
  var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
    var _ref$record = _ref.record,
      title = _ref$record.title,
      checked = _ref$record.checked,
      align = _ref$record.align,
      realIndex = _ref.realIndex,
      lock = _ref.lock;
    return _react.default.createElement(_row.default, {
      type: "flex",
      align: "middle",
      justify: "space-between",
      className: "tableRow gant-table-config-row"
    }, _react.default.createElement("div", {
      style: {
        flexGrow: 0
      }
    }, _react.default.createElement(_checkbox.default, {
      checked: checked,
      onChange: handlerFieldVisible.bind(null, realIndex)
    })), _react.default.createElement("div", {
      style: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, _react.default.createElement("span", {
      style: {
        flex: 1
      }
    }, title), _react.default.createElement(_radio.default.Group, {
      style: {
        flex: 1
      },
      value: align,
      onChange: handlerChangeAlign.bind(null, realIndex),
      size: "small",
      buttonStyle: "solid"
    }, _react.default.createElement(_radio.default.Button, {
      value: "left"
    }, _react.default.createElement(_icon.default, {
      type: "align-left"
    })), _react.default.createElement(_radio.default.Button, {
      value: "center"
    }, _react.default.createElement(_icon.default, {
      type: "align-center"
    })), _react.default.createElement(_radio.default.Button, {
      value: "right"
    }, _react.default.createElement(_icon.default, {
      type: "align-right"
    })))), _react.default.createElement(_Receiver.default, null, function (locale) {
      return _react.default.createElement("div", {
        style: {
          flexGrow: 0,
          display: 'flex',
          width: 56,
          flexDirection: 'row-reverse'
        }
      }, !lock && _react.default.createElement(DragHandler, null), lock ? _react.default.createElement(_tooltip.default, {
        style: {
          flex: 0
        },
        placement: "top",
        title: locale.setNormalColumn
      }, _react.default.createElement(_icon.default, {
        type: "lock",
        onClick: function onClick() {
          return handlerUnlock(realIndex);
        },
        className: "disabledIcon"
      })) : _react.default.createElement(_tooltip.default, {
        placement: "top",
        title: locale.setFixedColumn
      }, _react.default.createElement(_icon.default, {
        type: "unlock",
        onClick: function onClick() {
          return handlerLock(realIndex);
        },
        className: "disabledIcon"
      })));
    }));
  });
  var SortableList = (0, _reactSortableHoc.SortableContainer)(function () {
    return _react.default.createElement("div", {
      className: "sortableList"
    }, fakeDataSource.map(function (collection, idx) {
      return _react.default.createElement(_react.default.Fragment, {
        key: idx
      }, collection.map(function (value, index) {
        return _react.default.createElement(SortableItem, {
          collection: idx,
          disabled: value.lock,
          lock: value.lock,
          index: index,
          key: value.dataIndex,
          realIndex: value.realIndex,
          record: value
        });
      }));
    }));
  });
  // 选择
  var selectedRows = (0, _react.useMemo)(function () {
    return dataSource.filter(function (record) {
      return record.checked;
    });
  }, [dataSource]);
  var indeterminate = (0, _react.useMemo)(function () {
    return !!selectedRows.length && selectedRows.length < dataSource.length;
  }, [selectedRows, dataSource]);
  var checkedAll = (0, _react.useMemo)(function () {
    return !!selectedRows.length && selectedRows.length === dataSource.length;
  }, [selectedRows, dataSource]);
  var onCheckAllChange = (0, _react.useCallback)(function (e) {
    dataSource.forEach(function (record) {
      record.checked = !!e.target.checked;
    });
    onChange(dataSource);
  }, [dataSource]);
  var handlerSortEnd = (0, _react.useCallback)(function (_ref2) {
    var oldIndex = _ref2.oldIndex,
      newIndex = _ref2.newIndex;
    onChange((0, _arrayMove.default)(dataSource, oldIndex, newIndex));
  }, [dataSource]);
  return _react.default.createElement(_Receiver.default, null, function (locale) {
    return _react.default.createElement("div", {
      style: {
        paddingBottom: 10
      },
      className: "gant-smart-table-sortable"
    }, _react.default.createElement(_row.default, {
      type: "flex",
      align: "middle",
      justify: "space-between",
      className: "tableHeader"
    }, _react.default.createElement("div", {
      style: {
        flexGrow: 0
      }
    }, _react.default.createElement(_checkbox.default, {
      indeterminate: indeterminate,
      onChange: onCheckAllChange,
      checked: checkedAll
    })), _react.default.createElement("div", {
      style: {
        flexGrow: 1
      }
    }, locale.checkAll, "\uFF08", "".concat(selectedRows.length, "/").concat(dataSource.length), "\uFF09"), _react.default.createElement("div", {
      style: {
        flexGrow: 1
      }
    }, locale.align), _react.default.createElement("div", {
      style: {
        flexGrow: 0,
        width: 56
      }
    })), _react.default.createElement("div", null, _react.default.createElement(SortableList, {
      onSortEnd: handlerSortEnd,
      axis: "y",
      helperClass: "sortableHelper",
      useDragHandle: true
    })));
  });
}
var _default = exports.default = Sortable;