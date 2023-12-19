"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ValueType = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _select = _interopRequireDefault(require("antd/lib/select"));

var _antdVirtualSelect = _interopRequireDefault(require("antd-virtual-select"));

var _lodash = require("lodash");

var _recompose = require("recompose");

var _warning = _interopRequireDefault(require("../util/warning"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withEdit = _interopRequireDefault(require("../with-edit"));

var _Receiver = _interopRequireDefault(require("./locale/Receiver"));

var _valueFormatter;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

var selectorCache = new Map();
var Option = _select.default.Option;
var ValueType;
exports.ValueType = ValueType;

(function (ValueType) {
  ValueType["number"] = "number";
  ValueType["string"] = "string";
})(ValueType || (exports.ValueType = ValueType = {}));

var valueFormatter = (_valueFormatter = {}, (0, _defineProperty2.default)(_valueFormatter, ValueType.number, Number), (0, _defineProperty2.default)(_valueFormatter, ValueType.string, String), _valueFormatter);
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
  optionLabel: null,
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
}), // setDisplayName('Selector'),
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
var withSelector = (0, _recompose.compose)((0, _recompose.defaultProps)(defaultprop), (0, _recompose.withState)('label', 'setLabel', null), // 读模式下的显示文本
(0, _recompose.withState)('cacheLabel', 'setCacheLabel', function (_ref4) {
  var optionLabel = _ref4.optionLabel;
  return optionLabel;
}), // 当前选项的文本, 在点确认的时候才更新
(0, _recompose.withState)('loading', 'setLoading', false), (0, _recompose.withState)('filter', 'setFilter', ''), (0, _recompose.withState)('selectRef', 'setSelectRef', null), // select组件
(0, _recompose.withState)('dataList', 'setDataList', function (_ref5) {
  var dataSource = _ref5.dataSource;
  return dataSource;
}), // 监听搜索
(0, _recompose.withPropsOnChange)(['filter'], function (_ref6) {
  var filter = _ref6.filter,
      selectorId = _ref6.selectorId;
  return {
    taskId: "".concat(selectorId, ":").concat(escape(filter).replace(/\%u/g, ''))
  };
}), (0, _recompose.withHandlers)({
  //将最近选择的项的key转化为真实的key
  storageToReal: function storageToReal(_ref7) {
    var selectorId = _ref7.selectorId,
        reg = _ref7.reg;
    return function (value) {
      // 最近选择
      if (value === null || value === void 0 ? void 0 : value.startsWith(selectorId)) return value.replace(reg, '$1');
      return value;
    };
  }
}), (0, _recompose.withHandlers)({
  getValue: function getValue(_ref8) {
    var valueProp = _ref8.valueProp;
    return function (data) {
      return String(valueProp && (0, _lodash.isPlainObject)(data) ? data[valueProp] : data);
    };
  },
  getLabel: function getLabel(_ref9) {
    var storageToReal = _ref9.storageToReal,
        valueProp = _ref9.valueProp,
        labelProp = _ref9.labelProp;
    return function (data) {
      if (labelProp && (0, _lodash.isPlainObject)(data)) return valueProp == labelProp ? storageToReal(data[labelProp]) : data[labelProp];
      return data;
    };
  },
  setLabel: function setLabel(_ref10) {
    var originSetLabel = _ref10.setLabel,
        _ref10$splitStr = _ref10.splitStr,
        splitStr = _ref10$splitStr === void 0 ? '、' : _ref10$splitStr;
    return function (labels) {
      return originSetLabel(Array.isArray(labels) ? labels.filter(Boolean).join(splitStr) : labels);
    };
  }
}), (0, _recompose.withHandlers)({
  // 从dataList或者storageList中找到数据
  getItemLabel: function getItemLabel(_ref11) {
    var dataList = _ref11.dataList,
        storageList = _ref11.storageList,
        selectorId = _ref11.selectorId,
        getValue = _ref11.getValue,
        storageToReal = _ref11.storageToReal,
        getLabel = _ref11.getLabel,
        optionLabel = _ref11.optionLabel,
        useStorage = _ref11.useStorage;
    return function (value) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var list = (0, _lodash.concat)(dataList, storageList); // 启用缓存的情况下执行判断
      // fix: 解决当storageId恰好是value的前缀的情况

      if (useStorage && (value === null || value === void 0 ? void 0 : value.startsWith(selectorId))) {
        list = storageList;
      }

      var valueItem = list.find(function (item) {
        return storageToReal(getValue(item)) === value;
      });
      if (valueItem) return getLabel(valueItem);
      var optionLabelArray = Array.isArray(optionLabel) ? optionLabel : [optionLabel];
      return optionLabelArray[index];
    };
  }
}), (0, _recompose.withPropsOnChange)(['multiple', 'mode'], function (_ref12) {
  var multiple = _ref12.multiple,
      mode = _ref12.mode;
  return {
    isMultiple: multiple || mode === 'multiple' || mode === 'tags'
  };
}), (0, _recompose.withPropsOnChange)(['value'], function (_ref13) {
  var dataList = _ref13.dataList,
      storageList = _ref13.storageList,
      value = _ref13.value,
      getValue = _ref13.getValue,
      selectorId = _ref13.selectorId,
      isMultiple = _ref13.isMultiple;

  if ((0, _lodash.isNil)(value)) {
    return {
      value: undefined
    };
  }

  var isArray = Array.isArray(value);
  var cValue = isArray ? value : [value];
  var transormedValue = cValue.map(function (cv) {
    var v = String(cv);
    var isInList = dataList.find(function (item) {
      return getValue(item) === v;
    });
    var isInStorage = storageList.find(function (item) {
      return getValue(item) === v;
    }); // 选择的缓存中的数据，需要做一层转化

    if (!isInList && isInStorage) {
      return "".concat(selectorId, "-").concat(v);
    }

    return v;
  });
  return {
    value: isMultiple ? transormedValue : transormedValue[0]
  };
}), (0, _recompose.withHandlers)({
  // 依赖转化后的value
  transformDataToList: function transformDataToList(_ref14) {
    var getLabel = _ref14.getLabel,
        getValue = _ref14.getValue,
        renderItem = _ref14.renderItem,
        optionLabelProp = _ref14.optionLabelProp,
        hideSelected = _ref14.hideSelected,
        isMultiple = _ref14.isMultiple,
        comValue = _ref14.value;
    return function (list) {
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
          }; //支持 antd提供的回填到选择框的 Option 的属性值参数功能

          var optionLabelPropObj = optionLabelProp && item[optionLabelProp] ? (0, _defineProperty2.default)({}, optionLabelProp, item[optionLabelProp]) : {};
          return /*#__PURE__*/_react.default.createElement(Option, Object.assign({
            key: key,
            value: value,
            disabled: disabled,
            title: title,
            style: style,
            className: className
          }, optionLabelPropObj), label);
        }

        return /*#__PURE__*/_react.default.createElement(Option, {
          key: item,
          value: item
        }, item);
      });
    };
  },
  setLabelWithValue: function setLabelWithValue(_ref16) {
    var value = _ref16.value,
        setLabel = _ref16.setLabel,
        setCacheLabel = _ref16.setCacheLabel,
        getItemLabel = _ref16.getItemLabel;
    return function () {
      if ((0, _lodash.isNil)(value)) {
        setLabel(null);
        return;
      }

      var label = null; // 从dataList找到value对应的项
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
  updateStorage: function updateStorage(_ref17) {
    var selectorId = _ref17.selectorId,
        selectorStorageId = _ref17.selectorStorageId,
        storageList = _ref17.storageList,
        getValue = _ref17.getValue,
        valueProp = _ref17.valueProp,
        setStorageList = _ref17.setStorageList,
        useStorage = _ref17.useStorage,
        historyLength = _ref17.historyLength;
    return function (data, update) {
      if (!useStorage) return; // 不启用缓存

      var copyList = (0, _lodash.cloneDeep)(storageList);
      data.map(function (item) {
        var id = "".concat(selectorId, "-").concat(getValue(item));
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
  cleanStorage: function cleanStorage(_ref18) {
    var selectorId = _ref18.selectorId,
        selectorStorageId = _ref18.selectorStorageId,
        storageList = _ref18.storageList,
        getValue = _ref18.getValue,
        valueProp = _ref18.valueProp,
        setStorageList = _ref18.setStorageList,
        useStorage = _ref18.useStorage;
    return function (data, update) {
      setStorageList([]); // 更新list

      localStorage.setItem(selectorStorageId, JSON.stringify([])); // 更新缓存
    };
  },
  getData: function getData(_ref19) {
    var taskId = _ref19.taskId,
        useCache = _ref19.useCache,
        loading = _ref19.loading,
        setLoading = _ref19.setLoading,
        query = _ref19.query,
        afterQuery = _ref19.afterQuery,
        filter = _ref19.filter,
        setDataList = _ref19.setDataList;
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
        afterQuery && afterQuery(list, setDataList); // else {
        //   throw new Error('选择器选项列表只能是数组格式')
        // }
      });
    };
  }
}), // 更新选项列表
//#region
(0, _recompose.withPropsOnChange)(['dataList', 'filter', 'storageList', 'loading'], function (_ref20) {
  var dataList = _ref20.dataList,
      filter = _ref20.filter,
      storageList = _ref20.storageList,
      cleanStorage = _ref20.cleanStorage,
      transformDataToList = _ref20.transformDataToList,
      loading = _ref20.loading,
      useStorage = _ref20.useStorage,
      query = _ref20.query,
      labelProp = _ref20.labelProp,
      getLabel = _ref20.getLabel,
      isFilter = _ref20.isFilter,
      customNotDataContent = _ref20.customNotDataContent;
  var result = dataList;

  if (!query && filter && isFilter) {
    /**
     * 筛选算法
     * axbxcx ---> abc true
     * abcabc ---> abc true
     * bacbcc ---> abc true
     * bbabdd ---> abc false 没有c
     */
    try {
      result = dataList.filter(function (item) {
        var label = getLabel(item);

        if (!label) {
          throw new Error("\u5E94\u7528\u9009\u62E9\u5668\u7684\u8FC7\u6EE4\u529F\u80FD\uFF0C\u8BF7\u786E\u4FDD\u5217\u8868\u6570\u636E\u4E2D".concat(labelProp, "\u5C5E\u6027\u5B58\u5728\uFF0C\u6216\u4FEE\u6539'labelProp'\u5BF9\u5E94\u7684\u5C5E\u6027\u540D\u79F0,\u4F5C\u4E3A\u8FC7\u6EE4\u7684\u4F9D\u636E"));
        }

        return label.toLowerCase().indexOf(filter.toLowerCase()) > -1; // const LastIndex = filter.split('').reduce(
        //   (index, char) => {
        //     if (index === -1) return -1;
        //     let label = getLabel(item)
        //     if (!label) {
        //       throw new Error(`应用选择器的过滤功能，请确保列表数据中${labelProp}属性存在，或修改'labelProp'对应的属性名称,作为过滤的依据`)
        //     }
        //     label = label.toUpperCase()
        //     char = char.toUpperCase()
        //     return label.slice(index).indexOf(char)
        //   },
        //   0
        // )
        // return ~LastIndex
      });
    } catch (e) {
      console.error(e);
    }
  }

  var list = [];
  list = transformDataToList(result);
  list = list.length > 0 ? list : [
  /*#__PURE__*/
  //'加载中...' : '没有查询到数据'
  _react.default.createElement(_antdVirtualSelect.default.Option, {
    key: "none",
    disabled: true
  }, /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading ? locale.loading : customNotDataContent || locale.noData);
  }))];
  return {
    renderList: list
  };
}), //#endregion
(0, _recompose.withPropsOnChange)(['query'], function (_ref21) {
  var getData = _ref21.getData;
  return getData();
}), // 下列属性变化的时候重新根据value值设置label
(0, _recompose.withPropsOnChange)(['value', 'optionLabel', 'dataList'], function (_ref22) {
  var setLabelWithValue = _ref22.setLabelWithValue;
  return setLabelWithValue();
}), // 监听label
// withPropsOnChange(['optionLabel'], ({ optionLabel }) => {
//   return {
//     cacheLabel: optionLabel
//   }
// }),
// 去支持只传递dataSource，并且希望更新dataSource的情况
(0, _recompose.withPropsOnChange)(['dataSource'], function (_ref23) {
  var dataSource = _ref23.dataSource,
      setDataList = _ref23.setDataList;
  return setDataList(dataSource);
}), (0, _recompose.mapProps)(function (_a) {
  var dataSource = _a.dataSource,
      transformDataToList = _a.transformDataToList,
      props = __rest(_a, ["dataSource", "transformDataToList"]);

  return props;
}));
var withChange = (0, _recompose.withPropsOnChange)( // 外部value到内部value对象形式的转换
['value', 'cacheLabel'], function (_ref24) {
  var value = _ref24.value,
      optionLabel = _ref24.optionLabel,
      cacheLabel = _ref24.cacheLabel,
      isMultiple = _ref24.isMultiple;
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
  (0, _inherits2.default)(BasicSelector, _PureComponent);

  var _super = _createSuper(BasicSelector);

  function BasicSelector(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BasicSelector);
    _this = _super.call(this, props);
    _this.onSearch = (0, _lodash.debounce)(function (value) {
      var _this$props = _this.props,
          onSearch = _this$props.onSearch,
          setFilter = _this$props.setFilter,
          getData = _this$props.getData;
      setFilter(value);
      getData();
      onSearch(value); // this.props.renderList=[]
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
          valuePropType = _this$props3.valuePropType;
      var keys = undefined;
      var labels = undefined;
      var items = [];

      if (value) {
        if (Array.isArray(value)) {
          var keyMap = new Map();
          var ItemMap = new Map();
          value.forEach(function (_ref25) {
            var key = _ref25.key,
                label = _ref25.label;
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
      onChange(keys, items); // 清除状态下重新搜索

      if (!value) {
        _this.onSearch('');
      }
    };

    _this.onopen = function (open) {
      var _this$props4 = _this.props,
          onDropdownVisibleChange = _this$props4.onDropdownVisibleChange,
          forceUpdateStorageList = _this$props4.forceUpdateStorageList; // 展开选择面板的时候执行一次query，重置数据
      // 适用场景是一个页面有多个相同的组件的时候，，打开第一个并选择会更新缓存
      // 打开第二个时候也能重新拿到最新的缓存数据

      if (open) {
        forceUpdateStorageList();
      }

      onDropdownVisibleChange(open);
    };

    _this.onFocus = function () {
      var _this$props5 = _this.props,
          readOnly = _this$props5.readOnly,
          isMultiple = _this$props5.isMultiple,
          _this$props5$selectRe = _this$props5.selectRef,
          selectRef = _this$props5$selectRe === void 0 ? {} : _this$props5$selectRe,
          setFilter = _this$props5.setFilter;
      var rcSelect = selectRef.rcSelect;
      if (!rcSelect) return;
      var getInputDOMNode = rcSelect.getInputDOMNode,
          getInputElement = rcSelect.getInputElement;
      var getInput = getInputDOMNode || getInputElement;
      var input = getInput === null || getInput === void 0 ? void 0 : getInput();

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
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          onSearch = _assertThisInitialize.onSearch,
          onSelect = _assertThisInitialize.onSelect,
          onChange = _assertThisInitialize.onChange,
          onopen = _assertThisInitialize.onopen,
          onFocus = _assertThisInitialize.onFocus;

      var _a = _this.props,
          multiple = _a.multiple,
          readOnly = _a.readOnly,
          renderList = _a.renderList,
          loading = _a.loading,
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

      var select = /*#__PURE__*/_react.default.createElement(_antdVirtualSelect.default, Object.assign({
        showArrow: true,
        loading: loading
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
        dropdownClassName: (0, _classnames.default)(dropdownClassName, 'gant-selector-dropdown')
      }), children || renderList);

      return select;
    };

    _this.onSelect = _this.onSelect.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSearch = _this.onSearch.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(BasicSelector, [{
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
      var _a;

      var _this$props7 = this.props,
          onSelect = _this$props7.onSelect,
          dataList = _this$props7.dataList,
          storageList = _this$props7.storageList,
          selectorId = _this$props7.selectorId,
          getValue = _this$props7.getValue,
          updateStorage = _this$props7.updateStorage,
          selectRef = _this$props7.selectRef,
          isMultiple = _this$props7.isMultiple,
          query = _this$props7.query,
          filter = _this$props7.filter,
          setFilter = _this$props7.setFilter,
          blurOnSelect = _this$props7.blurOnSelect,
          storageToReal = _this$props7.storageToReal;
      var key = storageToReal(select.key); // 获取真实的key值

      var originItem = dataList.find(function (item) {
        return getValue(item) === key;
      });
      var isStorage = (_a = select.key) === null || _a === void 0 ? void 0 : _a.startsWith(selectorId);

      if (!isStorage || originItem) {
        // 从搜索出来的数据中选择.或者在最近选择中选择了有搜索出来的数据
        onSelect(key, originItem);
        updateStorage([originItem], isStorage); // isStorage为true,表示当前只是更新操作.加快updateStorage的速度
      } else {
        var item = storageList.find(function (item) {
          return getValue(item) === select.key;
        });
        onSelect(key, item);
      }

      if (blurOnSelect && !isMultiple) {
        // 单选的情况下、选中失焦
        setTimeout(function () {
          selectRef.blur();
        }, 0);
      } // 配合在不是通过query获取数据的情况下的过滤行为，
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
  return BasicSelector;
}(_react.PureComponent);

var SelectorComponent = (0, _recompose.compose)(_recompose.toClass, withLocalStorage, withSelector, (0, _withEdit.default)(function (_ref26) {
  var label = _ref26.label;
  return label;
}, 'gant-selector-dropdown'), withChange)(BasicSelector);

var Selector = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Selector, _Component);

  var _super2 = _createSuper(Selector);

  function Selector() {
    (0, _classCallCheck2.default)(this, Selector);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2.default)(Selector, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(SelectorComponent, Object.assign({}, this.props));
    }
  }]);
  return Selector;
}(_react.Component);

exports.default = Selector;