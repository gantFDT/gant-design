"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatSchema;
exports.setFields = exports.formatColumnFields = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _input = _interopRequireDefault(require("../input"));
var _inputNumber = _interopRequireDefault(require("../input-number"));
var _datePicker = _interopRequireDefault(require("../date-picker"));
var _selector = _interopRequireDefault(require("../selector"));
var _inputUrl = _interopRequireDefault(require("../input-url"));
var _locationSelector = _interopRequireDefault(require("../location-selector"));
var _inputTelePhone = _interopRequireDefault(require("../input-tele-phone"));
var _inputCellPhone = _interopRequireDefault(require("../input-cell-phone"));
var _inputEmail = _interopRequireDefault(require("../input-email"));
var _inputLanguage = _interopRequireDefault(require("../input-language"));
var _inputMoney = _interopRequireDefault(require("../input-money"));
var _lodash = require("lodash");
var _interface = require("./interface");
var _util = require("../util");
var _ComponentsMap;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ComponentsMap = (_ComponentsMap = {}, (0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)(_ComponentsMap, _interface.Fields.Input, _input.default), _interface.Fields.InputNumber, _inputNumber.default), _interface.Fields.InputUrl, _inputUrl.default), _interface.Fields.InputTelePhone, _inputTelePhone.default), _interface.Fields.InputCellPhone, _inputCellPhone.default), _interface.Fields.InputEmail, _inputEmail.default), _interface.Fields.InputLanguage, _inputLanguage.default), _interface.Fields.InputMoney, _inputMoney.default), _interface.Fields.TextArea, _input.default.TextArea), _interface.Fields.DatePicker, _datePicker.default), (0, _defineProperty2.default)((0, _defineProperty2.default)(_ComponentsMap, _interface.Fields.Selector, _selector.default), _interface.Fields.LocationSelector, _locationSelector.default));
function formatColumn(schema) {
  var fakeColumn = Object.assign({}, schema);
  if (!schema.render) {
    if (schema.componentType) {
      if ((0, _util.getType)(schema.componentType) !== 'String') {
        fakeColumn.render = function () {
          return schema.componentType;
        };
      } else {
        var Cmp = ComponentsMap[schema.componentType];
        if (Cmp) {
          fakeColumn.render = function (value) {
            return _react.default.createElement(Cmp, Object.assign(Object.assign({}, schema.props), {
              value: value,
              allowEdit: false,
              style: (0, _lodash.merge)((0, _lodash.get)(schema.props, 'style'), {
                display: 'inline-block'
              })
            }));
          };
          fakeColumn.editConfig = Object.assign({
            component: Cmp,
            editable: true
          }, fakeColumn.editConfig);
        } else {
          try {
            fakeColumn.render = function (value) {
              return _react.default.createElement('span', {}, JSON.stringify(value));
            };
          } catch (_a) {
            throw "\u5B57\u6BB5\uFF08".concat(schema.fieldName, "\uFF09\u7684\u503C\u89E3\u6790\u51FA\u9519\u3002");
          }
        }
      }
    }
    delete fakeColumn.componentType;
  }
  if (fakeColumn.children && !(0, _lodash.isEmpty)(fakeColumn.children)) {
    fakeColumn.children = fakeColumn.children.map(function (childColumn) {
      return formatColumn(childColumn);
    });
  }
  return fakeColumn;
}
var setFields = exports.setFields = function setFields(cmpMap) {
  Object.assign(ComponentsMap, cmpMap);
};
var formatColumnFields = exports.formatColumnFields = function formatColumnFields(columnFields, originColumns) {
  var _a, _b;
  // 剔除原始数据中不存在的数据列
  var __filterdFields = [];
  var _iterator = _createForOfIteratorHelper(columnFields),
    _step;
  try {
    var _loop = function _loop() {
      var columnField = _step.value;
      var _columnItem = originColumns.find(function (_column) {
        return _column.fieldName === columnField.fieldName;
      });
      if (_columnItem) {
        __filterdFields.push(Object.assign({}, (0, _lodash.omit)(_columnItem, ['hide', 'width', 'fixed', 'sort', 'sortIndex']),
        // 防止出现配置视图被覆盖的情况
        columnField, {
          hide: (_a = columnField.hide) !== null && _a !== void 0 ? _a : false
        }));
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
    // 添加视图中隐藏的列
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var __hiddenFields = [];
  var _iterator2 = _createForOfIteratorHelper(originColumns),
    _step2;
  try {
    var _loop2 = function _loop2() {
      var _column = _step2.value;
      if (__filterdFields.every(function (__filterdField) {
        return __filterdField.fieldName !== _column.fieldName;
      })) {
        __hiddenFields.push(Object.assign({}, _column, {
          hide: (_b = !_column.dynamic) !== null && _b !== void 0 ? _b : true
        }));
      }
    };
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return [].concat(__filterdFields, __hiddenFields);
};
function formatSchema(schema, originGridKey) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var smartGridViewName = arguments.length > 3 ? arguments[3] : undefined;
  // 简洁模式
  if (Array.isArray(schema)) {
    schema = {
      supportColumnFields: schema,
      systemViews: [{
        viewId: originGridKey ? "system-".concat(originGridKey) : 'system',
        name: smartGridViewName ? smartGridViewName : locale ? locale.fullField : '全字段',
        version: 'default',
        panelConfig: {
          columnFields: schema.map(function (column) {
            return (0, _lodash.pick)(column, ['fieldName', 'hide', 'width', 'fixed', 'sort', 'sortIndex']);
          })
        }
      }]
    };
  }
  var _schema = schema,
    columnFields = _schema.supportColumnFields,
    systemViews = _schema.systemViews;
  // 转换组件类型后的列数据
  var columns = [];
  columnFields.forEach(function (column) {
    if (!column.fieldName || !column.title) {
      throw new Error('SmartGrid的schema格式错误!');
    }
    var columnData = formatColumn(column); // 映射componentType
    columns.push(columnData);
  });
  // 默认的列配置数据
  var columnConfigs = columns.map(function (_column) {
    return Object.assign(Object.assign({}, _column), {
      hide: false
    });
  });
  // 匹配系统视图
  systemViews.forEach(function (view) {
    Object.assign(view.panelConfig, {
      columnFields: formatColumnFields(view.panelConfig.columnFields, columns)
    });
  });
  return {
    columns: columns,
    columnConfigs: columnConfigs,
    systemViews: systemViews
  };
}