"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackgroundColor = getBackgroundColor;
exports.getColumns = getColumns;
exports.getDateToForm = getDateToForm;
exports.getEdit = getEdit;
exports.getFieldItemSizeClass = getFieldItemSizeClass;
exports.getKey = getKey;
exports.getNewValue = getNewValue;
exports.getOrders = getOrders;
exports.getSchemaRenderCount = getSchemaRenderCount;
exports.getTitle = getTitle;
exports.getUIData = getUIData;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _dataCell = require("data-cell-g");
var _lodash = require("lodash");
var uiArray = [{
  alias: "className",
  belong: ["field", "form"],
  name: ["form:className", "field:className"],
  defaultValue: undefined
}, {
  alias: "style",
  belong: "field",
  name: "field:style",
  defaultValue: undefined
}, {
  alias: "style",
  belong: "form",
  name: "form:style",
  defaultValue: {}
}, {
  alias: "orders",
  belong: "form",
  name: ["ui:orders", "form:orders"],
  defaultValue: []
}, {
  alias: "gutter",
  belong: "form",
  name: ["ui:gutter", "form:gutter"],
  defaultValue: 10
}, {
  alias: "extra",
  belong: "field",
  name: ["ui:extra", "field:extra"],
  defaultValue: undefined
}, {
  alias: "labelAlign",
  belong: "field",
  name: ["ui:labelAlign", "field:labelAlign"],
  defaultValue: undefined
}, {
  alias: "labelCol",
  belong: "field",
  name: ["ui:labelCol", "field:labelCol"],
  defaultValue: undefined
}, {
  alias: "wrapperCol",
  belong: "field",
  name: ["ui:wrapperCol", "field:wrapperCol"],
  defaultValue: undefined
}, {
  alias: "col",
  belong: "field",
  name: ["ui:col", "field:col"],
  defaultValue: 24
}, {
  alias: "padding",
  belong: "form",
  name: "ui:padding",
  defaultValue: 0
}, {
  alias: "backgroundColor",
  belong: "form",
  name: "ui:backgroundColor",
  defaultValue: undefined
}];
function getOrders(orders, targetArray) {
  var _sort = false;
  if (!orders || orders.length <= 0) return targetArray;
  var len = orders.length,
    targetLen = targetArray.length;
  for (var index = 0; index < len; index++) {
    if (orders[index] === "*") _sort = true;
    var targetIndex = targetArray.indexOf(orders[index]);
    if (targetIndex >= 0) {
      if (!_sort) {
        targetArray.splice(targetIndex, 1);
        targetArray.splice(index, 0, orders[index]);
      } else {
        var lastIndex = targetLen - (len - index);
        targetArray.splice(targetIndex, 1);
        targetArray.splice(lastIndex, 0, orders[index]);
      }
    }
  }
  return targetArray;
}
function getUIData(uiSchema, type, pathName) {
  var uiData = {},
    uiSchemaData = pathName ? (0, _lodash.get)(uiSchema, pathName, {}) : uiSchema;
  if (pathName) {
    var arr = pathName.split('.');
    var index = arr.length - 1;
    while (index >= 0) {
      index--;
      uiSchemaData = Object.assign(Object.assign({}, (0, _lodash.get)(uiSchema, arr.slice(0, index + 1).join('.'), {})), uiSchemaData);
    }
  }
  uiSchemaData = Object.assign(Object.assign({}, uiSchema), uiSchemaData);
  uiArray.map(function (item) {
    if (item.belong === type || item.belong.indexOf(type) >= 0) {
      if (typeof item.name === "string") {
        uiData[item.alias] = (0, _lodash.get)(uiSchemaData, item.name, item.defaultValue);
      } else {
        var itemName = "";
        item.name.map(function (keyName) {
          if (uiSchemaData[keyName] || typeof uiSchemaData[keyName] === 'number') {
            itemName = keyName;
          }
        });
        itemName = itemName ? itemName : item.name[0];
        uiData[item.alias] = (0, _lodash.get)(uiSchemaData, itemName, item.defaultValue);
      }
    }
  });
  return uiData;
}
function getEdit(edit, pathName) {
  if ((0, _typeof2.default)(edit) !== "object") return edit;
  var newEdit = pathName ? (0, _lodash.get)(edit, pathName) : edit;
  if (newEdit === undefined && pathName) {
    var arr = pathName.split('.');
    var index = arr.length - 1;
    while (newEdit === undefined && index >= 0) {
      index--;
      newEdit = index >= 0 ? (0, _lodash.get)(edit, arr.slice(0, index + 1)) : edit;
    }
  }
  if ((0, _typeof2.default)(newEdit) === "object") {
    if (newEdit['edit:status'] !== undefined) return newEdit['edit:status'];
  }
  if ((0, _typeof2.default)(newEdit) === "object" || newEdit === undefined) {
    return _dataCell.EditStatus.EDIT;
  }
  return newEdit;
}
function getTitle(title, pathName) {
  var titleArray = [{
    alias: "visible",
    name: 'title:visible',
    defaultValue: true
  }, {
    alias: "id",
    name: "title:id",
    defaultValue: null
  }, {
    alias: "type",
    name: "title:type",
    defaultValue: "line"
  }, {
    alias: "size",
    name: "title:size",
    defaultValue: "large"
  }, {
    alias: "extra",
    name: "title:extra",
    defaultValue: null
  }, {
    alias: "beforeExtra",
    name: "title:beforeExtra",
    defaultValue: null
  }, {
    alias: "icon",
    name: "title:icon",
    defaultValue: "file-text"
  }, {
    alias: "num",
    name: "title:num",
    defaultValue: "1"
  }, {
    alias: "color",
    name: "title:color",
    defaultValue: "default"
  }, {
    alias: "bottomLine",
    name: "title:bottomLine",
    defaultValue: false
  }];
  var titleData = {},
    titleSchemaData = pathName ? (0, _lodash.get)(title, pathName) : title;
  if (titleSchemaData === undefined && pathName) {
    var arr = pathName.split('.');
    var index = arr.length - 1;
    while (titleSchemaData === undefined && index >= 0) {
      index--;
      titleSchemaData = (0, _lodash.get)(title, arr.slice(0, index + 1));
    }
  }
  titleSchemaData = Object.assign(Object.assign({}, title), titleSchemaData);
  titleArray.map(function (item) {
    titleData[item.alias] = (0, _lodash.get)(titleSchemaData, item.name, item.defaultValue);
  });
  return titleData;
}
function getColumns(items, required) {
  var columns = Object.keys(items).map(function (dataIndex) {
    return {
      dataIndex: dataIndex,
      title: items[dataIndex].title
    };
  });
  var schema = {
    type: "object",
    required: required,
    propertyType: Object.assign({}, items)
  };
  return {
    columns: columns,
    schema: schema
  };
}
function getBackgroundColor(backgroundColor, len) {
  if (backgroundColor) return backgroundColor;
  if (len === 0) return "var(--component-background)";
  return "rgba(0,0,0,0.04)";
}
function getNewValue(formVals, data, schema) {
  var newVals = {};
  formVals = formVals ? formVals : {};
  data = data ? data : {};
  Object.keys(formVals).map(function (keyname) {
    if (formVals[keyname] && (0, _typeof2.default)(formVals[keyname]) === 'object' && !Array.isArray(formVals[keyname])) {
      newVals[keyname] = getNewValue(formVals[keyname], data[keyname], schema);
    } else {
      newVals[keyname] = (0, _lodash.get)(data, "".concat(keyname), undefined);
    }
  });
  return Object.assign({}, newVals);
}
function getDateToForm(data, schema) {
  var newVals = {};
  data = data ? data : {};
  schema = schema ? schema : {};
  Object.keys(data).map(function (keyname) {
    if (data[keyname] && (0, _typeof2.default)(data[keyname]) === 'object' && !Array.isArray(data[keyname])) {
      newVals[keyname] = getDateToForm(data[keyname], (0, _lodash.get)(schema, "propertyType", {}));
    } else {
      if ((0, _lodash.get)(schema, "propertyType.".concat(keyname), undefined)) newVals[keyname] = (0, _lodash.get)(data, "".concat(keyname), undefined);
    }
  });
  return newVals;
}
function getKey() {
  return Math.random().toString(32).slice(2);
}
function getFieldItemSizeClass(className) {
  switch (className) {
    case "small":
      return "gant-form-item-sm";
    case "large":
      return "gant-form-item-lg";
    default:
      return "gant-form-item";
  }
}
function getSchemaRenderCount(schema) {
  var index = 0;
  var propertyType = schema.propertyType;
  var keys = Reflect.ownKeys(propertyType);
  return keys.reduce(function (count, key) {
    var subSchema = propertyType[key];
    if (!(0, _lodash.isNil)(subSchema.propertyType)) return count + getSchemaRenderCount(subSchema);
    return count + (subSchema.hide ? 0 : 1);
  }, index);
}