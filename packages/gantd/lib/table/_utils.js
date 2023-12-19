"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStorageWidth = exports.getPureRecord = exports.getPureList = exports.getListRange = exports.getComputedColIndex = exports.diffList = exports.computeIndexAndRowKey = exports.computeIndex = exports.cloneDatasource = void 0;
exports.getStyleText = getStyleText;
exports.originKey = exports.getVirtualList = void 0;
exports.renderColumnItem = renderColumnItem;
exports.useRowSelection = exports.usePagination = exports.toggleFixedTableScroll = exports.toggleFixedTable = exports.switchIndex = exports.setStyle = exports.setStorageWidth = exports.setMainTableBorder = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

require("antd/es/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireWildcard(require("lodash"));

var _rcTableUtils = _interopRequireDefault(require("./_rc-table-utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function transcode(value, codeData) {
  var index = _lodash.default.findIndex(codeData, {
    value: value
  });

  if (index < 0) return "-";
  return codeData[index].label;
}

function renderColumnItem(item, text, record, index) {
  var wrappedCilItem = Object.assign({
    showTip: false,
    placement: 'rightBottom'
  }, item);
  var _text = text;
  _text = wrappedCilItem.codeData && Array.isArray(wrappedCilItem.codeData) ? transcode(_text, wrappedCilItem.codeData) : _text;
  _text = wrappedCilItem.isDate ? wrappedCilItem.format ? (0, _moment.default)(_text).format(wrappedCilItem.format) : (0, _moment.default)(_text).format('YYYY-MM-DD') : _text;

  if (wrappedCilItem.render && typeof wrappedCilItem.render === 'function') {
    _text = wrappedCilItem.render(_text, record, index);
  }

  if (wrappedCilItem.showTip) return (
    /*#__PURE__*/
    // showTip开启才显示tip
    _react.default.createElement(_tooltip.default, {
      placement: wrappedCilItem.placement,
      title: _text,
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("span", null, _text, " "))
  );
  return _text;
} // columnWidth	自定义列表选择框宽度	string|number	60px
// columnTitle	自定义列表选择框标题	string|React.ReactNode	-
// fixed	把选择框列固定在左边	boolean	-
// getCheckboxProps	选择框的默认属性配置	Function(record)	-
// hideDefaultSelections	自定义选择项时去掉『全选』『反选』两个默认选项	boolean	false
// selectedRowKeys	指定选中项的 key 数组，需要和 onChange 进行配合	string[]	[]
// selections	自定义选择项 配置项, 设为 true 时使用默认选择项	object[]|boolean	true
// type	多选/单选，checkbox or radio	string	checkbox
// onChange	选中项发生变化时的回调	Function(selectedRowKeys, selectedRows)	-
// onSelect	用户手动选择/取消选择某行的回调	Function(record, selected, selectedRows, nativeEvent)	-
// onSelectAll	用户手动选择/取消选择所有行的回调	Function(selected, selectedRows, changeRows)	-
// onSelectInvert	用户手动选择反选的回调	Function(selectedRows)	-
// 获取级联选择的key值


function getSubKeys(record) {
  var keys = [];

  if (record.children && record.children.length) {
    record.children.reduce(function (keys, item, index) {
      var key = item["g-row-key"];
      var subKeys = getSubKeys(item);
      keys.push.apply(keys, [key].concat((0, _toConsumableArray2.default)(subKeys)));
      return keys;
    }, keys);
  }

  return keys;
}

var defaultColumnWidth = 35; // 勾选列的宽度

var useRowSelectionProps = function useRowSelectionProps(rowSelection) {
  var _ref = rowSelection || {},
      _ref$selectedRowKeys = _ref.selectedRowKeys,
      originSelectedKeys = _ref$selectedRowKeys === void 0 ? [] : _ref$selectedRowKeys,
      _ref$columnWidth = _ref.columnWidth,
      columnWidth = _ref$columnWidth === void 0 ? defaultColumnWidth : _ref$columnWidth,
      _ref$showFooterSelect = _ref.showFooterSelection,
      showFooterSelection = _ref$showFooterSelect === void 0 ? true : _ref$showFooterSelect,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "checkbox" : _ref$type,
      _ref$preventDefault = _ref.preventDefault,
      preventDefault = _ref$preventDefault === void 0 ? true : _ref$preventDefault,
      getCheckboxProps = _ref.getCheckboxProps;

  var isMultiple = type === 'checkbox';
  return {
    originSelectedKeys: originSelectedKeys,
    columnWidth: columnWidth,
    showFooterSelection: showFooterSelection,
    preventDefault: preventDefault,
    getCheckboxProps: getCheckboxProps,
    isMultiple: isMultiple
  };
};

var useRowSelection = function useRowSelection(rowSelection, dataSource, bordered) {
  var getFlatRecords = (0, _react.useCallback)(function (list) {
    return list.reduce(function (records, record) {
      records.push(record);

      if (record.children && record.children.length) {
        records.push.apply(records, getFlatRecords(record.children));
      }

      return records;
    }, []);
  }, []);

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      flatRecords = _useState2[0],
      setFlatRecords = _useState2[1];

  (0, _react.useEffect)(function () {
    setFlatRecords(getFlatRecords(dataSource));
  }, [dataSource]);

  var _useRowSelectionProps = useRowSelectionProps(rowSelection),
      originSelectedKeys = _useRowSelectionProps.originSelectedKeys,
      columnWidth = _useRowSelectionProps.columnWidth,
      showFooterSelection = _useRowSelectionProps.showFooterSelection,
      preventDefault = _useRowSelectionProps.preventDefault,
      originGetCheckoutProps = _useRowSelectionProps.getCheckboxProps,
      isMultiple = _useRowSelectionProps.isMultiple;

  var _useState3 = (0, _react.useState)(originSelectedKeys),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedRowKeys = _useState4[0],
      setselectedRowKeys = _useState4[1]; // 计算选中行


  (0, _react.useEffect)(function () {
    // 去掉g-row-key
    var rows = flatRecords.filter(function (record) {
      return selectedRowKeys.includes(record["g-row-key"]);
    });

    if (typeof _lodash.default.get(rowSelection, 'onChange') === 'function') {
      var pureRows = getPureList(rows);
      rowSelection.onChange(selectedRowKeys, pureRows);
    }
  }, [selectedRowKeys]); // 计算最终选中的key、每次计算都用rowSelection.selectedRowKeys来获得最新的keys

  var getSelectedKeys = (0, _react.useCallback)(function (keys, selected) {
    if (selected) {
      return _lodash.default.union(originSelectedKeys, keys);
    }

    return _lodash.default.difference(originSelectedKeys, keys);
  }, [originSelectedKeys]); // 勾选或者点击行选中

  var onSelectRow = (0, _react.useCallback)(function (record, selected) {
    if (!rowSelection) return;
    var key = record["g-row-key"]; // 当前节点的key

    var subKeys = [];

    if (isMultiple) {
      // preventDefault表示不选中子节点
      if (!preventDefault && record.children && record.children.length) {
        // 也可以不用判断,只是对于没有子节点的节点来说不用执行下面的代码
        subKeys = getSubKeys(record); // 子节点的key
      }

      var computedKeys = getSelectedKeys([key].concat((0, _toConsumableArray2.default)(subKeys)), selected);
      setselectedRowKeys(computedKeys);
    } else {
      setselectedRowKeys([key]);
    }

    if (typeof rowSelection.onSelect === 'function') {
      var rows = isMultiple ? getFlatRecords([record]) : record; // 获取纯净数据

      var pureRows = getPureList(rows);
      rowSelection.onSelect(pureRows, selected);
    }
  }, [rowSelection]); // 设置选中的行,供外部使用
  // 获取到的实际时行数据，会带有children,但是不会有非enumerable属性
  // 为了统一，需要omit掉

  var setKeys = (0, _react.useCallback)(function (record) {
    if (typeof rowSelection !== 'undefined') {
      var selected = !originSelectedKeys.includes(record["g-row-key"]);
      onSelectRow(record, selected);
    }
  }, [originSelectedKeys, rowSelection]); // 点击选择框
  // 默认的选择功能
  // 不会带有children, 但有非enumerable属性

  var onSelect = (0, _react.useCallback)(function () {
    onSelectRow.apply(void 0, arguments);
  }, [rowSelection]);
  var onChange = (0, _react.useCallback)( // 防止onChange多次调用，所以加一个拦截
  function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rowKeys = args[0];
    setselectedRowKeys(rowKeys);
  }, []);
  var getCheckboxProps = (0, _react.useCallback)(function (record) {
    var props = {// className: '123'
    };

    if (typeof originGetCheckoutProps === 'function') {
      var originProps = originGetCheckoutProps(record);

      if (_lodash.default.isPlainObject(originProps)) {
        props = Object.assign(Object.assign({}, props), originProps);
      }
    }

    return props;
  }, [originGetCheckoutProps]);
  var footerselectionstyle = (0, _react.useMemo)(function () {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 8px 0 4px',
      marginLeft: '-4px',
      width: parseInt(columnWidth) + 4,
      visibility: isMultiple ? 'show' : 'hidden',
      borderRight: bordered ? '1px solid transparent' : undefined
    };
  }, [isMultiple, columnWidth, bordered]);

  var _useMemo = (0, _react.useMemo)(function () {
    return [originSelectedKeys.length > 0 && originSelectedKeys.length < flatRecords.length, originSelectedKeys.length > 0];
  }, [originSelectedKeys, flatRecords]),
      _useMemo2 = (0, _slicedToArray2.default)(_useMemo, 2),
      indeterminate = _useMemo2[0],
      footerselectionchecked = _useMemo2[1];

  var onFooterSelectionChange = (0, _react.useCallback)(function (e) {
    if (indeterminate === footerselectionchecked) {
      //全选
      var keys = _lodash.default.map(flatRecords, "g-row-key");

      setselectedRowKeys(keys);
    } else {
      // 取消全选
      setselectedRowKeys([]);
    }
  }, [indeterminate, footerselectionchecked, flatRecords]);
  var footerselection = (0, _react.useMemo)(function () {
    if (!showFooterSelection || !isMultiple) return null;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: footerselectionstyle
    }, /*#__PURE__*/_react.default.createElement(_checkbox.default, {
      indeterminate: indeterminate,
      checked: footerselectionchecked,
      onChange: onFooterSelectionChange
    }));
  }, [showFooterSelection, indeterminate, originSelectedKeys, onFooterSelectionChange, isMultiple]);
  if (!rowSelection) return [null, setKeys, null];
  rowSelection.columnWidth = columnWidth;
  rowSelection.getCheckboxProps = getCheckboxProps;
  return [Object.assign(Object.assign({}, rowSelection), {
    onSelect: onSelect,
    onChange: onChange
  }), setKeys, footerselection];
};

