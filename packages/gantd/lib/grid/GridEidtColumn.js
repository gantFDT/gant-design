"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _editStatus = _interopRequireDefault(require("../edit-status"));

var _lodash = require("lodash");

var _utils = require("./gridManager/utils");

var _utils2 = require("./utils");

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

var defalutProps = {
  autoFocus: true,
  edit: _editStatus.default.EDIT
};

var _default = function _default(WrapperComponent) {
  return /*#__PURE__*/(0, _react.forwardRef)(function GridEidtColumn(props, ref) {
    var _this = this;

    var nodeValue = props.value,
        stopEditing = props.stopEditing,
        api = props.api,
        data = props.data,
        field = props.colDef.field,
        fieldProps = props.props,
        changeFormatter = props.changeFormatter,
        initValueFormatter = props.initValueFormatter,
        valueGetter = props.valueGetter,
        _props$context = props.context,
        size = _props$context.size,
        gridManager = _props$context.gridManager,
        onCellEditChange = _props$context.onCellEditChange,
        onCellEditingChange = _props$context.onCellEditingChange,
        getRowNodeId = _props$context.getRowNodeId,
        onCellChanged = _props$context.onCellChanged,
        _props$refName = props.refName,
        refName = _props$refName === void 0 ? 'wrapperRef' : _props$refName,
        _props$valuePropName = props.valuePropName,
        valuePropName = _props$valuePropName === void 0 ? 'value' : _props$valuePropName,
        cellEditorPopup = props.cellEditorPopup,
        node = props.node;
    var value = (0, _react.useMemo)(function () {
      return initValueFormatter ? initValueFormatter(props) : nodeValue;
    }, [nodeValue]);

    var _useState = (0, _react.useState)(value),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        newValue = _useState2[0],
        setNewValue = _useState2[1];

    var divRef = (0, _react.useRef)(null);
    var inputRef = (0, _react.useRef)();
    var compoentProps = (0, _react.useMemo)(function () {
      if (typeof fieldProps === 'function') return fieldProps(node.data, props);
      return fieldProps;
    }, [fieldProps, node.data, props]);
    var handleCellEditingChange = (0, _react.useCallback)(function (chageVal, editData) {
      for (var _len = arguments.length, ags = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        ags[_key - 2] = arguments[_key];
      }

      return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res, resIndex, changeData, callValue, editChangeValue;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                gridManager.loading = true;
                res = editData;

                if (!onCellEditingChange) {
                  _context.next = 17;
                  break;
                }

                _context.next = 5;
                return onCellEditingChange(editData, field, chageVal, value, {
                  context: props.context,
                  extra: ags
                });

              case 5:
                res = _context.sent;
                res = Array.isArray(res) ? res : [res];
                resIndex = (0, _lodash.findIndex)(res, function (item) {
                  return getRowNodeId(item) === getRowNodeId(data);
                });
                changeData = (0, _lodash.get)(res, "[".concat(resIndex, "]"), {});
                callValue = (0, _lodash.get)(changeData, "".concat(field));
                editChangeValue = initValueFormatter ? initValueFormatter(Object.assign(Object.assign({}, props), {
                  node: Object.assign(Object.assign({}, node), {
                    data: Object.assign({}, changeData)
                  }),
                  data: Object.assign({}, changeData),
                  value: callValue
                })) : callValue;
                if (!(0, _utils.isEqualObj)(editChangeValue, chageVal)) setNewValue(editChangeValue);

                if (!(0, _lodash.isEmpty)(res)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", console.warn('celleditingChange must be callbak result'));

              case 14:
                _context.next = 16;
                return gridManager.modify(res);

              case 16:
                typeof onCellChanged == 'function' && onCellChanged(editData, field, chageVal, value);

              case 17:
                gridManager.loading = false;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    }, [onCellEditingChange, onCellChanged, props.context]);
    var onChange = (0, _react.useCallback)(function (val) {
      for (var _len2 = arguments.length, ags = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        ags[_key2 - 1] = arguments[_key2];
      }

      return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var chageVal, data, editData;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                chageVal = val;
                data = node.data;
                data = (0, _lodash.cloneDeep)(data);
                if (typeof changeFormatter === 'function') chageVal = changeFormatter.apply(void 0, [val, data].concat(ags));
                editData = (0, _lodash.set)(data, field, chageVal);
                setNewValue(chageVal);
                handleCellEditingChange.apply(void 0, [chageVal, editData].concat(ags));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
    }, [changeFormatter, field, node, handleCellEditingChange]);
    var handleCellEditChange = (0, _react.useCallback)(function (newValue) {
      return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var editData, oldData;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                editData = (0, _lodash.cloneDeep)((0, _lodash.get)(node, "data"));
                oldData = (0, _lodash.cloneDeep)(data);
                (0, _lodash.set)(editData, "".concat(field), newValue);
                gridManager.loading = true;

                if (!onCellEditChange) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return onCellEditChange(editData, field, newValue, value, {
                  context: props.context
                });

              case 7:
                editData = _context3.sent;

              case 8:
                _context3.next = 10;
                return gridManager.modify(editData, [oldData]);

              case 10:
                typeof onCellChanged == 'function' && onCellChanged(editData, field, newValue, value);
                gridManager.loading = false;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
    }, [node, field, data, onCellEditChange, props.context]);
    var onBlur = (0, _react.useCallback)(function (event) {
      api.stopEditing();
    }, [stopEditing]);
    (0, _react.useImperativeHandle)(ref, function () {
      return {
        refresh: function refresh() {
          return false;
        },
        isCancelBeforeStart: function isCancelBeforeStart() {
          return false;
        },
        getValue: function getValue() {
          var nodeValue = (0, _lodash.get)(node, "data.".concat(field));
          nodeValue = valueGetter ? valueGetter(Object.assign(Object.assign({}, props), {
            node: node,
            data: node.data
          })) : nodeValue;
          var value = initValueFormatter ? initValueFormatter(Object.assign(Object.assign({}, props), {
            node: node,
            data: node.data,
            value: nodeValue
          })) : nodeValue;
          if ((0, _utils.isEqualObj)(value, newValue)) return nodeValue;
          setTimeout(function () {
            handleCellEditChange(newValue);
          }, 1);
          return nodeValue;
        }
      };
    }, [newValue]);
    (0, _react.useEffect)(function () {
      setTimeout(function () {
        inputRef.current && inputRef.current.focus();
      }, 10);
    }, []);
    var wrapperClick = (0, _react.useCallback)(function (event) {
      (0, _utils2.stopPropagationForAgGrid)(event);
    }, []);
    (0, _react.useEffect)(function () {
      var _a;

      (_a = divRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('click', wrapperClick);
      return function () {
        var _a;

        (_a = divRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', wrapperClick);
      };
    }, []);
    var wrapperProps = (0, _react.useMemo)(function () {
      var _ref;

      return _ref = {}, (0, _defineProperty2.default)(_ref, refName, inputRef), (0, _defineProperty2.default)(_ref, valuePropName, newValue), _ref;
    }, [valuePropName, refName, newValue]);
    var onKeyDown = (0, _react.useCallback)(function (event) {
      if (event.key === 'Enter') {
        setTimeout(function () {
          api.stopEditing();
        }, 100);
      }
    }, []);
    return /*#__PURE__*/_react.default.createElement("div", {
      onKeyDown: onKeyDown,
      className: (0, _classnames.default)('gant-grid-cell-editing'),
      ref: divRef
    }, /*#__PURE__*/_react.default.createElement(WrapperComponent, Object.assign({
      autoFocus: true,
      wrapperRef: inputRef
    }, compoentProps, defalutProps, wrapperProps, {
      onChange: onChange,
      size: size,
      onBlur: onBlur,
      node: node
    })));
  });
};

exports.default = _default;