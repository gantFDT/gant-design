"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AG_GRID_STOP_PROPAGATION = void 0;
exports.checkParentGroupSelectedStatus = checkParentGroupSelectedStatus;
exports.flattenTreeData = flattenTreeData;
exports.getColumnInfo = getColumnInfo;
exports.groupNodeSelectedToggle = groupNodeSelectedToggle;
exports.isExportHiddenFields = isExportHiddenFields;
exports.isPagitation = isPagitation;
exports.isarray = isarray;
exports.isbool = isbool;
exports.isfunc = isfunc;
exports.isnumber = isnumber;
exports.ispromise = ispromise;
exports.isstring = isstring;
exports.sizeNumber = exports.sizeDefinitions = exports.selectedMapColumns = exports.mapColumns = void 0;
exports.stopPropagationForAgGrid = stopPropagationForAgGrid;
exports.toFormMap = void 0;
exports.usePagination = usePagination;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _GridEidtColumn = _interopRequireDefault(require("./GridEidtColumn"));

var _utils = require("./gridManager/utils");

var _interface = require("./interface");

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

//大小
var sizeNumber = {
  small: 24,
  default: 32,
  large: 40
}; //大小配置

exports.sizeNumber = sizeNumber;
var sizeDefinitions = {
  fontSize: {
    small: 12,
    default: 12,
    large: 14
  },
  rowHeight: {
    small: sizeNumber.small,
    default: sizeNumber.default,
    large: sizeNumber.large
  },
  headerHeight: {
    small: sizeNumber.small,
    default: sizeNumber.default,
    large: sizeNumber.large
  },
  floatingFiltersHeight: {
    small: sizeNumber.small,
    default: sizeNumber.default,
    large: sizeNumber.large
  },
  paginationHeight: {
    small: 30,
    default: 40,
    large: 50
  }
};
exports.sizeDefinitions = sizeDefinitions;

function itemisgroup(item, children) {
  return !!children;
}

function ColEditableFn(fn) {
  return function (params) {
    var data = params.data,
        globalEditable = params.context.globalEditable;
    if (typeof fn === 'function') return globalEditable ? fn(data, params) : false;
    return globalEditable ? fn : false;
  };
}

var defaultCheckboxColSelectionCol = {
  width: 24,
  checkboxSelection: true,
  resizable: false,
  sortable: false,
  pinned: true,
  field: 'defalutSelection',
  minWidth: 24,
  headerName: '',
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  filter: false,
  cellStyle: {
    display: 'flex',
    justifyContent: 'center'
  },
  showDisabledCheckboxes: true,
  suppressColumnsToolPanel: true,
  cellClass: 'gant-grid-default-checkbox-cell',
  headerClass: 'gant-grid-default-checkbox'
};
var serialNumberCol = {
  width: 55,
  sortable: false,
  pinned: true,
  minWidth: 55,
  headerName: '',
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  field: 'g-index',
  filter: false,
  suppressColumnsToolPanel: true,
  resizable: true,
  cellClassRules: {
    'gant-grid-cell-serial-add': function gantGridCellSerialAdd(params) {
      var _params$node = params.node,
          rowIndex = _params$node.rowIndex,
          data = _params$node.data,
          context = params.context;
      return (0, _lodash.get)(params, 'data._rowType') === _interface.DataActions.add;
    },
    'gant-cell-disable-sign': function gantCellDisableSign(params) {
      return true;
    }
  },
  valueGetter: function valueGetter(params) {
    var _params$node2 = params.node,
        rowIndex = _params$node2.rowIndex,
        data = _params$node2.data,
        rowPinned = _params$node2.rowPinned,
        context = params.context;
    if (rowPinned) return;
    var computedPagination = (0, _lodash.get)(context, 'computedPagination', {});
    var _computedPagination$d = computedPagination.defaultPageSize,
        defaultPageSize = _computedPagination$d === void 0 ? 20 : _computedPagination$d,
        _computedPagination$p = computedPagination.pageSize,
        pageSize = _computedPagination$p === void 0 ? defaultPageSize : _computedPagination$p,
        _computedPagination$b = computedPagination.beginIndex,
        beginIndex = _computedPagination$b === void 0 ? 0 : _computedPagination$b;
    var serial = rowIndex + 1 + beginIndex;
    return serial;
  }
};