exports.useRowSelection = useRowSelection;

var usePagination = function usePagination(pagination, rowselection) {
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var showTotal = (0, _react.useCallback)(function (total, range) {
    return total > 0 ? "\u7B2C".concat(range[0], " - ").concat(range[1], "\u6761\uFF0C\u5171").concat(total, "\u6761") : '';
  }, []);

  var _useState5 = (0, _react.useState)({
    defaultPageSize: 50,
    defaultCurrent: 1,
    pageSizeOptions: ["20", "50", "80", "120"],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: showTotal,
    total: length
  }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 1),
      defaultPagination = _useState6[0];

  var computedPagination = (0, _react.useMemo)(function () {
    if (pagination) {
      if (_lodash.default.isPlainObject(pagination)) return Object.assign(Object.assign({}, defaultPagination), pagination);
      return defaultPagination;
    }

    return false;
  }, [pagination]);
  var onChange = (0, _react.useCallback)(function () {
    var onChange = _lodash.default.get(computedPagination, 'onChange');

    onChange && onChange.apply(void 0, arguments);
  }, [computedPagination]);

  if (pagination) {
    return Object.assign(Object.assign({}, computedPagination), {
      onShowSizeChange: onChange,
      onChange: onChange
    });
  }
};

exports.usePagination = usePagination;

