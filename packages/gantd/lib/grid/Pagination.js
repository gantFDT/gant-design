"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginationShowTotal = exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/es/input-number/style/css");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/switch/style/css");

var _switch = _interopRequireDefault(require("antd/es/switch"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/pagination/style/css");

var _pagination = _interopRequireDefault(require("antd/es/pagination"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _Receiver = _interopRequireDefault(require("./locale/Receiver"));

var _hooks = require("./hooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

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

var heightSize = {
  small: 30,
  default: 40,
  large: 50
};

var _default = /*#__PURE__*/(0, _react.memo)(function GantPagination(props) {
  var addonAfter = props.addonAfter,
      addonBefore = props.addonBefore,
      numberGoToMode = props.numberGoToMode,
      onRefresh = props.onRefresh,
      countLimit = props.countLimit,
      _props$mode = props.mode,
      mode = _props$mode === void 0 ? 'default' : _props$mode,
      tooltipTotal = props.tooltipTotal,
      total = props.total,
      onChange = props.onChange,
      propCurrent = props.current,
      PropPageSize = props.pageSize,
      beginIndex = props.beginIndex,
      defaultPageSize = props.defaultPageSize,
      defaultCurrent = props.defaultCurrent,
      _size = props.size,
      align = props.align,
      Component = props.Component,
      resetProps = __rest(props, ["addonAfter", "addonBefore", "numberGoToMode", "onRefresh", "countLimit", "mode", "tooltipTotal", "total", "onChange", "current", "pageSize", "beginIndex", "defaultPageSize", "defaultCurrent", "size", "align", "Component"]); //如果传入的是large, 就转为default , 因为antd原生分页条没有large


  var size = _size === 'large' ? 'default' : _size;

  var _useState = (0, _react.useState)('limit'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      innerMode = _useState2[0],
      setInnerMode = _useState2[1];

  var _useState3 = (0, _react.useState)({
    current: defaultCurrent,
    pageSize: defaultPageSize,
    beginIndex: 0
  }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      pageInfo = _useState4[0],
      setPageInfo = _useState4[1];

  var disableLimit = (0, _react.useMemo)(function () {
    return total != countLimit;
  }, [total, countLimit]);
  (0, _react.useEffect)(function () {
    var pageSize = PropPageSize ? PropPageSize : defaultPageSize;
    var current = propCurrent ? propCurrent : defaultCurrent;
    if ((0, _lodash.isNumber)(beginIndex)) current = Math.floor(beginIndex / pageSize) + 1;

    var _beginIndex = (current - 1) * pageSize;

    setPageInfo({
      pageSize: pageSize,
      current: current,
      beginIndex: _beginIndex
    });
    return function () {};
  }, [propCurrent, PropPageSize, beginIndex]);
  var limit = (0, _react.useMemo)(function () {
    return mode === 'limit' && innerMode === 'limit' && !disableLimit;
  }, [mode, innerMode, disableLimit]);
  var onPageChange = (0, _react.useCallback)(function (page, pageSize) {
    var beginIndex = (page - 1) * pageSize;
    setPageInfo({
      beginIndex: beginIndex,
      pageSize: pageSize,
      current: page
    });

    if (onChange) {
      limit ? onChange(beginIndex, pageSize, page, countLimit) : onChange(beginIndex, pageSize, page);
    }
  }, [onChange, limit, countLimit]);
  var showTotal = (0, _react.useCallback)(function (total, range) {
    return /*#__PURE__*/_react.default.createElement(PaginationTotal, {
      total: total,
      range: range,
      limit: limit,
      tooltipTotal: tooltipTotal,
      size: size
    });
  }, [limit, tooltipTotal]);
  var paginationProps = (0, _react.useMemo)(function () {
    var beginIndex = pageInfo.beginIndex,
        _pageInfo = __rest(pageInfo, ["beginIndex"]);

    return Object.assign(Object.assign(Object.assign({
      size: size
    }, resetProps), _pageInfo), {
      onChange: onPageChange,
      onShowSizeChange: onPageChange,
      showTotal: showTotal,
      total: limit ? countLimit : total
    });
  }, [onPageChange, size, resetProps, pageInfo, total, countLimit, limit, showTotal]);
  var onSwitchChange = (0, _react.useCallback)(function (value) {
    var current = pageInfo.current,
        pageSize = pageInfo.pageSize,
        beginIndex = pageInfo.beginIndex;
    !value ? onChange(beginIndex, pageSize, current, countLimit) : onChange(beginIndex, pageSize, current);

    var _mode = value ? 'default' : 'limit';

    setInnerMode(_mode);
  }, [pageInfo, onChange, countLimit]);
  var PaginationComponent = (0, _react.useMemo)(function () {
    return Component ? Component : _pagination.default;
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gantd-grid-footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      height: heightSize[size],
      justifyContent: align === 'left' ? 'start' : 'end'
    }
  }, addonBefore && /*#__PURE__*/_react.default.createElement("div", null, addonBefore), /*#__PURE__*/_react.default.createElement(PaginationComponent, Object.assign({
    className: "gant-grid-pagination"
  }, (0, _lodash.omit)(paginationProps, numberGoToMode ? ['showQuickJumper', 'quickGo'] : []))), numberGoToMode && /*#__PURE__*/_react.default.createElement(NumberGoTo, Object.assign({}, (0, _lodash.pick)(paginationProps, ['quickGo', 'disabled', 'showQuickJumper', 'pageSize', 'total', 'goButton', 'size']), {
    onPageChange: onPageChange
  })), onRefresh && /*#__PURE__*/_react.default.createElement(_button.default, {
    icon: "reload",
    size: size,
    onClick: function onClick() {
      if (onRefresh) return onRefresh();
      console.warn('Function refresh is null');
    },
    style: {
      fontSize: 12
    }
  }), addonAfter && /*#__PURE__*/_react.default.createElement("div", null, addonAfter)), mode === 'limit' && /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        marginLeft: 4
      }
    }, "".concat(locale.exactSearch).concat(locale.targetLang === 'zh-CN' ? '：' : ':')), /*#__PURE__*/_react.default.createElement(_switch.default, {
      onChange: onSwitchChange,
      size: "small",
      className: "grid-pagination-mode-switch"
    }));
  }));
});