var selectedMapColumns = function selectedMapColumns(columns) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  function getColumnItem(columnItem) {
    if ((0, _lodash.isEmpty)(columnItem)) return null;
    var field = columnItem.fieldName,
        children = columnItem.children;
    if ((0, _lodash.isEmpty)(children)) return field;
    return getColumnItem(children === null || children === void 0 ? void 0 : children[0]);
  }

  if (!columns || columns.length <= 0) return [];
  var colArray = [];

  if (typeof index !== 'number') {
    colArray = typeof index === 'string' ? [index] : index;
  } else {
    var columnItem = (0, _lodash.get)(columns, "[".concat(index, "]"), columns[0]);
    var field = getColumnItem(columnItem);
    colArray = field ? [field] : [];
  }

  var selectedCol = [];
  columns.map(function (colItem) {
    var field = colItem.fieldName,
        headerName = colItem.title,
        valueGetter = colItem.valueGetter,
        valueFormatter = colItem.valueFormatter;
    if (colArray.indexOf(field) >= 0) selectedCol.push({
      field: field,
      headerName: headerName,
      valueGetter: valueGetter,
      valueFormatter: valueFormatter,
      flex: 1
    });
  });
  return [Object.assign(Object.assign({}, defaultCheckboxColSelectionCol), {
    headerCheckboxSelection: 'multiple'
  })].concat(selectedCol);
};

exports.selectedMapColumns = selectedMapColumns;

var toFormMap = function toFormMap(columns, params) {
  var customFields = [];
  var valueMap = {};
  var schema = {
    type: 'object',
    propertyType: {}
  };
  var translationName = [];
  if (!Array.isArray(columns)) return {
    customFields: customFields,
    schema: schema,
    valueMap: valueMap
  };
  columns.map(function (_ref) {
    var fieldName = _ref.fieldName,
        title = _ref.title,
        type = _ref.type,
        _ref$editConfig = _ref.editConfig,
        editConfig = _ref$editConfig === void 0 ? {} : _ref$editConfig,
        valueGetter = _ref.valueGetter,
        valueFormatter = _ref.valueFormatter;
    var itemName = fieldName.replace(/\./g, '_');
    if (fieldName.indexOf('.') >= 0) translationName.push(itemName);

    if (valueGetter || valueFormatter) {
      valueMap[itemName] = function (itemName, params) {
        var initialValue = valueGetter ? typeof valueGetter === 'string' ? valueGetter : valueGetter(params) : (0, _lodash.get)(params, "data.".concat(itemName));
        initialValue = valueFormatter ? valueFormatter(Object.assign(Object.assign({}, params), {
          value: initialValue
        })) : initialValue;
        return initialValue;
      };
    }

    if ((0, _lodash.isEmpty)(editConfig)) {
      return (0, _lodash.set)(schema, "propertyType.".concat(itemName), {
        title: title,
        props: {
          allowEdit: false
        }
      });
    }

    var props = editConfig.props,
        changeFormatter = editConfig.changeFormatter,
        initValueFormatter = editConfig.initValueFormatter,
        valuePropName = editConfig.valuePropName,
        rules = editConfig.rules,
        component = editConfig.component,
        editable = editConfig.editable;
    customFields.push({
      type: itemName,
      component: component
    });
    var itemProps = props;
    if (typeof props === 'function') itemProps = props(params, params.rowIndex);

    if (valueGetter || valueFormatter || initValueFormatter) {
      valueMap[itemName] = function (itemName, params) {
        var initialValue = valueGetter ? typeof valueGetter === 'string' ? valueGetter : valueGetter(params) : (0, _lodash.get)(params, "data.".concat(itemName));
        initialValue = valueFormatter ? valueFormatter(Object.assign(Object.assign({}, params), {
          value: initialValue
        })) : initialValue;
        initialValue = initValueFormatter ? initValueFormatter(Object.assign(Object.assign({}, params), {
          value: initialValue
        })) : initialValue;
        return initialValue;
      };
    }

    (0, _lodash.set)(schema, "propertyType.".concat(itemName), {
      title: title,
      props: Object.assign(Object.assign({}, itemProps), {
        allowEdit: ColEditableFn(editable)(params)
      }),
      options: {
        rules: rules ? Array.isArray(rules) ? rules : [rules] : undefined,
        getValueFromEvent: changeFormatter,
        valuePropName: valuePropName ? valuePropName : 'value'
      },
      componentType: itemName
    });
  });
  return {
    customFields: customFields,
    schema: schema,
    valueMap: valueMap,
    translationName: translationName
  };
};

exports.toFormMap = toFormMap;