var setStorageWidth = function setStorageWidth(ele, tableKey, key) {
  var _ele$getBoundingClien = ele.getBoundingClientRect(),
      width = _ele$getBoundingClien.width;

  if (tableKey) {
    var storage = window.localStorage.getItem(tableKey);
    var obj = storage && /{.*}/.test(storage) ? JSON.parse(storage) : {};

    var storageWidth = _lodash.default.get(obj, 'width', {});

    storageWidth[key] = width;
    obj.width = storageWidth;
    window.localStorage.setItem(tableKey, JSON.stringify(obj));
  }
};

exports.setStorageWidth = setStorageWidth;

var getStorageWidth = function getStorageWidth(key) {
  if (key) {
    var obj = window.localStorage.getItem(key);

    if (obj && /{.*}/.test(obj)) {
      return _lodash.default.get(JSON.parse(obj), 'width', {});
    }

    return {}; // if (!_.isNil(width) && Number.isFinite(Number(width))) { // 从缓存中取得数据
    //   return Number(width)
    // }
  }
};
/**
 *
 * @param {HTMLTbaleElement} table 主table
 */


exports.getStorageWidth = getStorageWidth;

var toggleFixedTable = function toggleFixedTable(tableParent) {
  // 找打content区域
  var tablecontent = _lodash.default.get(tableParent, 'parentElement.parentElement');

  if (!tablecontent) return;
  var left = tablecontent.querySelector('.ant-table-fixed-left');
  var right = tablecontent.querySelector('.ant-table-fixed-right');

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  toggleFixedTableScroll.apply(void 0, [left].concat(args));
  toggleFixedTableScroll.apply(void 0, [right].concat(args));
};

