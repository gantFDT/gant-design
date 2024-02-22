"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _lodash = _interopRequireDefault(require("lodash"));
var _editStatus = _interopRequireDefault(require("../edit-status"));
var _switchStatus = _interopRequireDefault(require("../switch-status"));
var _context = require("./context");
var _utils = require("./_utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var invalidateValue = ['', null, undefined];
var getPrefixCls = function getPrefixCls(cls) {
  return 'gant-' + cls;
};
var BodyCell = function BodyCell(_a) {
  var _a$record = _a.record,
    record = _a$record === void 0 ? {} : _a$record,
    _a$dataIndex = _a.dataIndex,
    dataIndex = _a$dataIndex === void 0 ? '' : _a$dataIndex,
    rowIndex = _a.rowIndex,
    _a$editConfig = _a.editConfig,
    editConfig = _a$editConfig === void 0 ? {} : _a$editConfig,
    sortable = _a.sortable,
    wrap = _a.wrap,
    light = _a.light,
    children = _a.children,
    className = _a.className,
    style = _a.style,
    props = __rest(_a, ["record", "dataIndex", "rowIndex", "editConfig", "sortable", "wrap", "light", "children", "className", "style"]);
  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    cacheInitialValue = _useState4[0],
    setCacheInitialValue = _useState4[1];
  var _useState5 = (0, _react.useState)(),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    element = _useState6[0],
    setElement = _useState6[1];
  var _useState7 = (0, _react.useState)(_editStatus.default.CANCEL),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    edit = _useState8[0],
    setedit = _useState8[1];
  var _useContext = (0, _react.useContext)(_context.DataContext),
    dataSource = _useContext.dataSource,
    setDataSource = _useContext.setDataSource,
    isTree = _useContext.isTree,
    cellPadding = _useContext.cellPadding,
    computedRowKey = _useContext.computedRowKey,
    editable = _useContext.editable,
    originRowHeight = _useContext.originRowHeight,
    originLineHeight = _useContext.originLineHeight;
  var _useContext2 = (0, _react.useContext)(_context.RowContext),
    dataRowKey = _useContext2.dataRowKey,
    originRecord = _useContext2.originRecord;
  var _useContext3 = (0, _react.useContext)(_context.TableContext),
    virtualScroll = _useContext3.virtualScroll;
  var isEdit = (0, _react.useMemo)(function () {
    return edit === _editStatus.default.EDIT;
  }, [edit]);
  var showDirt = (0, _react.useMemo)(function () {
    return _lodash.default.get(editConfig, 'showDirt', true);
  }, [editConfig]);
  var isSelection = (0, _react.useMemo)(function () {
    return className.includes('ant-table-selection-column');
  }, [className]);
  var pureRecord = (0, _react.useMemo)(function () {
    return (0, _utils.getPureRecord)(record);
  }, [record]);
  var editValue = editConfig.editValue,
    editRender = editConfig.render,
    _editConfig$clickable = editConfig.clickable,
    clickable = _editConfig$clickable === void 0 ? true : _editConfig$clickable;
  var getEditValue = (0, _react.useCallback)(function () {
    var value = _lodash.default.get(pureRecord, dataIndex);
    if (editValue) {
      if (typeof editValue === 'function') {
        value = editValue(pureRecord, rowIndex, dataIndex);
      } else {
        value = editValue;
      }
    }
    return value;
  }, [pureRecord, originRecord, dataIndex, editValue]);
  var updateElement = (0, _react.useCallback)(function () {
    var value = getEditValue();
    setValue(value);
    if (editRender) {
      var _element = editRender(value, pureRecord, rowIndex);
      setElement(_element);
    }
  }, [pureRecord, rowIndex, editRender]);
  var close = (0, _react.useCallback)(function () {
    return setedit(_editStatus.default.CANCEL);
  }, []);
  // 设置编辑值的初始值
  (0, _react.useEffect)(function () {
    var value = getEditValue();
    setCacheInitialValue(value);
    setValue(value);
  }, []);
  (0, _react.useEffect)(function () {
    // fix: 虚拟滚动下不能用value的值
    if (originRecord) {
      setCacheInitialValue(_lodash.default.get(originRecord, dataIndex));
    }
  }, [originRecord]);
  // 编辑状态改变
  (0, _react.useEffect)(function () {
    if (editable === _editStatus.default.SAVE) {
      // 清除脏标记
      setCacheInitialValue(value);
    } else if (editable === _editStatus.default.CANCEL && !_lodash.default.isEqual(cacheInitialValue, value)) {
      // 回退值
      setValue(cacheInitialValue);
      // 曾经编辑过
      // onCancel作为回退值的特定方法，没有的话会调用onChange
      if (element) {
        if (element.props.onCancel) {
          element.props.onCancel(cacheInitialValue);
        } else if (element.props.onChange) {
          element.props.onChange(cacheInitialValue, close, setDataSource);
        }
      }
    }
  }, [editable, value, cacheInitialValue, element]);
  // fix bug 可拖拽排序的课编辑表格，在进入编辑状态的时候会重新排列，因此rowIndex可能会不一样
  // useEffect(() => updateElement(), [rowIndex])
  var onTD = (0, _react.useCallback)(function (td) {
    if (td) {
      // 用于拖拽时候的比对
      td.dataIndex = dataIndex;
      td.rowIndex = rowIndex;
    }
  }, [dataIndex, rowIndex]);
  // 切换显示状态
  var switchEdit = (0, _react.useCallback)(function () {
    if (editable !== _editStatus.default.EDIT || !editRender) return false;
    setedit((0, _switchStatus.default)(edit));
    return true;
  }, [edit, editable, editRender]);
  var onClick = (0, _react.useCallback)(function (e) {
    var switchSuccess = false;
    if (!pureRecord.isDeleted && !isEdit) {
      // 判断钩子
      var allowEdit = clickable;
      if (typeof clickable === 'function') {
        allowEdit = clickable(pureRecord, rowIndex, dataIndex);
      }
      if (allowEdit) {
        switchSuccess = switchEdit(); // 切换编辑状态成功
        if (switchSuccess) updateElement();
      }
    }
    if (props.onClick) {
      props.onClick(e, switchSuccess ? setDataSource : undefined);
    }
  }, [isEdit, switchEdit, updateElement, props.onClick, pureRecord, clickable, rowIndex, dataIndex]);
  var onBlur = (0, _react.useCallback)(function () {
    if (element.props.onBlur) {
      // 添加dataSource，保证在不需要切换状态的表格上面可以得到数据，来自行计算
      element.props.onBlur(value, dataSource, setDataSource);
    }
    if (!isTree) {
      setDataSource(function (_ref) {
        var _ref2 = (0, _toArray2.default)(_ref),
          list = _ref2.slice(0);
        list[rowIndex][dataIndex] = value;
        return list;
      });
    } else {
      setDataSource(function (_ref3) {
        var _ref4 = (0, _toArray2.default)(_ref3),
          list = _ref4.slice(0);
        console.time('更新树耗时');
        var _getCurrentRecord = getCurrentRecord(list, value),
          _getCurrentRecord2 = (0, _slicedToArray2.default)(_getCurrentRecord, 1),
          tree = _getCurrentRecord2[0];
        console.timeEnd('更新树耗时');
        return tree;
      });
    }
    switchEdit();
  }, [value, element, switchEdit, isTree, dataSource]);
  // 更新树状数据
  var getCurrentRecord = (0, _react.useCallback)(function (_ref5, value) {
    var _ref6 = (0, _toArray2.default)(_ref5),
      list = _ref6.slice(0);
    var seted = false;
    var index = 0;
    var item = list[rowIndex];
    // 比如：更新树状table的时候，第一层数据只有2条数据，而更新的数据是下面某一层中的第3条数据
    // 这个时候rowIndex为2，在第一层数据中取不到值，会出现item不存在的情况
    if (item && _lodash.default.isEqual(computedRowKey(item), dataRowKey)) {
      list[rowIndex][dataIndex] = value;
      seted = true;
    }
    while (!seted && index < list.length) {
      if (_lodash.default.get(list[index], 'children.length')) {
        var _getCurrentRecord3 = getCurrentRecord(list[index].children, value),
          _getCurrentRecord4 = (0, _slicedToArray2.default)(_getCurrentRecord3, 2),
          _children = _getCurrentRecord4[0],
          finded = _getCurrentRecord4[1];
        seted = finded;
        if (finded) {
          list[index].children = _children;
        }
      }
      index++;
    }
    return [list, seted];
  }, [record, dataIndex, rowIndex, dataRowKey]);
  var onChange = (0, _react.useCallback)(function (value) {
    setValue(value);
    if (element.props.onChange) {
      var _element$props;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      (_element$props = element.props).onChange.apply(_element$props, [value, close, setDataSource].concat(args));
    }
  }, [element, dataIndex, rowIndex]);
  var renderChildren = (0, _react.useCallback)(function () {
    // 在排序表格中，不渲染默认的第一行假数据
    if (sortable) return;
    if (!isEdit) return children;
    if (element) {
      var elementProps = Object.assign(Object.assign({}, element.props), {
        value: value,
        onBlur: onBlur,
        onChange: onChange,
        autoFocus: true,
        allowEdit: false,
        edit: _editStatus.default.EDIT,
        wrapperClassName: 'table-cell-editing'
      });
      return _react.default.cloneElement(element, elementProps);
    }
  }, [edit, value, element, children, sortable, cellPadding, isEdit]);
  var valueChanged = (0, _react.useMemo)(function () {
    if (invalidateValue.includes(value) && invalidateValue.includes(cacheInitialValue)) return false;
    return !_lodash.default.isEqual(value, cacheInitialValue);
  }, [value, cacheInitialValue]);
  var renderTd = (0, _react.useCallback)(function () {
    var wrapClass = virtualScroll || !wrap ? [isSelection ? '' : getPrefixCls('table-editcell-ellipsis')] : [getPrefixCls('table-editcell-wrap')];
    var computedClassName = (0, _classnames2.default)(className, wrapClass, (0, _defineProperty2.default)({}, getPrefixCls('table-editcell-dirt'), showDirt && valueChanged));
    //fix Cannot assign to read only property
    var dStyle = Object.assign({}, style || {});
    dStyle.padding = cellPadding;
    if (virtualScroll) {
      dStyle.height = originRowHeight;
      if (originLineHeight) {
        // dStyle.lineHeight = originLineHeight
      }
    }
    return _react.default.createElement("td", Object.assign({}, props, {
      style: dStyle,
      className: computedClassName,
      onClick: onClick,
      ref: onTD
    }), renderChildren());
  }, [className, cellPadding, style, wrap, showDirt, valueChanged, element, onClick, onTD, renderChildren, isSelection, originRowHeight, virtualScroll, originLineHeight]);
  return renderTd();
};
var _default = exports.default = BodyCell;