var mapColumns = function mapColumns(columns, getRowNodeId, defaultSelection, defaultSelectionCol, rowSelection, serialNumber, size) {
  if ((0, _lodash.isEmpty)(columns)) return {
    columnDefs: [],
    validateFields: {},
    requireds: []
  }; // 移除所有已添加事件

  function getColumnDefs(columns, hide) {
    var validateFields = {};
    var requireds = [];
    var columnDefs = columns === null || columns === void 0 ? void 0 : columns.map(function (_a, index) {
      var headerName = _a.title,
          field = _a.fieldName,
          children = _a.children,
          render = _a.render,
          editConfig = _a.editConfig,
          fixed = _a.fixed,
          headerClass = _a.headerClass,
          cellClassRules = _a.cellClassRules,
          cellClass = _a.cellClass,
          cellRendererParams = _a.cellRendererParams,
          item = __rest(_a, ["title", "fieldName", "children", "render", "editConfig", "fixed", "headerClass", "cellClassRules", "cellClass", "cellRendererParams"]);

      var ColEditable = typeof editConfig !== 'undefined';
      var colDef = Object.assign(Object.assign({
        headerName: headerName,
        field: field,
        cellRendererParams: Object.assign({
          render: render
        }, cellRendererParams),
        headerTooltip: headerName,
        cellClass: cellClass,
        cellClassRules: Object.assign({
          'gant-grid-cell': function gantGridCell() {
            return true;
          },
          'gant-grid-cell-modify': function gantGridCellModify(params) {
            var _a = params.data,
                _b = _a === void 0 ? {} : _a,
                _rowType = _b._rowType,
                itemData = __rest(_b, ["_rowType"]),
                field = params.colDef.field;

            var value = (0, _lodash.get)(itemData, field);

            var _rowData = (0, _lodash.get)(itemData, "_rowData", itemData);

            var originValue = (0, _lodash.get)(_rowData, field);
            return _rowType === _interface.DataActions.modify && !(0, _utils.isEqualObj)(value, originValue);
          },
          'gant-grid-cell-edit': function gantGridCellEdit(params) {
            var globalEditable = params.context.globalEditable,
                data = params.data;
            var editable = (0, _lodash.get)(editConfig, 'editable', false);
            if (typeof editable == 'boolean') return editable;
            return editable(data, params);
          }
        }, cellClassRules),
        cellRenderer: render ? 'gantRenderCol' : undefined,
        headerClass: headerClass
      }, item), {
        hide: (0, _lodash.has)(item, 'hide') ? item.hide : hide
      });

      if (!itemisgroup(colDef, children)) {
        // 当前列允许编辑
        if (ColEditable) {
          var props = editConfig.props,
              changeFormatter = editConfig.changeFormatter,
              component = editConfig.component,
              rules = editConfig.rules,
              _editConfig$signable = editConfig.signable,
              signable = _editConfig$signable === void 0 ? true : _editConfig$signable,
              params = __rest(editConfig, ["props", "changeFormatter", "component", "rules", "signable"]);

          var required = false;
          var validateField = field.replace(/\./g, '-');

          if (Array.isArray(rules)) {
            var fieldsRules = rules.map(function (item) {
              var hasRequired = Reflect.has(item, 'required');
              required = hasRequired ? Reflect.get(item, 'required') : required;
              return Object.assign({}, item);
            });
            validateFields[validateField] = fieldsRules;
          } else {
            if (!(0, _lodash.isEmpty)(rules)) {
              validateFields[validateField] = Object.assign({}, rules);
              required = (0, _lodash.get)(rules, 'required', false);
            }
          }

          required = !signable ? true : required;

          if (required) {
            requireds.push(field);
          }

          colDef.cellEditorParams = Object.assign({
            props: props,
            changeFormatter: changeFormatter,
            rowkey: getRowNodeId,
            required: required,
            valueGetter: item.valueGetter
          }, params);
          var _suppressKeyboardEvent = colDef.suppressKeyboardEvent;

          colDef.suppressKeyboardEvent = function (params) {
            if (params.event.keyCode == 13 && params.editing) return true;
            return _suppressKeyboardEvent === null || _suppressKeyboardEvent === void 0 ? void 0 : _suppressKeyboardEvent(params);
          };

          colDef.cellEditor = (0, _GridEidtColumn.default)(component);
          colDef.editable = ColEditableFn(editConfig.editable);

          switch ((0, _typeof2.default)(headerClass)) {
            case 'string':
              colDef.headerClass = (0, _classnames.default)(headerClass, required ? 'gant-header-cell-required' : 'gant-header-cell-edit');
              break;

            case 'object':
              if (Array.isArray(headerClass)) {
                colDef.headerClass = [].concat((0, _toConsumableArray2.default)(headerClass), [required ? 'gant-header-cell-required' : 'gant-header-cell-edit']);
              }

              break;

            case 'function':
              colDef.headerClass = function (params) {
                var _class = headerClass(params);

                if (typeof _class === 'string') return (0, _classnames.default)(_class, required ? 'gant-header-cell-required' : 'gant-header-cell-edit');
                return [].concat((0, _toConsumableArray2.default)(_class), [required ? 'gant-header-cell-required' : 'gant-header-cell-edit']);
              };

            default:
              colDef.headerClass = (0, _classnames.default)(required ? 'gant-header-cell-required' : 'gant-header-cell-edit');
          }

          if (typeof signable === 'boolean' || typeof signable === 'function') colDef.cellClassRules = Object.assign({
            'gant-cell-validate-sign': function gantCellValidateSign(params) {
              var show = typeof signable === 'boolean' ? signable : signable(params);
              if (!show) return false;

              var _a = params.data,
                  _b = _a === void 0 ? {} : _a,
                  _rowError = _b._rowError,
                  itemData = __rest(_b, ["_rowError"]),
                  field = params.colDef.field;

              return typeof (0, _lodash.get)(_rowError, field, null) === 'string';
            }
          }, colDef.cellClassRules);
        }

        if (fixed) colDef.pinned = fixed;
      } else if (itemisgroup(colDef, children)) {
        if (children && children.length) {
          var groupChildren = getColumnDefs(children, (0, _lodash.get)(item, 'hide', hide));
          colDef.children = groupChildren.columnDefs;
          colDef.marryChildren = true;
          validateFields = Object.assign(Object.assign({}, validateFields), groupChildren.validateFields);
        }
      }

      return colDef;
    });
    return {
      columnDefs: columnDefs,
      validateFields: validateFields,
      requireds: requireds
    };
  }

  var _getColumnDefs = getColumnDefs(columns),
      columnDefs = _getColumnDefs.columnDefs,
      validateFields = _getColumnDefs.validateFields,
      requireds = _getColumnDefs.requireds;

  columnDefs = serialNumber ? typeof serialNumber === 'boolean' ? [serialNumberCol].concat((0, _toConsumableArray2.default)(columnDefs)) : [Object.assign(Object.assign(Object.assign({}, serialNumberCol), serialNumber), {
    cellClassRules: Object.assign(Object.assign({}, serialNumberCol.cellClassRules), serialNumber.cellClassRules)
  })].concat((0, _toConsumableArray2.default)(columnDefs)) : columnDefs;
  columnDefs = defaultSelection ? [Object.assign(Object.assign(Object.assign(Object.assign({}, defaultCheckboxColSelectionCol), {
    width: sizeNumber[size],
    headerCheckboxSelection: rowSelection === 'multiple'
  }), defaultSelectionCol), {
    cellClassRules: Object.assign({
      'gant-grid-cell-checkbox-indeterminate': function gantGridCellCheckboxIndeterminate(params) {
        var node = params.node,
            context = params.context;
        var groupSelectsChildren = context.groupSelectsChildren,
            selectedRows = context.selectedRows,
            getRowNodeId = context.getRowNodeId;
        var index = (0, _lodash.findIndex)(selectedRows, function (item) {
          return getRowNodeId(item) === node.id;
        });
        if (!groupSelectsChildren) return false;
        if (!node.isSelected() && index < 0) return false;
        var _node$allLeafChildren = node.allLeafChildren,
            allLeafChildren = _node$allLeafChildren === void 0 ? [] : _node$allLeafChildren;

        var _iterator = _createForOfIteratorHelper(allLeafChildren),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var itemNode = _step.value;
            if (!itemNode.isSelected()) return true;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return false;
      }
    }, (0, _lodash.get)(defaultSelectionCol, 'cellClassRules', {}))
  })].concat((0, _toConsumableArray2.default)(columnDefs)) : columnDefs;
  return {
    columnDefs: columnDefs,
    validateFields: validateFields,
    requireds: requireds
  };
}; // boolean类型