exports.toggleFixedTable = toggleFixedTable;

var setStyle = function setStyle(dom, text) {
  if (!dom) return;
  requestAnimationFrame(function () {
    var cssText = dom.style.cssText;
    dom.style.cssText = cssText ? "".concat(cssText, ";").concat(text) : text;
  });
};

exports.setStyle = setStyle;

function getStyleText(p) {
  return (0, _lodash.isNumber)(p) ? p + "px" : p;
} // 在有固定列的情况下，如果主table的宽度小于容器宽度要隐藏滚动条的占位

/**
 *
 * @param {*} fix 固定列容器
 * @param {*} hide 隐藏还是显示
 */


var toggleFixedTableScroll = function toggleFixedTableScroll(fix) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  var scrollY = args[0],
      scrollX = args[1],
      hasScrollY = args[2];
  var scrollbarmeasure = (0, _rcTableUtils.default)({
    direction: 'horizontal',
    prefixCls: 'antd'
  });

  if (fix) {
    var outer = fix.querySelector('.ant-table-body-outer');
    var inner = fix.querySelector('.ant-table-body-inner'); // setStyle(inner, "overflow-y: hidden")
    // scrollX --- 设置outer的margin-bottom属性为负值
    // scrollY --- 设置inner的overflow-x属性为scroll

    if (hasScrollY) {
      if (scrollY) {
        setStyle(inner, "overflow-y: scroll");

        if (scrollX) {
          // 负值保证主table在拖拽的时候不会卡住
          setStyle(outer, "margin-bottom: -".concat(scrollbarmeasure, "px"));
          setStyle(inner, "overflow-x: scroll");
        } else {
          setStyle(outer, "margin-bottom: 0");
          setStyle(inner, "overflow-x: hidden");
        }
      } else {
        setStyle(inner, "overflow-y: hidden");

        if (scrollX) {
          setStyle(outer, "margin-bottom: -".concat(scrollbarmeasure, "px"));
          setStyle(inner, "overflow-x: hidden");
        } else {
          setStyle(outer, "margin-bottom: 0");
          setStyle(inner, "overflow-x: hidden");
        }
      }
    } else {
      // scrollY一定时false
      setStyle(inner, "overflow: hidden"); // 这时候不需要设置负margin给滚动条让位

      setStyle(outer, "margin-bottom: 0");
    }

    var table = inner.querySelector('table');
    setTableBorderBottom(table, !scrollY || scrollY && scrollX);
  }
};

