"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatSchema;
exports.setFields = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _dataCell = require("data-cell-g");
var _lodash = require("lodash");
var _interface = require("./interface");
var _util = require("util-g");
var _ComponentsMap;
var DEFAULT_VIEW = {
  wrap: true,
  isZebra: true,
  bordered: true,
  clickable: true,
  footerDirection: 'row',
  heightMode: 'full',
  pageSize: 50,
  columnFields: []
};
var ComponentsMap = (_ComponentsMap = {}, (0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)(_ComponentsMap, _interface.Fields.Input, _dataCell.Input), _interface.Fields.InputNumber, _dataCell.InputNumber), _interface.Fields.InputUrl, _dataCell.InputUrl), _interface.Fields.InputTelePhone, _dataCell.InputTelePhone), _interface.Fields.InputCellPhone, _dataCell.InputCellPhone), _interface.Fields.InputEmail, _dataCell.InputEmail), _interface.Fields.InputLanguage, _dataCell.InputLanguage), _interface.Fields.InputMoney, _dataCell.InputMoney), _interface.Fields.TextArea, _dataCell.Input.TextArea), _interface.Fields.DatePicker, _dataCell.DatePicker), (0, _defineProperty2.default)((0, _defineProperty2.default)(_ComponentsMap, _interface.Fields.Selector, _dataCell.Selector), _interface.Fields.LocationSelector, _dataCell.LocationSelector));
function formatColumn(schema) {
  var fakeColumn = Object.assign({
    dataIndex: schema.fieldName
  }, schema);
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
          fakeColumn.editConfig = {
            render: function render() {
              return _react.default.createElement(Cmp, schema.props);
            }
          };
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
  }
  if (fakeColumn.children && !(0, _lodash.isEmpty)(fakeColumn.children)) {
    fakeColumn.children = fakeColumn.children.map(function (childColumn) {
      return formatColumn(childColumn);
    });
  }
  return fakeColumn;
}
var setFields = exports.setFields = function setFields(cmpMap) {
  ComponentsMap = Object.assign(Object.assign({}, ComponentsMap), cmpMap);
};
function formatSchema(schema) {
  // 简洁模式
  if (Array.isArray(schema)) {
    schema = {
      supportColumnFields: schema,
      systemViews: [{
        viewId: 'systemView',
        name: '全字段',
        version: 'default',
        panelConfig: {
          columnFields: schema.map(function (column) {
            return {
              fieldName: column.fieldName,
              width: column.width,
              align: column.align,
              fixed: column.fixed
            };
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
  var columnMaps = {};
  columnFields.forEach(function (column) {
    if (!column.fieldName || !column.title) {
      throw new Error('SmartTable的schema格式错误，参照：https://gant.yuque.com/fdt/gantreact/hyeday');
    }
    if (column.width || column.align || column.fixed) {
      console.warn('SmartTable的schema在简洁模式下，不能包含UI属性，参照：https://gant.yuque.com/fdt/gantreact/hyeday');
    }
    var columnData = formatColumn(column);
    columns.push(columnData);
    columnMaps[column.fieldName] = columnData;
  });
  // 默认的列配置数据
  var columnConfigs = columns.map(function (C) {
    return Object.assign(Object.assign({}, C), {
      checked: true,
      align: 'left',
      lock: false
    });
  });
  // 匹配系统视图
  systemViews.forEach(function (view) {
    var configs = (0, _lodash.cloneDeep)(columns);
    var columnConfigs = view.panelConfig.columnFields;
    for (var idx = 0; idx < columnConfigs.length; idx++) {
      var columnConfig = columnConfigs[idx];
      columnConfigs[idx] = Object.assign(Object.assign(Object.assign({}, columnMaps[columnConfig.fieldName]), columnConfig), {
        checked: true,
        align: columnConfig.align || 'left',
        lock: !!columnConfig.fixed || false
      });
    }
    // 隐藏列
    var hiddenColumns = configs.filter(function (C) {
      return columnConfigs.every(function (CC) {
        return CC.fieldName !== C.fieldName;
      });
    }).map(function (C) {
      return Object.assign(Object.assign({}, C), {
        checked: false,
        align: 'left',
        lock: false
      });
    });
    columnConfigs = [].concat((0, _toConsumableArray2.default)(columnConfigs), (0, _toConsumableArray2.default)(hiddenColumns));
    view.panelConfig = Object.assign(Object.assign(Object.assign({}, DEFAULT_VIEW), view.panelConfig), {
      columnFields: columnConfigs
    });
  });
  return {
    columns: columns,
    columnConfigs: columnConfigs,
    systemViews: systemViews
  };
}