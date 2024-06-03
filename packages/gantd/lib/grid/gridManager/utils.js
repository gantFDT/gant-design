"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canQuickCreate = canQuickCreate;
exports.getAllChildrenNode = getAllChildrenNode;
exports.getAllCoumns = getAllCoumns;
exports.getModifyData = getModifyData;
exports.getRowsToUpdate = getRowsToUpdate;
exports.isEqualObj = exports.isEmptyObj = void 0;
exports.isSelectionParentOfTarget = isSelectionParentOfTarget;
exports.onSetcutData = onSetcutData;
exports.removeTagData = removeTagData;
exports.replaceRowData = replaceRowData;
exports.sortAndMergeColumns = sortAndMergeColumns;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _lodash = require("lodash");
var _interface = require("../interface");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getModifyData(records, getRowItemData, oldRecords, getRowNodeId) {
  var hisRecords = [],
    newRecords = [];
  records.map(function (item, index) {
    var oldIndex = (0, _lodash.findIndex)(oldRecords, function (oldItem) {
      return getRowNodeId(oldItem) === getRowNodeId(item);
    });
    var rowNode = getRowItemData(item, (0, _lodash.get)(oldRecords, "[".concat(oldIndex, "]"), undefined));
    if (!rowNode || isEqualObj(rowNode.data, item)) return;
    var data = rowNode.data;
    var _rowData = data._rowData,
      _data$_rowType = data._rowType,
      _rowType = _data$_rowType === void 0 ? null : _data$_rowType,
      oldData = __rest(data, ["_rowData", "_rowType"]);
    var nextRowData = item._rowData,
      nextRowType = item._rowType,
      newData = __rest(item, ["_rowData", "_rowType"]);
    if (nextRowType === _interface.DataActions.remove || nextRowType === _interface.DataActions.removeTag) return console.warn('Cannot modify deleted data');
    _rowData = (0, _lodash.isEmpty)(_rowData) ? oldData : _rowData;
    var hasChange = !isEqualObj(_rowData, newData);
    _rowType = !_rowType || _rowType === _interface.DataActions.modify ? hasChange ? _interface.DataActions.modify : null : _rowType;
    var recordItem = Object.assign(Object.assign({}, newData), {
      _rowData: _rowData,
      _rowType: _rowType
    });
    var hisRecordItem = data;
    newRecords.push(recordItem);
    hisRecords.push(hisRecordItem);
  });
  return {
    newRecords: newRecords,
    hisRecords: hisRecords
  };
}
function removeTagData(removeNodes, rowData, getRowNodeId) {
  var hisRecords = [],
    newRecords = [],
    removeRecords = [],
    removeIndexs = [];
  removeNodes.map(function (itemNode) {
    var itemData = (0, _lodash.get)(itemNode, 'data', {});
    var recordItem = Object.assign(Object.assign({}, itemData), {
      _rowType: _interface.DataActions.removeTag,
      _rowData: itemData
    });
    if (itemData._rowType === _interface.DataActions.removeTag || itemData._rowType === _interface.DataActions.remove) return console.warn('Deleted data cannot be deleted');
    var hisRecordItem = Object.assign({}, itemData);
    itemData._rowType !== _interface.DataActions.add ? newRecords.push(recordItem) : removeRecords.push(itemData);
    var rowIndex = (0, _lodash.findIndex)(rowData, function (rowItemData) {
      return getRowNodeId(rowItemData) === getRowNodeId(itemData);
    });
    removeIndexs.unshift(rowIndex);
    hisRecords.unshift(hisRecordItem);
  });
  return {
    newRecords: newRecords,
    hisRecords: hisRecords,
    removeIndexs: removeIndexs,
    removeRecords: removeRecords
  };
}
var isEmptyObj = exports.isEmptyObj = function isEmptyObj(value) {
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return false;
  if ((0, _typeof2.default)(value) === 'object') return (0, _lodash.isEmpty)(value);
  return !value;
};
var isEqualObj = exports.isEqualObj = function isEqualObj(obj, obj2) {
  var _EqualObj = true;
  if (!(0, _lodash.isPlainObject)(obj) || !(0, _lodash.isPlainObject)(obj2)) {
    if (isEmptyObj(obj) && isEmptyObj(obj2)) return true;
    return (0, _lodash.isEqual)(obj, obj2);
  }
  if ((0, _lodash.isNull)(obj) && (0, _lodash.isNull)(obj2)) return true;
  if ((0, _lodash.isNull)(obj) || (0, _lodash.isNull)(obj2)) {
    return false;
  }
  var newObj = Object.assign(Object.assign({}, obj), obj2);
  for (var i in newObj) {
    var value1 = (0, _lodash.get)(obj, i),
      value2 = (0, _lodash.get)(obj2, i);
    if ((0, _typeof2.default)(value1) === 'object' && (0, _typeof2.default)(value2) === 'object' && !Array.isArray(value1) && !Array.isArray(value2)) {
      _EqualObj = isEqualObj(value1, value2);
    } else {
      if (!(isEmptyObj(value1) && isEmptyObj(value2))) {
        value2 = typeof value2 !== 'number' ? value2 : value2 + '';
        value1 = typeof value1 !== 'number' ? value1 : value1 + '';
        if (typeof value1 === 'boolean' || typeof value2 === 'boolean') {
          value1 = !!value1;
          value2 = !!value2;
        }
        _EqualObj = (0, _lodash.isEqual)(value2, value1);
      }
    }
    if (!_EqualObj) {
      return _EqualObj;
    }
  }
  return true;
};
function canQuickCreate(config) {
  if ((0, _lodash.isEmpty)(config)) return false;
  var arr = ['id', 'path', 'toPath'];
  try {
    for (var index = 0; index < arr.length; index++) {
      if (!Reflect.has(config, arr[index])) return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
  var children = selectedNode.childrenAfterGroup;
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}
function getRowsToUpdate(nodes, parentPath, createConfig, agGridConfig) {
  var res = [];
  var oldRowData = [];
  var path = createConfig.path,
    toPath = createConfig.toPath,
    id = createConfig.id;
  nodes.map(function (node) {
    var itemData = (0, _lodash.cloneDeep)(node.data);
    var newPath = [];
    if (node.data) {
      itemData[path] = toPath(parentPath, itemData);
      newPath = agGridConfig.getDataPath(itemData);
      var _rowCut = itemData._rowCut,
        data = __rest(itemData, ["_rowCut"]);
      res = res.concat([data]);
      oldRowData = oldRowData.concat([node.data]);
    }
    if (node.childrenAfterGroup) {
      var _getRowsToUpdate = getRowsToUpdate(node.childrenAfterGroup, newPath, createConfig, agGridConfig),
        childrenNewRowData = _getRowsToUpdate.newRowData,
        childrenOldRowData = _getRowsToUpdate.oldRowData;
      res = res.concat(childrenNewRowData);
      oldRowData = oldRowData.concat(childrenOldRowData);
    }
  });
  return {
    newRowData: res,
    oldRowData: oldRowData
  };
}
// 标记剪切
function onSetcutData(rowsNodes, clear) {
  var update = [];
  rowsNodes.map(function (item) {
    var childrenAfterGroup = item.childrenAfterGroup;
    var data = (0, _lodash.cloneDeep)(item.data);
    data = Object.assign(Object.assign({}, data), {
      _rowCut: !clear
    });
    if (item.data) update.push(data);
    item.setSelected(false);
    if (childrenAfterGroup) {
      var childrenData = onSetcutData(childrenAfterGroup, clear);
      update.push.apply(update, (0, _toConsumableArray2.default)(childrenData));
    }
  });
  return update;
}
function getAllChildrenNode(targetKeys, api) {
  var deleteChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var targetNodes = [];
  targetKeys.map(function (key) {
    var itemNode = api.getRowNode(key);
    itemNode && targetNodes.push(itemNode);
  });
  if (deleteChildren) return targetNodes;
  var allNodes = [];
  var groupNodes = (0, _lodash.groupBy)(targetNodes, 'level');
  var level = (0, _lodash.min)(Object.keys(groupNodes).map(function (level) {
    return level;
  }));
  var _loop = function _loop() {
    var list = groupNodes[level];
    var nextLevel = parseInt(level) + 1;
    nextLevel = nextLevel.toString();
    groupNodes[nextLevel] = groupNodes[nextLevel] ? groupNodes[nextLevel] : [];
    list.map(function (itemNode) {
      var _groupNodes$nextLevel;
      var _itemNode$childrenAft = itemNode.childrenAfterGroup,
        childrenAfterGroup = _itemNode$childrenAft === void 0 ? [] : _itemNode$childrenAft;
      (_groupNodes$nextLevel = groupNodes[nextLevel]).push.apply(_groupNodes$nextLevel, (0, _toConsumableArray2.default)(childrenAfterGroup));
      return itemNode.data;
    });
    groupNodes[nextLevel] = (0, _lodash.uniqBy)(groupNodes[nextLevel], 'id');
    allNodes.push.apply(allNodes, (0, _toConsumableArray2.default)(list));
    level = nextLevel;
  };
  while (!(0, _lodash.isEmpty)(groupNodes[level])) {
    _loop();
  }
  return allNodes;
}
function findColumnIndex(itemCol, localColumns) {
  var itemIndex = (0, _lodash.findIndex)(localColumns, function (localItemCol) {
    return (0, _lodash.get)(localItemCol, 'colId') === (0, _lodash.get)(itemCol, 'colId') || (0, _lodash.get)(localItemCol, 'colId') === (0, _lodash.get)(itemCol, 'field');
  });
  return itemIndex;
}
function getColumnItem(itemCol) {
  if (Array.isArray(itemCol.children) && itemCol.children.length >= 0) return getColumnItem((0, _lodash.get)(itemCol, 'children[0]', itemCol));
  return itemCol;
}
function sortAndMergeColumns(columns, localColumns) {
  return columns.map(function (itemCol) {
    var itemIndex = findColumnIndex(itemCol, localColumns);
    if (itemCol.children) itemCol.children = sortAndMergeColumns((0, _lodash.get)(itemCol, 'children', []), localColumns);
    if (itemIndex > -1) return Object.assign(Object.assign(Object.assign({}, itemCol), (0, _lodash.get)(localColumns, "[".concat(itemIndex, "]"))), {
      pivotIndex: itemIndex,
      sortIndex: itemIndex
    });
    return itemCol;
  }).sort(function (aitem, bitem) {
    var aIndex = findColumnIndex(getColumnItem(aitem), localColumns);
    var bIndex = findColumnIndex(getColumnItem(bitem), localColumns);
    return aIndex - bIndex;
  });
}
function getAllCoumns(columns, parendId) {
  var _columns = [];
  columns.map(function (item) {
    _columns.push(item);
    if (Array.isArray(item.children)) return _columns.push.apply(_columns, (0, _toConsumableArray2.default)(getAllCoumns(item.children, item.field)));
  });
  return _columns;
}
function replaceRowData(_ref) {
  var rowData = _ref.rowData,
    targetData = _ref.targetData,
    newData = _ref.newData,
    getRowNodeId = _ref.getRowNodeId,
    up = _ref.up;
  var targetIndex = (0, _lodash.findIndex)(rowData, function (itemData) {
    return getRowNodeId(targetData) === getRowNodeId(itemData);
  });
  var newDataSource = up ? [].concat((0, _toConsumableArray2.default)(rowData.slice(0, targetIndex)), (0, _toConsumableArray2.default)(newData), (0, _toConsumableArray2.default)(rowData.slice(targetIndex))) : [].concat((0, _toConsumableArray2.default)(rowData.slice(0, targetIndex)), [rowData[targetIndex]], (0, _toConsumableArray2.default)(newData), (0, _toConsumableArray2.default)(rowData.slice(targetIndex + 1)));
  return newDataSource;
}