exports.toggleFixedTableScroll = toggleFixedTableScroll;

var switchIndex = function switchIndex(_ref2, from, to) {
  var _ref3 = (0, _toArray2.default)(_ref2),
      list = _ref3.slice(0);

  list.splice(to < 0 ? list.length + to : to, 0, list.splice(from, 1)[0]);
  return list;
}; // 根据内容高度计算是否显示border-bottom


exports.switchIndex = switchIndex;

var setMainTableBorder = function setMainTableBorder(table, headerFixed, dataLength) {
  var showBorderBottom = false; // 非固定头部的table，并且没有数据的时候，设置一个border-bottom
  // 防止被placeholder

  if (!headerFixed) {
    if (!dataLength) showBorderBottom = true;
  } else {
    var parent = _lodash.default.get(table, 'parentElement');

    if (!parent) return;
    var scrollHeight = parent.offsetWidth > parent.clientWidth; // 出现纵向滚动

    var scrollWidth = parent.offsetHeight > parent.clientHeight; // 出现横向滚动

    showBorderBottom = !scrollHeight || scrollHeight && scrollWidth;
  }

  setTableBorderBottom(table, showBorderBottom);
};

exports.setMainTableBorder = setMainTableBorder;

var setTableBorderBottom = function setTableBorderBottom(table, show) {
  setStyle(table, show ? 'border-bottom: 1px solid rgba(126,126,126,0.3)' : 'border-bottom: 0');
}; // 定义不可枚举属性


var defineProperty = function defineProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    writable: false,
    value: value
  });
};

var defineProperties = function defineProperties(obj, data) {
  for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    data[key] = {
      writable: false,
      value: data[key]
    };
  }

  Object.defineProperties(obj, data);
};

var originKey = "__origin";
/**
 * 计算序号和可展开rowKey
 */

exports.originKey = originKey;

var computeIndexAndRowKey = function computeIndexAndRowKey(list, computedRowKey) {
  var rowKey = [];
  var index = 0;
  var items = [{
    root: true,
    children: list
  }];

  while (items.length) {
    var item = items.shift();

    if (!item.root) {
      item["g-index"] = ++index;
      item["g-row-key"] = computedRowKey(item, index);
    }

    if (!_lodash.default.isUndefined(item.children)) {
      if (!item.root) rowKey.push(item["g-row-key"]);

      if (item.children.length) {
        items.unshift.apply(items, (0, _toConsumableArray2.default)(item.children));
      }
    }
  }

  return [list, rowKey];
};

exports.computeIndexAndRowKey = computeIndexAndRowKey;

var cloneDatasource = function cloneDatasource(dataSource) {
  return dataSource.map(function (item) {
    var freezeObj = _lodash.default.cloneDeep(item);

    Object.freeze(freezeObj);

    var copyItem = _lodash.default.cloneDeep(item);

    Object.defineProperty(copyItem, originKey, {
      value: freezeObj,
      writable: false,
      configurable: false,
      enumerable: true
    });

    if (_lodash.default.get(copyItem, "children.length")) {
      copyItem.children = cloneDatasource(copyItem.children);
    }

    return copyItem;
  });
};
/**
 * 计算diff数据
 * @param {Array<any>} oldList 编辑之前的原始数据
 * @param {Array<any>} newList 编辑之后的列表
 * @param {function} computedRowKey  计算数据的key
 * @param {boolean} isTree 是否是树状结构
 */


exports.cloneDatasource = cloneDatasource;