exports.default = _default;

function PaginationTotal(props) {
  var _this = this;

  var propsTotal = props.total,
      range = props.range,
      limit = props.limit,
      tooltipTotal = props.tooltipTotal,
      size = props.size;

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      total = _useState8[0],
      setTotal = _useState8[1];

  var onHover = (0, _react.useCallback)(function () {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _total;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof tooltipTotal === 'number')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", setTotal(tooltipTotal));

            case 2:
              if (!(typeof tooltipTotal === 'function')) {
                _context.next = 12;
                break;
              }

              setLoading(true);
              _context.prev = 4;
              _context.next = 7;
              return tooltipTotal();

            case 7:
              _total = _context.sent;
              setTotal(_total);

            case 9:
              _context.prev = 9;
              setLoading(false);
              return _context.finish(9);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4,, 9, 12]]);
    }));
  }, [tooltipTotal]);
  if (limit) return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return locale.targetLang === 'zh-CN' ?
    /*#__PURE__*/
    // 中文
    _react.default.createElement(_react.default.Fragment, null, "\u7B2C".concat(range[0], " - ").concat(range[1], "\u6761\uFF0C").concat(propsTotal, "+ "), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: loading ? locale.loadingOoo : "".concat(locale.exactNumber, ":") + total,
      onVisibleChange: function onVisibleChange(visible) {
        visible && onHover();
      }
    }, /*#__PURE__*/_react.default.createElement(_button.default, {
      size: "small",
      className: "gantd-pagination-total-btn",
      type: "link",
      icon: "exclamation-circle"
    }))) :
    /*#__PURE__*/
    // 其他语言
    _react.default.createElement(_react.default.Fragment, null, "".concat(range[0], "-").concat(range[1], " ").concat(locale.of, " ").concat(propsTotal, " ").concat(locale.items));
  });
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return locale.targetLang === 'zh-CN' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "\u7B2C".concat(range[0], " - ").concat(range[1], "\u6761\uFF0C\u5171").concat(propsTotal, "\u6761")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(range[0], "-").concat(range[1], " ").concat(locale.of, " ").concat(propsTotal, " ").concat(locale.items));
  });
}

var NumberGoTo = function NumberGoTo(props) {
  var quickGo = props.quickGo,
      disabled = props.disabled,
      showQuickJumper = props.showQuickJumper,
      goButton = props.goButton,
      pageSize = props.pageSize,
      total = props.total,
      onPageChange = props.onPageChange,
      size = props.size;

  if (!showQuickJumper || total <= pageSize) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }

  var _useState9 = (0, _react.useState)(undefined),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      value = _useState10[0],
      setValue = _useState10[1];

  var prevValue = (0, _hooks.usePrev)(value);
  var gotoButton = null;
  var inputRef = (0, _react.useRef)({});
  var max = Math.ceil(total / pageSize);

  var parser = function parser(val) {
    return val && val.replace(/\D+|^0/g, '');
  };

  var onChange = function onChange(v) {
    return setValue(v);
  };

  var validValue = function validValue(val) {
    return val > max ? max : val;
  };

  var failed = !value || !onPageChange || prevValue === value;

  var handleBlur = function handleBlur() {
    if (goButton || failed) {
      return;
    }

    onPageChange(validValue(value), pageSize);
  };

  var go = function go(e) {
    var _a;

    if (failed) return;

    if (e.keyCode === 13 || e.type === 'click') {
      // 当用回车触发回调且输入值大于最大页码时，直接触发失焦事件让输入值更改为max值
      if (e.keyCode === 13 && value > max) {
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.inputNumberRef.blur();
        return;
      }

      onPageChange(validValue(value), pageSize);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    if (quickGo && goButton) {
      gotoButton = typeof goButton === 'boolean' ? /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: go,
        onKeyUp: go,
        disabled: disabled,
        className: "gant-quick-jumper-button"
      }, locale.jump_to_confirm) : /*#__PURE__*/_react.default.createElement("span", {
        onClick: go,
        onKeyUp: go
      }, goButton);
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "gantd-pagination-number-goto"
    }, locale.jumpTo, /*#__PURE__*/_react.default.createElement(_inputNumber.default, {
      ref: inputRef,
      size: size,
      min: 1,
      max: max,
      disabled: disabled,
      value: value,
      parser: parser,
      onBlur: handleBlur,
      onKeyUp: go,
      onChange: onChange,
      "aria-label": locale.page
    }), locale.targetLang === 'zh-CN' && locale.page, gotoButton);
  });
};

var paginationShowTotal = function paginationShowTotal(total, range, limit, tooltipTotal) {
  return /*#__PURE__*/_react.default.createElement(PaginationTotal, {
    total: total,
    range: range,
    limit: limit,
    tooltipTotal: tooltipTotal
  });
};

exports.paginationShowTotal = paginationShowTotal;