exports.mapColumns = mapColumns;

function isbool(t) {
  return typeof t === 'boolean';
} // number


function isnumber(t) {
  return typeof t === 'number';
} // string


function isstring(t) {
  return typeof t === 'string';
} // array


function isarray(t) {
  return Array.isArray(t);
} // promise


function isfunc(t) {
  return t && typeof t === 'function';
} // promise


function ispromise(t) {
  return t && isfunc(t.then);
}

function flattenTreeData(dataSoruce, getRowNodeId) {
  var treeDataChildrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  var pathArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var treeData = [];
  dataSoruce.map(function (item) {
    var _a = item,
        _b = treeDataChildrenName,
        children = _a[_b],
        itemData = __rest(_a, [(0, _typeof2.default)(_b) === "symbol" ? _b : _b + ""]);

    var treeDataPath = [].concat((0, _toConsumableArray2.default)(pathArray), [getRowNodeId(itemData)]);

    if (children && children.length) {
      treeData.push(Object.assign(Object.assign({}, item), {
        treeDataPath: treeDataPath,
        parent: true
      }));
      var childrenTreeData = flattenTreeData(children, getRowNodeId, treeDataChildrenName, treeDataPath);
      Array.prototype.push.apply(treeData, childrenTreeData);
    } else {
      treeData.push(Object.assign(Object.assign({}, item), {
        treeDataPath: treeDataPath
      }));
    }
  });
  return treeData;
}