var diffList = function diffList(oldList, newList) {
  var isTree = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var addList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var delList = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var modifyList = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  // console.log('整个列表', newList)
  // 2、计算新增节点
  // console.time('计算新增节点')
  newList.reduce(function (result, newItem) {
    var isAdd = !newItem.hasOwnProperty(originKey);

    if (isAdd) {
      pushChildrenToList(result[0], [newItem]);
    } else {
      var oldItem = newItem[originKey];
      var oi = oldItem,
          ni = newItem;

      if (isTree) {
        oi = _lodash.default.omit(oldItem, 'children');
        ni = _lodash.default.omit(newItem, 'children'); // 比较子树

        var oldChildLength = _lodash.default.get(oldItem, 'children.length');

        var newChildLength = _lodash.default.get(newItem, 'children.length');

        if (oldChildLength || newChildLength) {
          // 进入子级比较
          var _diffList = diffList(_lodash.default.get(oldItem, 'children', []), _lodash.default.get(newItem, 'children', []), isTree),
              _diffList2 = (0, _slicedToArray2.default)(_diffList, 3),
              subAddList = _diffList2[0],
              subDelList = _diffList2[1],
              subModifyList = _diffList2[2];

          addList.push.apply(addList, subAddList);
          result[0].push.apply(result[0], subDelList);
          result[1].push.apply(result[1], subModifyList);
        }
      } //   // 比较数据本身


      oi = getPureRecord(oi);
      ni = getPureRecord(ni);

      if (!_lodash.default.isEqual(oi, ni)) {
        result[1].push(ni);
      }
    }

    return result;
  }, [addList, modifyList]); // console.timeEnd('计算新增节点')
  // 3、计算删除节点
  // 4、计算修改节点
  // console.time('计算删改节点')

  oldList.reduce(function (list, oldItem) {
    var pureOld = getPureRecord(oldItem);
    var isDelete = newList.every(function (newItem) {
      return !_lodash.default.isEqual(getPureRecord(newItem[originKey]), pureOld);
    });

    if (isDelete) {
      // 删除的数据
      pushChildrenToList(list, [oldItem]);
    }

    return list;
  }, delList); // console.timeEnd('计算删改节点')

  return [addList, delList, modifyList];
};

exports.diffList = diffList;

var pushChildrenToList = function pushChildrenToList(list, items) {
  items.forEach(function (item) {
    list.push(getPureRecord(item));

    if (_lodash.default.get(item, "children.length")) {
      pushChildrenToList(list, item.children);
    }
  });
};
/**
 * 获取dataindex对应的index
 * 用于列缩放是找到对应的col元素，来设置实际的宽度
 * @param {*} cols 列数据
 */


var getComputedColIndex = function getComputedColIndex(cols) {
  // console.time('计算columnIndex')
  var colIndexs = [];

  var inner = function inner(subCols) {
    subCols.forEach(function (subCol) {
      var childrenLength = _lodash.default.get(subCol, "children.length");

      if (childrenLength) {
        inner(_lodash.default.get(subCol, "children", []));
      } else {
        colIndexs.push(subCol.dataIndex);
      }
    });
  };

  inner(cols);
  return colIndexs;
};
/**
 * @param {Array} list
 * @param {number} withIndex
 * @param {number} parent
 */


exports.getComputedColIndex = getComputedColIndex;

