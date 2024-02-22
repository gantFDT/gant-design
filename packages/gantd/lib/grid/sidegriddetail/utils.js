"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transColumnsToObj = exports.getValueRender = exports.getValueGetter = exports.getTransData = exports.getOriginData = exports.getInitValueFormatter = exports.getEditable = exports.getDiffProps = exports.getColDef = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _lodash = require("lodash");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
//通过grid行转列, 即数据
var getTransData = exports.getTransData = function getTransData(columns, data) {
  var res = [];
  var setPropertyType = function setPropertyType(currentColumn) {
    if (!currentColumn || !(0, _lodash.get)(currentColumn, 'fieldName')) {
      return;
    }
    if ((0, _lodash.isArray)(currentColumn.children)) {
      currentColumn.children.forEach(function (c) {
        setPropertyType(c);
      });
      return;
    }
    var fieldName = currentColumn.fieldName,
      title = currentColumn.title,
      props = currentColumn.props,
      componentType = currentColumn.componentType;
    res.push({
      fieldName: fieldName,
      label: title,
      value: (0, _lodash.get)(data, fieldName)
    });
  };
  columns.forEach(function (column) {
    setPropertyType(column);
  });
  return res;
};
//把column转成平行对象
var transColumnsToObj = exports.transColumnsToObj = function transColumnsToObj(columns) {
  var res = {};
  var setPropertyType = function setPropertyType(currentColumn) {
    if (!currentColumn || !(0, _lodash.get)(currentColumn, 'fieldName')) {
      return;
    }
    if ((0, _lodash.isArray)(currentColumn.children)) {
      currentColumn.children.forEach(function (c) {
        setPropertyType(c);
      });
      return;
    }
    var fieldName = currentColumn.fieldName;
    (0, _lodash.set)(res, "".concat(fieldName), currentColumn);
    res[fieldName] = currentColumn;
  };
  columns.forEach(function (column) {
    setPropertyType(column);
  });
  return res;
};
//广度优先查找columnDef
var getColDef = exports.getColDef = function getColDef(columnDefs, fieldName) {
  var res = {};
  var q = columnDefs;
  while (q.length) {
    var n = q.shift();
    if (n.field === fieldName) {
      res = n;
      q.length = 0;
      break;
    }
    n.children && n.children.forEach(function (item) {
      q.push(item);
    });
  }
  return res;
};
//获取值的valueGetter
var getValueGetter = exports.getValueGetter = function getValueGetter(params) {
  var fieldName = params.fieldName,
    columnField = params.columnField,
    clickedEvent = params.clickedEvent,
    cellValue = params.cellValue;
  var valueGetter = columnField.valueGetter,
    valueFormatter = columnField.valueFormatter,
    render = columnField.render;
  var columnApi = clickedEvent.columnApi,
    _data = clickedEvent.data,
    api = clickedEvent.api,
    context = clickedEvent.context,
    node = clickedEvent.node,
    rowIndex = clickedEvent.rowIndex;
  var displayedColumnsAndGroupsMap = columnApi.columnModel.displayedColumnsAndGroupsMap;
  var colDef = columnField;
  var column = (0, _lodash.get)(displayedColumnsAndGroupsMap, fieldName);
  var temp = (0, _lodash.cloneDeep)(_data);
  var data = (0, _lodash.set)(temp, fieldName, cellValue);
  var getValue = function getValue(field) {
    return (0, _lodash.get)(data, field);
  };
  var value = cellValue;
  var res = value;
  if (valueGetter) {
    res = valueGetter({
      api: api,
      colDef: colDef,
      column: column,
      columnApi: columnApi,
      context: context,
      data: data,
      getValue: getValue,
      node: node
    });
  }
  return res;
};
var getInitValueFormatter = exports.getInitValueFormatter = function getInitValueFormatter(params) {
  var fieldName = params.fieldName,
    columnField = params.columnField,
    clickedEvent = params.clickedEvent,
    cellValue = params.cellValue;
  var initValueFormatter = (0, _lodash.get)(columnField, 'editConfig.initValueFormatter');
  var columnApi = clickedEvent.columnApi,
    _data = clickedEvent.data,
    api = clickedEvent.api,
    context = clickedEvent.context,
    node = clickedEvent.node,
    rowIndex = clickedEvent.rowIndex;
  var displayedColumnsAndGroupsMap = columnApi.columnModel.displayedColumnsAndGroupsMap;
  var colDef = columnField;
  var column = (0, _lodash.get)(displayedColumnsAndGroupsMap, fieldName);
  var temp = (0, _lodash.cloneDeep)(_data);
  var data = (0, _lodash.set)(temp, fieldName, cellValue);
  var value = cellValue;
  var res = value;
  if (initValueFormatter) {
    res = initValueFormatter({
      api: api,
      colDef: colDef,
      column: column,
      columnApi: columnApi,
      context: context,
      data: data,
      node: node
    });
  }
  return res;
};
//获取值的渲染
var getValueRender = exports.getValueRender = function getValueRender(params) {
  var fieldName = params.fieldName,
    columnField = params.columnField,
    clickedEvent = params.clickedEvent,
    cellValue = params.cellValue;
  var valueGetter = columnField.valueGetter,
    valueFormatter = columnField.valueFormatter,
    render = columnField.render;
  var columnApi = clickedEvent.columnApi,
    _data = clickedEvent.data,
    api = clickedEvent.api,
    context = clickedEvent.context,
    node = clickedEvent.node,
    rowIndex = clickedEvent.rowIndex;
  var displayedColumnsAndGroupsMap = columnApi.columnModel.displayedColumnsAndGroupsMap;
  var colDef = columnField;
  var column = (0, _lodash.get)(displayedColumnsAndGroupsMap, fieldName);
  var temp = (0, _lodash.cloneDeep)(_data);
  var data = (0, _lodash.set)(temp, fieldName, cellValue);
  var getValue = function getValue(field) {
    return (0, _lodash.get)(data, field);
  };
  var value = cellValue;
  var res = value;
  if (valueFormatter) {
    res = valueFormatter({
      api: api,
      colDef: colDef,
      column: column,
      columnApi: columnApi,
      context: context,
      data: data,
      getValue: getValue,
      node: node,
      value: value
    });
  }
  if (render) {
    res = render(value, data, rowIndex, clickedEvent);
  }
  return res;
};
//计算某行是否可以编辑
var getEditable = exports.getEditable = function getEditable(params) {
  var columnField = params.columnField,
    clickedEvent = params.clickedEvent;
  var data = clickedEvent.data;
  var _columnField$editConf = columnField.editConfig,
    editConfig = _columnField$editConf === void 0 ? {} : _columnField$editConf;
  var editable = editConfig.editable;
  if (typeof editable === 'boolean') {
    return editable;
  }
  if (typeof editable === 'function') {
    return editable(data, clickedEvent);
  }
  return false;
};
//计算对象的diff属性,若差异为对象，则key用.连接符
var getDiffProps = exports.getDiffProps = function getDiffProps(srcObj, targetObj) {
  var res = {};
  var getDiff = function getDiff(srcChild, targetChild) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    if (!srcChild || !targetChild) {
      return null;
    }
    for (var key in srcChild) {
      var srcItem = srcChild[key];
      var targetItem = targetChild[key];
      if (srcItem !== targetItem) {
        var p = path;
        if (!p) {
          p = key;
        } else {
          p = p + '.' + key;
        }
        if ((0, _typeof2.default)(srcItem) === 'object') {
          getDiff(srcItem, targetItem, p);
        } else {
          res[p] = targetItem;
        }
      }
    }
  };
  getDiff(srcObj, targetObj);
  return res;
};
//获取原数据
var getOriginData = exports.getOriginData = function getOriginData(data) {
  var _rowData = data._rowData,
    _rowType = data._rowType,
    _rowError = data._rowError,
    targetData = __rest(data, ["_rowData", "_rowType", "_rowError"]);
  var originData = _rowData;
  if (!originData) {
    originData = targetData;
  }
  return originData;
};