"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ValueType = void 0;
require("antd/es/spin/style/css");
var _spin = _interopRequireDefault(require("antd/es/spin"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
require("antd/es/tooltip/style/css");
var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
require("antd/es/select/style/css");
var _select = _interopRequireDefault(require("antd/es/select"));
var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");
var _recompose = require("recompose");
var _warning = _interopRequireDefault(require("util-g/lib/warning"));
var _classnames = _interopRequireDefault(require("classnames"));
var _withEdit = _interopRequireDefault(require("../with-edit"));
var _Receiver = _interopRequireDefault(require("./locale/Receiver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var selectorCache = new Map();
var Option = _select.default.Option;
var ValueType;
(function (ValueType) {
  ValueType["number"] = "number";
  ValueType["string"] = "string";
})(ValueType || (exports.ValueType = ValueType = {}));
var valueFormatter = (0, _defineProperty2.default)((0, _defineProperty2.default)({}, ValueType.number, Number), ValueType.string, String);
var defaultprop = {
  query: null,
  valueProp: 'value',
  valuePropType: 'string',
  labelProp: 'label',
  style: {},
  dataSource: [],
  multiple: false,
  allowClear: true,
  showSearch: true,
  readOnly: false,
  useStorage: true,
  useCache: true,
  optionLabel: undefined,
  isFilter: true,
  hideSelected: false,
  onSearch: function onSearch(_) {
    return _;
  },
  onSelect: function onSelect(_) {
    return _;
  },
  onChange: function onChange(_) {
    return _;
  },
  onDeselect: function onDeselect(_) {
    return _;
  },
  afterQuery: function afterQuery(_) {
    return _;
  },
  onDropdownVisibleChange: function onDropdownVisibleChange(_) {
    return _;
  },
  blurOnSelect: false,
  wrap: false,
  historyLength: 3,
  customNotDataContent: ''
};
var withLocalStorage = (0, _recompose.compose)((0, _recompose.defaultProps)({
  selectorId: 'selector'
}),
// setDisplayName('Selector'),
(0, _recompose.withProps)(function (_ref) {
  var selectorId = _ref.selectorId;
  (0, _warning.default)(selectorId, "\u8BF7\u786E\u4FDDselectorId\u4E3A\u4E00\u4E2A\u6709\u6548\u5B57\u7B26\u4E32");
  return {
    reg: new RegExp("^".concat(selectorId, "-(.*)$")),
    selectorStorageId: "selector:".concat(selectorId)
  };
}), (0, _recompose.withState)('storageList', 'setStorageList', function (_ref2) {
  var selectorStorageId = _ref2.selectorStorageId;
  return JSON.parse(localStorage.getItem(selectorStorageId) || '[]');
}), (0, _recompose.withHandlers)({
  forceUpdateStorageList: function forceUpdateStorageList(_ref3) {
    var setStorageList = _ref3.setStorageList,
      storageList = _ref3.storageList,
      selectorStorageId = _ref3.selectorStorageId;
    return function () {
      var list = JSON.parse(localStorage.getItem(selectorStorageId) || '[]');
      if (!(0, _lodash.isEqual)(storageList, list)) {
        setStorageList(list);
      }
    };
  }
}));
var withSelector = (0, _recompose.compose)((0, _recompose.defaultProps)(defaultprop), (0, _recompose.withState)('label', 'setLabel', null),
// 读模式下的显示文本
(0, _recompose.withState)('cacheLabel', 'setCacheLabel', function (_ref4) {
  var optionLabel = _ref4.optionLabel;
  return optionLabel;
}),
// 当前选项的文本, 在点确认的时候才更新
(0, _recompose.withState)('_loading', 'setLoading', function (_ref5) {
  var loading = _ref5.loading;
  return loading;
}), (0, _recompose.withState)('filter', 'setFilter', ''), (0, _recompose.withState)('selectRef', 'setSelectRef', null),
// select组件
(0, _recompose.withState)('dataList', 'setDataList', function (_ref6) {
  var dataSource = _ref6.dataSource;
  return dataSource;
}),
// 监听搜索
(0, _recompose.withPropsOnChange)(['filter'], function (_ref7) {
  var filter = _ref7.filter,
    selectorId = _ref7.selectorId;
  return {
    taskId: "".concat(selectorId, ":").concat(escape(filter).replace(/\%u/g, ''))
  };
}),
// // 监听loading
(0, _recompose.withPropsOnChange)(['loading', '_loading'], function (_ref8) {
  var _loading = _ref8._loading,
    loading = _ref8.loading;
  return {
    loading: _loading || loading
  };
}), (0, _recompose.withHandlers)({
  //将最近选择的项的key转化为真实的key
  storageToReal: function storageToReal(_ref9) {
    var selectorId = _ref9.selectorId,
      reg = _ref9.reg;
    return function (value) {
      if (typeof value !== 'string') return value;
      var newValue = value;
      if (!value.startsWith("".concat(selectorId, "_"))) return newValue;
      newValue = newValue.replace("".concat(selectorId, "_"), '');
      var _newValue$split = newValue.split('_'),
        _newValue$split2 = (0, _slicedToArray2.default)(_newValue$split, 2),
        valueType = _newValue$split2[0],
        _value = _newValue$split2[1];
      newValue = _value;
      if (valueType === 'number') newValue = (0, _lodash.toNumber)(newValue);
      return newValue;
    };
  }
}), (0, _recompose.withHandlers)({
  getValue: function getValue(_ref10) {
    var valueProp = _ref10.valueProp;
    return function (data) {
      return valueProp && (0, _lodash.isPlainObject)(data) ? data[valueProp] : data;
    };
  },
  getLabel: function getLabel(_ref11) {
    var storageToReal = _ref11.storageToReal,
      valueProp = _ref11.valueProp,
      labelProp = _ref11.labelProp;
    return function (data) {
      if (labelProp && (0, _lodash.isPlainObject)(data)) return valueProp == labelProp ? storageToReal(data[labelProp]) : data[labelProp];
      return data;
    };
  },
  setLabel: function setLabel(_ref12) {
    var originSetLabel = _ref12.setLabel,
      _ref12$splitStr = _ref12.splitStr,
      splitStr = _ref12$splitStr === void 0 ? '、' : _ref12$splitStr;
    return function (labels) {
      return originSetLabel(Array.isArray(labels) ? labels.filter(Boolean).join(splitStr) : labels);
    };
  }
}), (0, _recompose.withHandlers)({
  // 从dataList或者storageList中找到数据
  getItemLabel: function getItemLabel(_ref13) {
    var dataList = _ref13.dataList,
      storageList = _ref13.storageList,
      selectorId = _ref13.selectorId,
      getValue = _ref13.getValue,
      storageToReal = _ref13.storageToReal,
      getLabel = _ref13.getLabel,
      optionLabel = _ref13.optionLabel,
      useStorage = _ref13.useStorage;
    return function (value, index) {
      var list = (0, _lodash.concat)(dataList, storageList);
      // 启用缓存的情况下执行判断
      var valueItem = list.find(function (item) {
        return storageToReal(getValue(item)) === value;
      });
      if (valueItem) return getLabel(valueItem);
      var optionLabelArray = Array.isArray(optionLabel) ? optionLabel : [optionLabel];
      return optionLabelArray[index];
    };
  }
}), (0, _recompose.withPropsOnChange)(['multiple', 'mode'], function (_ref14) {
  var multiple = _ref14.multiple,
    mode = _ref14.mode;
  return {
    isMultiple: multiple || mode === 'multiple' || mode === 'tags'
  };
}), (0, _recompose.withPropsOnChange)(['value'], function (_ref15) {
  var dataList = _ref15.dataList,
    storageList = _ref15.storageList,
    value = _ref15.value,
    getValue = _ref15.getValue,
    selectorId = _ref15.selectorId,
    isMultiple = _ref15.isMultiple;
  if ((0, _lodash.isNil)(value)) {
    return {
      value: undefined
    };
  }
  var isArray = Array.isArray(value);
  var cValue = isArray ? value : [value];
  return {
    value: isMultiple ? cValue : cValue[0]
  };
}), (0, _recompose.withHandlers)({
  // 依赖转化后的value
  transformDataToList: function transformDataToList(_ref16) {
    var getLabel = _ref16.getLabel,
      getValue = _ref16.getValue,
      renderItem = _ref16.renderItem,
      optionLabelProp = _ref16.optionLabelProp,
      hideSelected = _ref16.hideSelected,
      isMultiple = _ref16.isMultiple,
      comValue = _ref16.value,
      selectorId = _ref16.selectorId,
      customLabel = _ref16.customLabel;
    return function (list) {
      var isStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return list.map(function (item) {
        var transformItemInfo = function transformItemInfo(item) {
          var value = getValue(item);
          var key = value || item.key;
          var label = getLabel(item);
          return {
            value: value,
            key: key,
            label: label
          };
        };
        if (renderItem) {
          return renderItem((0, _lodash.isPlainObject)(item) ? Object.assign(Object.assign({}, item), transformItemInfo(item)) : item, Option);
        }
        if ((0, _lodash.isPlainObject)(item)) {
          var disabled = item.disabled,
            title = item.title,
            className = item.className;
          var _transformItemInfo = transformItemInfo(item),
            value = _transformItemInfo.value,
            key = _transformItemInfo.key,
            label = _transformItemInfo.label;
          var show = true,
            style;
          if (hideSelected) {
            if (isMultiple) {
              show = comValue.every(function (v) {
                return v !== value;
              });
            } else {
              show = comValue !== value;
            }
          }
          if (!show) style = {
            display: 'none'
          };
          //支持 antd提供的回填到选择框的 Option 的属性值参数功能
          var optionLabelPropObj = optionLabelProp && item[optionLabelProp] ? (0, _defineProperty2.default)({}, optionLabelProp, item[optionLabelProp]) : {};
          var valueType = (0, _typeof2.default)(value);
          var optionValue = isStorage ? "".concat(selectorId, "_").concat(valueType, "_").concat(value) : value;
          return /*#__PURE__*/_react.default.createElement(Option, Object.assign({
            key: optionValue,
            value: optionValue,
            disabled: disabled,
            title: title,
            style: style,
            className: className
          }, optionLabelPropObj), customLabel ? customLabel(item) : label);
        }
        return /*#__PURE__*/_react.default.createElement(Option, {
          key: item,
          value: item
        }, item);
      });
    };
  },
  setLabelWithValue: function setLabelWithValue(_ref18) {
    var value = _ref18.value,
      setLabel = _ref18.setLabel,
      setCacheLabel = _ref18.setCacheLabel,
      getItemLabel = _ref18.getItemLabel;
    return function () {
      if ((0, _lodash.isNil)(value)) {
        setLabel(null);
        return;
      }
      var label = null;
      // 从dataList找到value对应的项
      // 如果没有找到就从storagelist里面找
      // 如果还是没有找到，那么就要使用optionLabel参数
      if (Array.isArray(value)) {
        // 多选
        label = value.map(function (itemValue, index) {
          return itemValue ? getItemLabel(itemValue, index) : null;
        });
      } else {
        label = getItemLabel(value);
      }
      setLabel(label); // 设置读模式下的显示文本
      setCacheLabel(label); // 设置选项的label
    };
  }
}), (0, _recompose.withHandlers)({
  updateStorage: function updateStorage(_ref19) {
    var selectorId = _ref19.selectorId,
      selectorStorageId = _ref19.selectorStorageId,
      storageList = _ref19.storageList,
      getValue = _ref19.getValue,
      valueProp = _ref19.valueProp,
      setStorageList = _ref19.setStorageList,
      useStorage = _ref19.useStorage,
      historyLength = _ref19.historyLength;
    return function (data, update) {
      if (!useStorage) return; // 不启用缓存
      var copyList = (0, _lodash.cloneDeep)(storageList);
      data.map(function (item) {
        var id = getValue(item);
        var isUpdate = update; // 为true表示从最近选择的项里面选择,只更新
        if (!isUpdate) {
          //
          var existed = copyList.some(function (pItem) {
            return getValue(pItem) === id;
          });
          isUpdate = existed; // 如果最近选择种已存在,将直接更新数据
          if (!existed) {
            // 新增最近被选择的数据
            if (valueProp && (0, _lodash.isPlainObject)(item)) {
              copyList.unshift(Object.assign(Object.assign({}, item), (0, _defineProperty2.default)({}, valueProp, id)));
            } else {
              copyList.unshift(id);
            }
            copyList = copyList.slice(0, historyLength); // 保留最近?条
          }
        }
        if (isUpdate) {
          copyList.map(function (item) {
            if (getValue(item) === id) {
              // 找到被选择的那一条，更新数据
              return valueProp && (0, _lodash.isPlainObject)(item) ? Object.assign(Object.assign({}, item), (0, _defineProperty2.default)({}, valueProp, id)) : id;
            }
            return item;
          });
        }
      });
      setStorageList(copyList); // 更新list
      localStorage.setItem(selectorStorageId, JSON.stringify(copyList)); // 更新缓存
    };
  },
  cleanStorage: function cleanStorage(_ref20) {
    var selectorStorageId = _ref20.selectorStorageId,
      setStorageList = _ref20.setStorageList;
    return function () {
      setStorageList([]); // 更新list
      localStorage.setItem(selectorStorageId, JSON.stringify([])); // 更新缓存
    };
  },
  getData: function getData(_ref21) {
    var taskId = _ref21.taskId,
      useCache = _ref21.useCache,
      loading = _ref21.loading,
      setLoading = _ref21.setLoading,
      query = _ref21.query,
      afterQuery = _ref21.afterQuery,
      filter = _ref21.filter,
      setDataList = _ref21.setDataList;
    return function () {
      if (!query) return;
      var task = null;
      if (!useCache) {
        // 不使用选择器缓存，由业务自己决定缓存
        setLoading(true);
        task = query(filter);
      } else {
        task = selectorCache.get(taskId);
        if (!task) {
          if (loading) return;
          setLoading(true);
          task = query(filter);
          selectorCache.set(taskId, task);
        }
      }
      if (!(task.then && typeof task.then === 'function')) task = Promise.resolve(task);
      task.then(function (data) {
        var list = Array.isArray(data) ? data : [];
        setLoading(false);
        setDataList(list);
        afterQuery && afterQuery(list, setDataList);
        // else {
        //   throw new Error('选择器选项列表只能是数组格式')
        // }
      });
    };
  }
}),
// 更新选项列表
//#region
(0, _recompose.withPropsOnChange)(['dataList', 'filter', 'storageList', 'loading'], function (_ref22) {
  var dataList = _ref22.dataList,
    filter = _ref22.filter,
    storageList = _ref22.storageList,
    cleanStorage = _ref22.cleanStorage,
    transformDataToList = _ref22.transformDataToList,
    loading = _ref22.loading,
    useStorage = _ref22.useStorage,
    query = _ref22.query,
    labelProp = _ref22.labelProp,
    getLabel = _ref22.getLabel,
    isFilter = _ref22.isFilter,
    getValue = _ref22.getValue,
    customNotDataContent = _ref22.customNotDataContent;
  var result = dataList;
  var toFilter = !query && filter && isFilter;
  if (toFilter) {
    /**
     * 筛选算法
     * axbxcx ---> abc true
     * abcabc ---> abc true
     * bacbcc ---> abc true
     * bbabdd ---> abc false 没有c
     */
    try {
      result = result.filter(function (item) {
        var label = getLabel(item);
        if (!label) {
          throw new Error("\u5E94\u7528\u9009\u62E9\u5668\u7684\u8FC7\u6EE4\u529F\u80FD\uFF0C\u8BF7\u786E\u4FDD\u5217\u8868\u6570\u636E\u4E2D".concat(labelProp, "\u5C5E\u6027\u5B58\u5728\uFF0C\u6216\u4FEE\u6539'labelProp'\u5BF9\u5E94\u7684\u5C5E\u6027\u540D\u79F0,\u4F5C\u4E3A\u8FC7\u6EE4\u7684\u4F9D\u636E"));
        }
        return label.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    } catch (e) {
      console.error(e);
    }
  }
  var list = [
  /*#__PURE__*/
  //'加载中...' : '没有查询到数据'
  _react.default.createElement(_select.default.Option, {
    key: "none",
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading ? locale.loading : customNotDataContent || locale.noData);
  }))];
  var hasGroup = result.some(function (item) {
    return item.group;
  });
  if (result.length) {
    if (!hasGroup) {
      list = transformDataToList(result);
    } else {
      var group = (0, _lodash.groupBy)(result, 'group');
      list = Object.entries(group).reduce(function (result, _ref23) {
        var _ref24 = (0, _slicedToArray2.default)(_ref23, 2),
          key = _ref24[0],
          data = _ref24[1];
        if (key !== 'undefined') {
          result.push( /*#__PURE__*/_react.default.createElement(_select.default.OptGroup, {
            key: key,
            label: key
          }, transformDataToList(data)));
        } else {
          result.push.apply(result, (0, _toConsumableArray2.default)(transformDataToList(data)));
        }
        return result;
      }, []);
    }
  }
  if (useStorage && !filter) {
    // 搜索结果
    var newItems = hasGroup ? list : ( /*#__PURE__*/_react.default.createElement(_select.default.OptGroup, {
      key: "result",
      label: /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.searchResult);
      })
    }, list));
    var selectedItems = /*#__PURE__*/_react.default.createElement(_select.default.OptGroup, {
      key: "recent",
      label: /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: {
            width: '100%',
            display: 'flex'
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          style: {
            flex: 1
          }
        }, locale.recentSelect), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
          title: locale.clearRecent
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "delete",
          style: {
            fontSize: '12px',
            lineHeight: '32px'
          },
          onClick: function onClick() {
            cleanStorage();
          }
        })));
      })
    }, storageList.length ? transformDataToList(storageList, true) : ( /*#__PURE__*/_react.default.createElement(_select.default.Option, {
      key: "empty",
      disabled: true
    }, /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.noRecent);
    }))));
    return {
      renderList: [selectedItems].concat(newItems)
    };
  } else {
    return {
      renderList: list
    };
  }
}),
//#endregion
(0, _recompose.withPropsOnChange)(['query'], function (_ref25) {
  var getData = _ref25.getData;
  return getData();
}),
// 下列属性变化的时候重新根据value值设置label
(0, _recompose.withPropsOnChange)(['value', 'optionLabel', 'dataList'], function (_ref26) {
  var setLabelWithValue = _ref26.setLabelWithValue;
  return setLabelWithValue();
}),
// 监听label
// withPropsOnChange(['optionLabel'], ({ optionLabel }) => {
//   return {
//     cacheLabel: optionLabel
//   }
// }),
// 去支持只传递dataSource，并且希望更新dataSource的情况
(0, _recompose.withPropsOnChange)(['dataSource'], function (_ref27) {
  var dataSource = _ref27.dataSource,
    setDataList = _ref27.setDataList;
  return setDataList(dataSource);
}), (0, _recompose.mapProps)(function (_a) {
  var dataSource = _a.dataSource,
    transformDataToList = _a.transformDataToList,
    props = __rest(_a, ["dataSource", "transformDataToList"]);
  return props;
}));
var withChange = (0, _recompose.withPropsOnChange)(
// 外部value到内部value对象形式的转换
['value', 'cacheLabel'], function (_ref28) {
  var value = _ref28.value,
    optionLabel = _ref28.optionLabel,
    cacheLabel = _ref28.cacheLabel,
    isMultiple = _ref28.isMultiple;
  // 这里的value是外部传进来的value,约定是一个基础类型的值
  if ((0, _lodash.isNil)(value)) return {
    value: undefined
  };
  var showLabel = cacheLabel || optionLabel;
  if (isMultiple) {
    var sValue = undefined;
    if (Array.isArray(showLabel)) {
      sValue = (0, _lodash.zipWith)(value, showLabel, function (key, label) {
        return {
          key: key,
          label: label
        };
      });
    } else {
      sValue = value.map(function (key) {
        return {
          key: key,
          label: showLabel
        };
      });
    }
    return {
      value: sValue.slice(0, value.length)
    };
  }
  return {
    value: {
      key: value,
      label: showLabel
    }
  };
});
var BasicSelector = /*#__PURE__*/function (_PureComponent) {
  function BasicSelector(props) {
    var _this;
    (0, _classCallCheck2.default)(this, BasicSelector);
    _this = _callSuper(this, BasicSelector, [props]);
    _this.onSearch = (0, _lodash.debounce)(function (value) {
      var _this$props = _this.props,
        onSearch = _this$props.onSearch,
        setFilter = _this$props.setFilter,
        getData = _this$props.getData;
      setFilter(value);
      getData();
      onSearch(value);
      // this.props.renderList=[]
    }, 300);
    _this.getItem = function (realKey) {
      var _this$props2 = _this.props,
        valueProp = _this$props2.valueProp,
        dataList = _this$props2.dataList,
        storageList = _this$props2.storageList,
        getValue = _this$props2.getValue,
        storageToReal = _this$props2.storageToReal;
      var item = dataList.find(function (item) {
        return getValue(item) === realKey;
      }) || storageList.find(function (item) {
        return storageToReal(getValue(item)) === realKey;
      });
      return item ? Object.assign(Object.assign({}, item), (0, _defineProperty2.default)({}, valueProp, realKey)) : undefined;
    };
    _this.onChange = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var value = args[0];
      var _this$props3 = _this.props,
        onChange = _this$props3.onChange,
        setCacheLabel = _this$props3.setCacheLabel,
        storageToReal = _this$props3.storageToReal,
        valuePropType = _this$props3.valuePropType,
        useStorage = _this$props3.useStorage,
        selectorId = _this$props3.selectorId,
        updateStorage = _this$props3.updateStorage;
      var keys = undefined;
      var labels = undefined;
      var items = [];
      if (value) {
        if (Array.isArray(value)) {
          var keyMap = new Map();
          var ItemMap = new Map();
          value.forEach(function (_ref29) {
            var key = _ref29.key,
              label = _ref29.label;
            var realKey = storageToReal(key);
            if (!keyMap.has(realKey)) {
              keyMap.set(realKey, label);
              ItemMap.set(realKey, _this.getItem(realKey));
            } else {
              // 如果已经有相同的key了，那么说明这是需要删除的项
              keyMap.delete(realKey);
              ItemMap.delete(realKey);
            }
          });
          if (keyMap.size) {
            keys = (0, _toConsumableArray2.default)(keyMap.keys()).map(function (k) {
              return valueFormatter[valuePropType](k);
            });
            labels = (0, _toConsumableArray2.default)(keyMap.values());
            items = (0, _toConsumableArray2.default)(ItemMap.values());
          }
        } else {
          var readKey = storageToReal(value.key);
          keys = valueFormatter[valuePropType](readKey);
          labels = value.label;
          items = [_this.getItem(readKey)];
        }
      }
      setCacheLabel(labels);
      onChange(keys, items);
      if (useStorage && !!selectorId) {
        updateStorage(items, false); // isStorage为true,表示当前只是更新操作.加快updateStorage的速度
      }
      // 清除状态下重新搜索
      if (!value) {
        _this.onSearch('');
      }
    };
    _this.onopen = function (open) {
      var _this$props4 = _this.props,
        onDropdownVisibleChange = _this$props4.onDropdownVisibleChange,
        forceUpdateStorageList = _this$props4.forceUpdateStorageList;
      // 展开选择面板的时候执行一次query，重置数据
      // 适用场景是一个页面有多个相同的组件的时候，，打开第一个并选择会更新缓存
      // 打开第二个时候也能重新拿到最新的缓存数据
      if (open) {
        forceUpdateStorageList();
      }
      onDropdownVisibleChange(open);
    };
    _this.onFocus = function () {
      if (!_this.props.selectRef) return;
      var _this$props5 = _this.props,
        readOnly = _this$props5.readOnly,
        isMultiple = _this$props5.isMultiple,
        setFilter = _this$props5.setFilter;
      var _this$props$selectRef = _this.props.selectRef.rcSelect,
        getInputDOMNode = _this$props$selectRef.getInputDOMNode,
        getInputElement = _this$props$selectRef.getInputElement;
      var input = getInputDOMNode() || getInputElement();
      if (input) {
        if (readOnly && isMultiple) {
          var isReadOnly = input.getAttribute('readOnly');
          if (!isReadOnly) input.setAttribute('readOnly', 'readOnly');
        }
        if (isMultiple) {
          setFilter('');
        }
      }
    };
    _this.renderSelect = function () {
      var _this2 = _this,
        onSearch = _this2.onSearch,
        onSelect = _this2.onSelect,
        onChange = _this2.onChange,
        onopen = _this2.onopen,
        onFocus = _this2.onFocus;
      var _a = _this.props,
        multiple = _a.multiple,
        readOnly = _a.readOnly,
        renderList = _a.renderList,
        _a$loading = _a.loading,
        loading = _a$loading === void 0 ? false : _a$loading,
        style = _a.style,
        wrapperRef = _a.wrapperRef,
        addonAfter = _a.addonAfter,
        setSelectRef = _a.setSelectRef,
        dropdownClassName = _a.dropdownClassName,
        className = _a.className,
        wrap = _a.wrap,
        children = _a.children,
        props = __rest(_a, ["multiple", "readOnly", "renderList", "loading", "style", "wrapperRef", "addonAfter", "setSelectRef", "dropdownClassName", "className", "wrap", "children"]);
      if (readOnly) {
        props.open = false;
        props.showSearch = false;
      }
      if (multiple) props.mode = 'multiple';
      var select = /*#__PURE__*/_react.default.createElement(_select.default, Object.assign({
        showArrow: true,
        loading: loading,
        dropdownMatchSelectWidth: false
      }, props, {
        onFocus: onFocus,
        ref: setSelectRef,
        className: (0, _classnames.default)('gant-selector', className, !wrap && 'gant-selector-no-wrap'),
        onSearch: onSearch,
        onSelect: onSelect,
        onChange: onChange,
        onDropdownVisibleChange: onopen,
        labelInValue: true,
        filterOption: false,
        dropdownRender: function dropdownRender(menu) {
          return /*#__PURE__*/_react.default.createElement(_spin.default, {
            spinning: loading
          }, menu);
        },
        dropdownClassName: (0, _classnames.default)(dropdownClassName, 'gant-selector-dropdown')
      }), children || renderList);
      return select;
    };
    _this.onSelect = _this.onSelect.bind(_this);
    _this.onSearch = _this.onSearch.bind(_this);
    return _this;
  }
  (0, _inherits2.default)(BasicSelector, _PureComponent);
  return (0, _createClass2.default)(BasicSelector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props6 = this.props,
        onApiRef = _this$props6.onApiRef,
        updateStorage = _this$props6.updateStorage,
        cleanStorage = _this$props6.cleanStorage,
        forceUpdateStorageList = _this$props6.forceUpdateStorageList;
      onApiRef && onApiRef({
        updateStorage: updateStorage,
        cleanStorage: cleanStorage,
        forceUpdateStorageList: forceUpdateStorageList
      });
    }
  }, {
    key: "onSelect",
    value: function onSelect(select, option) {
      var _this$props7 = this.props,
        onSelect = _this$props7.onSelect,
        selectRef = _this$props7.selectRef,
        isMultiple = _this$props7.isMultiple,
        query = _this$props7.query,
        filter = _this$props7.filter,
        setFilter = _this$props7.setFilter,
        blurOnSelect = _this$props7.blurOnSelect;
      onSelect(select.key, option);
      if (blurOnSelect && !isMultiple) {
        // 单选的情况下、选中失焦
        setTimeout(function () {
          selectRef.blur();
        }, 0);
      }
      // 配合在不是通过query获取数据的情况下的过滤行为，
      // 选中的时候要去掉过滤条件
      if (!query && filter) {
        setFilter('');
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderSelect();
    }
  }]);
}(_react.PureComponent);
var SelectorComponent = (0, _recompose.compose)(_recompose.toClass, withLocalStorage, withSelector, (0, _withEdit.default)(function (_ref30) {
  var label = _ref30.label;
  return label;
}, 'gant-selector-dropdown'), withChange)(BasicSelector);
var Selector = exports.default = /*#__PURE__*/function (_Component) {
  function Selector() {
    (0, _classCallCheck2.default)(this, Selector);
    return _callSuper(this, Selector, arguments);
  }
  (0, _inherits2.default)(Selector, _Component);
  return (0, _createClass2.default)(Selector, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(SelectorComponent, Object.assign({}, this.props));
    }
  }]);
}(_react.Component);