var computeIndex = function computeIndex(list) {
  var expandRowKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var virtualScroll = arguments.length > 2 ? arguments[2] : undefined;

  // console.time('计算序号')
  // 因为需要对数据的children进行操作
  var copyList = _lodash.default.cloneDeep(list); // 所有数据的key


  var renderRowKeys = []; // 所有数据平铺结构

  var tilingList = []; // 所有可以展开的数据key

  var expandableRowKeys = [];
  var items = [];
  items.push({
    nestLevel: 0,
    node: {
      'g-root': true,
      children: copyList
    }
  });

  var _loop = function _loop() {
    var _items$shift = items.shift(),
        node = _items$shift.node,
        nestLevel = _items$shift.nestLevel,
        gprk = _items$shift["g-parent-row-key"],
        gp = _items$shift["g-parent"];

    var rowKey = node["g-row-key"];

    if (!node['g-root']) {
      defineProperty(node, "g-level", nestLevel); // 关联父级节点

      if (gprk !== undefined) {
        var _defineProperties;

        defineProperties(node, (_defineProperties = {}, (0, _defineProperty2.default)(_defineProperties, "g-parent-row-key", gprk), (0, _defineProperty2.default)(_defineProperties, "g-parent", gp), _defineProperties));
      } else {
        // 根节点
        defineProperty(node, "g-parent-row-key", 'root');
      }

      renderRowKeys.push(rowKey);
      tilingList.push(node);
    }

    if (node.children !== undefined) {
      if (_lodash.default.get(node, "children.length")) {
        if (!virtualScroll || node['g-root'] || expandRowKeys.includes(rowKey)) {
          items.unshift.apply(items, (0, _toConsumableArray2.default)(node.children.map(function (child) {
            return {
              node: child,
              nestLevel: nestLevel + 1,
              "g-parent-row-key": rowKey,
              "g-parent": node
            };
          })));
        } else if (virtualScroll) {
          // 虚拟滚动下删除掉children
          node.children = [];
        }
      }

      if (!node['g-root']) {
        expandableRowKeys.push(rowKey);
      }
    }
  };

  while (items.length) {
    _loop();
  } // console.timeEnd('计算序号')


  return [list, renderRowKeys, tilingList, expandableRowKeys];
};
/**
 * 计算虚拟滚动有效数据、防止出现末页数据不足以全部占据table内容区域，而出现底部空白
 * @param list
 * @param start
 * @param length
 */


exports.computeIndex = computeIndex;

var getListRange = function getListRange(list, start, length) {
  // list.slice(start, start + length);
  var count = list.length;
  return list.slice(Math.min(start, count - length), start + length);
};

exports.getListRange = getListRange;

var getVirtualList = function getVirtualList(start, length, renderRowKeys, list) {
  // const keys = renderRowKeys.slice(start, start+length);
  // 拟定要去掉的属性
  var result = getListRange(list, start, length);
  if (!result.length) return result;

  do {
    var _a = _lodash.default.groupBy(result, 'g-parent-row-key'),
        _a$root = _a.root,
        root = _a$root === void 0 ? [] : _a$root,
        groups = __rest(_a, ["root"]);

    var entries = Object.entries(groups).reverse();

    var _iterator = _createForOfIteratorHelper(entries),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
            parentRowKey = _step$value[0],
            nodes = _step$value[1];

        var seted = false;

        var _iterator2 = _createForOfIteratorHelper(root),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;

            if (String(item['g-row-key']) === parentRowKey) {
              if (!item.children || !item.children.length) {
                item.children = nodes;
              } else {
                (function () {
                  var idsGroup = _lodash.default.groupBy(nodes, 'g-row-key');

                  item.children = item.children.map(function (subItem) {
                    return _lodash.default.get(idsGroup[subItem["g-row-key"]], '0', subItem);
                  });
                })();
              }

              seted = true;
              break;
            }
          } // 在root中没有找到父级节点

        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (!seted) {
          var gp = nodes[0]["g-parent"];
          gp.children = nodes;
          root.unshift(gp);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    result = root;
  } while (!result.every(function (item) {
    return item["g-parent-row-key"] === 'root';
  }));

  return result;
}; // 获取纯净数据


exports.getVirtualList = getVirtualList;

var getPureRecord = function getPureRecord(record) {
  var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var omitPropo = ["g-parent", "g-parent-row-key", "g-level", "children", "g-row-key", "g-index", originKey];

  if (exclude.length) {
    omitPropo = _lodash.default.difference(omitPropo, exclude);
  }

  return _lodash.default.omit(record, omitPropo);
};

exports.getPureRecord = getPureRecord;

var getPureList = function getPureList(list) {
  return list.map(function (item) {
    return getPureRecord(item);
  });
};

exports.getPureList = getPureList;