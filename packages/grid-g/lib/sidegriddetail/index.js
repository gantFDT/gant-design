"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _grid = _interopRequireDefault(require("grid-g"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _CombEditComponent = _interopRequireDefault(require("./CombEditComponent"));

var _utils = require("./utils");

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

//自定义header高度
var headerHeight = 25; //右侧边栏grid行转列详情，支持编辑和各种状态联动

var GridDetail = function GridDetail(props) {
  var fatherColumns = props.columns,
      clickedEvent = props.clickedEvent,
      editable = props.editable,
      onCellEditChange = props.onCellEditChange,
      onCellEditingChange = props.onCellEditingChange,
      fatherGridManager = props.gridManager,
      closeDrawer = props.closeDrawer,
      _height = props.height,
      context = props.context,
      rowIndex = props.rowIndex;
  var fatherData = clickedEvent.data,
      fatherApi = clickedEvent.api,
      fatherNode = clickedEvent.node,
      fatherRowIndex = clickedEvent.rowIndex;
  var rowkey = fatherGridManager.rowkey;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      dataSource = _useState2[0],
      setDataSource = _useState2[1];

  var gridRef = (0, _react.useRef)(null);
  var gridManagerRef = (0, _react.useRef)(null); //序号

  var serialValue = fatherApi.getValue('g-index', fatherNode);
  (0, _react.useEffect)(function () {
    var data = (0, _utils.getTransData)(fatherColumns, fatherData);
    setDataSource(data);
  }, [rowIndex]);
  var onDataChange = (0, _react.useCallback)(function (event) {
    var newData = event.newData;
    var data = (0, _utils.getTransData)(fatherColumns, newData);
    if ((0, _lodash.get)(newData, '_rowType') === 'remove_tag') return gridManagerRef.current.tagRemove(data.map(function (item) {
      return (0, _lodash.get)(item, 'fieldName');
    }));
    gridManagerRef.current.modify(data);
  }, [fatherColumns]);
  (0, _react.useEffect)(function () {
    fatherNode.addEventListener('dataChanged', onDataChange);
    fatherApi.addEventListener('dataChange', function (data) {
      return console.log(data);
    });
    return function () {
      fatherNode.removeEventListener('dataChanged', onDataChange);
    };
  }, [onDataChange]);
  var height = typeof _height === 'string' ? "calc(".concat(_height, " - ").concat(headerHeight, "px - 1px") : Number(_height) - headerHeight;
  var onReady = (0, _react.useCallback)(function (params, manager) {
    gridRef.current = params.api;
    gridManagerRef.current = manager;
  }, []); //值改变

  var _onCellEditingChange = (0, _react.useCallback)(function (newData, field, newValue, oldValue) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var fatherData, _newData, fieldName, getRowNodeId, fatherRow, newFatherDataAll, _rowData, _rowError, _rowType, newFatherData, temp, fatherNewData, record, changeData, changIndex;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fatherData = clickedEvent.data;
              _newData = newData, fieldName = _newData.fieldName;

              getRowNodeId = function getRowNodeId(data) {
                if (typeof rowkey === 'string') {
                  return (0, _lodash.get)(data, rowkey);
                }

                return rowkey(data);
              }; //改变父层数据


              fatherRow = fatherApi.getRowNode(getRowNodeId(fatherData));
              newFatherDataAll = (0, _lodash.get)(fatherRow, 'data');
              _rowData = newFatherDataAll._rowData, _rowError = newFatherDataAll._rowError, _rowType = newFatherDataAll._rowType, newFatherData = __rest(newFatherDataAll, ["_rowData", "_rowError", "_rowType"]);
              temp = (0, _lodash.cloneDeep)(newFatherData);
              fatherNewData = (0, _lodash.set)(temp, fieldName, newValue); //父级onCellEditingChange

              record = fatherNewData;

              if (!onCellEditingChange) {
                _context.next = 15;
                break;
              }

              _context.next = 12;
              return onCellEditingChange(record, fieldName, newValue, oldValue, {
                context: context
              });

            case 12:
              _context.t0 = _context.sent;
              _context.next = 16;
              break;

            case 15:
              _context.t0 = fatherNewData;

            case 16:
              changeData = _context.t0;
              changeData = Array.isArray(changeData) ? changeData : [changeData];
              changIndex = (0, _lodash.findIndex)(changeData, function (itemData) {
                return getRowNodeId(fatherData) === getRowNodeId(itemData);
              });
              changeData = changeData[changIndex];
              newData = (0, _utils.getTransData)(fatherColumns, changeData);
              setTimeout(function () {
                fatherGridManager.modify(changeData);
              }, 300);
              return _context.abrupt("return", newData);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  }, [fatherColumns, context]); //列转对象


  var fields = (0, _react.useMemo)(function () {
    return (0, _utils.transColumnsToObj)(fatherColumns);
  }, [fatherColumns]); //行转列

  var realColumns = (0, _react.useMemo)(function () {
    var fatherData = clickedEvent.data;
    var _rowType = fatherData._rowType,
        _rowError = fatherData._rowError;
    return [{
      title: '字段',
      fieldName: 'fieldName',
      hide: true
    }, {
      title: '属性',
      fieldName: 'label',
      cellStyle: {
        background: 'rgba(128,128,128,0.05)',
        borderRight: '1px solid rgba(128,128,128,0.2)',
        color: _rowType === 'add' ? '#52c41a' : '#000'
      }
    }, {
      title: '值',
      fieldName: 'value',
      flex: 2,
      //兼容父层的valueGetter
      valueGetter: function valueGetter(params) {
        var data = params.data;
        var fieldName = data.fieldName;
        var columnField = (0, _lodash.get)(fields, fieldName);
        var value = (0, _lodash.get)(data, 'value');
        var valueGetter = (0, _utils.getValueGetter)({
          columnField: columnField,
          fieldName: fieldName,
          clickedEvent: clickedEvent,
          cellValue: value
        });
        return valueGetter;
      },
      //兼容父层的valueFormatter和render
      render: function render(value, record) {
        var fieldName = record.fieldName;
        var columnField = (0, _lodash.get)(fields, fieldName);
        var valueRender = (0, _utils.getValueRender)({
          columnField: columnField,
          fieldName: fieldName,
          clickedEvent: clickedEvent,
          record: record,
          cellValue: value
        });
        return valueRender;
      },
      editConfig: {
        component: function component(params) {
          return /*#__PURE__*/_react.default.createElement(_CombEditComponent.default, Object.assign({}, params, {
            fields: fields
          }));
        },
        editable: function editable(record, params) {
          var fieldName = record.fieldName;
          var columnField = (0, _lodash.get)(fields, fieldName);
          var res = (0, _utils.getEditable)({
            columnField: columnField,
            clickedEvent: clickedEvent
          });
          return res;
        },
        signable: true,
        // initValueFormatter:function(params: any) {
        //   console.log('initValueFormatter')
        //   const { data } = params;
        //   const { fieldName } = data;
        //   const columnField = get(fields,fieldName);
        //   const value = get(data,'value');
        //   const valueGetter = getValueGetter({
        //     columnField,
        //     fieldName,
        //     clickedEvent,
        //     cellValue: value,
        //   });
        //   const initValueFormatter = getInitValueFormatter({
        //     columnField,
        //     fieldName,
        //     clickedEvent,
        //     cellValue: valueGetter,
        //   });
        //   return initValueFormatter;
        // },
        rules: {
          //统一校验
          asyncValidator: function asyncValidator(rules, value, cb, data) {
            return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee2() {
              var fieldName, _rowError, fieldsRules, validator;

              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      fieldName = data.fieldName, _rowError = data._rowError;
                      fieldsRules = {};
                      Object.keys(fields).map(function (key) {
                        var rules = (0, _lodash.get)(fields, "".concat(key, ".editConfig.rules"));

                        if (rules) {
                          fieldsRules[key] = rules;
                        }
                      });
                      validator = new _asyncValidator.default(fieldsRules);
                      validator.validate(Object.assign(Object.assign({}, fatherData), (0, _defineProperty2.default)({}, fieldName, value)), {}, function (errors, fields) {
                        if (errors) {
                          errors.forEach(function (error) {
                            if (error.field === fieldName) {
                              cb(error.message);
                            }
                          });
                        } else {
                          cb();
                        }
                      });

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
          }
        }
      }
    }];
  }, [fatherColumns, fields]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: barStyle
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "profile"
  }), " ", '行详情'), /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "close",
    onClick: function onClick() {
      return closeDrawer();
    }
  })), /*#__PURE__*/_react.default.createElement(_grid.default, {
    rowkey: "fieldName",
    dataSource: dataSource,
    columns: realColumns,
    height: height,
    enableCellTextSelection: false,
    enableRangeSelection: true,
    onReady: onReady,
    // headerHeight={0}
    defaultColDef: {
      flex: 1,
      floatingFilter: true,
      filter: 'agMultiColumnFilter'
    },
    onCellEditingChange: _onCellEditingChange,
    popupParent: document.querySelector('body'),
    editable: editable,
    className: 'grid-side-detail-panel'
  }));
};

var _default = GridDetail;
exports.default = _default;
var barStyle = {
  padding: '0 10px',
  height: headerHeight,
  display: 'flex',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--ag-header-foreground-color, var(--ag-secondary-foreground-color, rgba(0, 0, 0, 0.54)))',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: "var(--ag-header-background-color, #f5f7f7)",
  borderBottom: "1px solid var(--ag-border-color, #bdc3c7)"
};