function isPagitation(p) {
  return (0, _typeof2.default)(p) === 'object';
}

function usePagination(pagitation, size, defapagitation) {
  if (isPagitation(pagitation)) {
    var defaultPagetation = Object.assign({
      size: size,
      defaultPageSize: 50,
      defaultCurrent: 1,
      pageSizeOptions: ['50', '200', '500', '1000', '3000', '5000', '10000'],
      showSizeChanger: true,
      showQuickJumper: true,
      countLimit: 50000,
      showLessItems: true,
      align: 'left'
    }, defapagitation);
    return Object.assign(Object.assign({}, defaultPagetation), pagitation);
  }

  return false;
} // export function getSizeClassName(size: Size) {
//   switch (size) {
//     case 'small':
//       return 'sm';
//     default:
//       return '';
//   }
// }


var AG_GRID_STOP_PROPAGATION = '__ag_Grid_Stop_Propagation';
exports.AG_GRID_STOP_PROPAGATION = AG_GRID_STOP_PROPAGATION;

function stopPropagationForAgGrid(event) {
  event[AG_GRID_STOP_PROPAGATION] = true;
}

function groupNodeSelectedToggle(node, selected) {
  var _node$childrenAfterFi = node.childrenAfterFilter,
      childrenAfterFilter = _node$childrenAfterFi === void 0 ? [] : _node$childrenAfterFi;
  childrenAfterFilter.map(function (itemNode) {
    itemNode.setSelected(selected);
    groupNodeSelectedToggle(itemNode, selected);
  });
}

function checkParentGroupSelectedStatus(node, selected, api) {
  var parent = node.parent;
  if (parent.level < 0) return;

  if (selected) {
    parent.setSelected(selected);
    checkParentGroupSelectedStatus(parent, selected, api);
    api.refreshCells({
      columns: ['defalutSelection'],
      rowNodes: [parent],
      force: true
    });
    return;
  }

  var _parent$childrenAfter = parent.childrenAfterFilter,
      childrenAfterFilter = _parent$childrenAfter === void 0 ? [] : _parent$childrenAfter;

  var _iterator2 = _createForOfIteratorHelper(childrenAfterFilter),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var itemNode = _step2.value;

      if (itemNode.isSelected()) {
        parent.setSelected(true);
        api.refreshCells({
          columns: ['defalutSelection'],
          rowNodes: [parent],
          force: true
        });
        return;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  parent.setSelected(false);
  checkParentGroupSelectedStatus(parent, selected, api);
}
/**
 * 判断是否导出隐藏字段
 * @param col 当前列
 * @param exportHiddenFields 隐藏字段导出状态
 */


function isExportHiddenFields(col, exportHiddenFields) {
  if (!exportHiddenFields) {
    var hide = col.hide || false;
    return hide !== true;
  }

  return exportHiddenFields;
}
/**
 * 获取 column 信息
 * @param column
 */


function getColumnInfo(column) {
  var fieldName = column.field;
  var children = column.children;

  if (column.hasOwnProperty('groupId')) {
    fieldName = column.groupId;
  } else if (column.hasOwnProperty('colId')) {
    fieldName = column.colId;
  }

  return {
    fieldName: fieldName,
    children: children
  };
}