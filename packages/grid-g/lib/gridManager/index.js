"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _lodash = require("lodash");

var _utils = require("./utils");

var _lodashDecorators = require("lodash-decorators");

var _util = require("util-g");

var _utils2 = require("../utils");

var _decorator = require("./decorator");

var _interface = require("../interface");

var _events = require("events");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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

var GridManage = /*#__PURE__*/function () {
  function GridManage(event) {
    var _this = this;

    (0, _classCallCheck2.default)(this, GridManage);
    this.historyStack = [];
    this.redoStack = [];
    this.dataAsyncFun = null;
    this.dataAsyncStack = [];
    this.setingLoading = false;
    this.changeStatus = false;

    this.getRowItemData = function (itemData, oldData) {
      var getRowNodeId = _this.agGridConfig.getRowNodeId;
      var nodeId = (0, _typeof2.default)(itemData) === 'object' ? getRowNodeId(itemData) : itemData;

      var rowNode = _this.agGridApi.getRowNode(nodeId);

      return (0, _lodash.isEmpty)(oldData) ? rowNode : Object.assign(Object.assign({}, rowNode), {
        data: Object.assign({}, oldData)
      });
    };

    this.addListener = function (type, func) {
      return _this.gridEvent.addListener(type, func);
    };

    this.removeListener = function (type, func) {
      _this.gridEvent.removeListener(type, func);
    };

    this.agGridConfig = Object.assign(Object.assign({}, event), this.agGridConfig);
    this.gridEvent = new _events.EventEmitter();
  }

  (0, _createClass2.default)(GridManage, [{
    key: "loading",
    get: function get() {
      return this.setingLoading;
    },
    set: function set(value) {
      this.setingLoading = value;

      if (value === false && this.dataAsyncStack.length > 0) {
        this.outAsyncFunStack();
      }
    }
  }, {
    key: "isChanged",
    get: function get() {
      var _this$diff = this.diff,
          remove = _this$diff.remove,
          modify = _this$diff.modify,
          add = _this$diff.add;
      var all = [].concat((0, _toConsumableArray2.default)(remove), (0, _toConsumableArray2.default)(modify), (0, _toConsumableArray2.default)(add));
      return all.length > 0;
    }
  }, {
    key: "diff",
    get: function get() {
      var allDiff = this.changeDiff();
      var remove = allDiff.remove,
          modify = allDiff.modify,
          add = allDiff.add;
      return {
        remove: (0, _toConsumableArray2.default)(remove),
        modify: modify,
        add: add
      };
    }
  }, {
    key: "outAsyncFunStack",
    value: function outAsyncFunStack() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var asyncFun;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.loading || this.dataAsyncStack.length <= 0)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!(!this.loading && this.dataAsyncStack.length > 0)) {
                  _context.next = 9;
                  break;
                }

                asyncFun = this.dataAsyncStack.shift();

                if (!(typeof asyncFun === 'function')) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return asyncFun();

              case 7:
                _context.next = 2;
                break;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "onDataAsyncEnd",
    value: function onDataAsyncEnd(func) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof func !== 'function')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                if (!(this.loading === false)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", func());

              case 4:
                this.dataAsyncStack.push(func);
                return _context2.abrupt("return", null);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "watchHistory",
    value: function watchHistory() {
      if (this.isChanged !== this.changeStatus) {
        this.agGridConfig.editChangeCallback && this.agGridConfig.editChangeCallback(this.isChanged);
        this.changeStatus = this.isChanged;
      }

      this.gridEvent.emit('historyChange', {
        undo: !!this.historyStack.length,
        redo: !!this.redoStack.length
      });
    }
  }, {
    key: "batchUpdateGrid",
    value: function batchUpdateGrid(transaction, callback) {
      this.agGridApi.applyTransaction(transaction);
      callback && callback();
    }
  }, {
    key: "appendChild",
    value: function appendChild(keys, add) {
      var _this$agGridConfig = this.agGridConfig,
          isCompute = _this$agGridConfig.isCompute,
          treeDataChildrenName = _this$agGridConfig.treeDataChildrenName,
          getRowNodeId = _this$agGridConfig.getRowNodeId;
      var addData = isCompute ? (0, _utils2.flattenTreeData)(add, getRowNodeId, treeDataChildrenName) : add;
      this.batchUpdateGrid({
        add: addData
      });
    }
  }, {
    key: "validate",
    value: function validate(data) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _this2 = this;

        var getRowNodeId, _this$diff2, add, modify, initsource, source, fields, validateFields, descriptor, schema, errors, validateErros, nodeIds, nodeFields;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                getRowNodeId = this.agGridConfig.getRowNodeId;
                _this$diff2 = this.diff, add = _this$diff2.add, modify = _this$diff2.modify;
                initsource = (0, _lodash.isEmpty)(data) ? [].concat((0, _toConsumableArray2.default)(add), (0, _toConsumableArray2.default)(modify)) : data;
                source = (0, _lodash.cloneDeep)(initsource);
                fields = {};
                validateFields = (0, _lodash.cloneDeep)(this.validateFields);
                source = source.map(function (item, index) {
                  var newItem = (0, _lodash.cloneDeep)(item);
                  fields[index] = {
                    type: 'object',
                    fields: validateFields
                  };
                  Object.keys(validateFields).map(function (validateField) {
                    var field = validateField.replace(/\-/g, '.');
                    newItem = (0, _lodash.set)(newItem, validateField, (0, _lodash.get)(newItem, field));
                  });
                  return newItem;
                });
                descriptor = {
                  type: 'object',
                  source: {
                    type: 'array',
                    fields: fields
                  }
                };
                schema = new _asyncValidator.default(descriptor);
                _context3.prev = 9;
                _context3.next = 12;
                return schema.validate({
                  source: source
                });

              case 12:
                this.errorSign({}, initsource);
                return _context3.abrupt("return", null);

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](9);
                errors = _context3.t0.errors;
                validateErros = {};
                nodeIds = [];
                nodeFields = [];
                errors.map(function (itemError) {
                  var _itemError$field$spli = itemError.field.split('.'),
                      _itemError$field$spli2 = (0, _slicedToArray2.default)(_itemError$field$spli, 3),
                      sourceName = _itemError$field$spli2[0],
                      index = _itemError$field$spli2[1],
                      field = _itemError$field$spli2[2];

                  field = field.replace(/\-/g, '.');
                  var nodeId = getRowNodeId((0, _lodash.get)(source, "[".concat(index, "]"), {}));

                  var rowNode = _this2.agGridApi.getRowNode(nodeId);

                  var message = itemError.message;

                  if (rowNode) {
                    _this2.getNodeExtendsParent(rowNode);

                    var rowIndex = rowNode.rowIndex;

                    if (Reflect.has(validateErros, rowIndex)) {
                      validateErros[rowIndex].push({
                        field: field,
                        message: message
                      });
                    } else {
                      validateErros[rowIndex] = [{
                        field: field,
                        message: message
                      }];
                    }

                    nodeIds = [].concat((0, _toConsumableArray2.default)(nodeIds), [nodeId]);
                    nodeFields = [].concat((0, _toConsumableArray2.default)(nodeFields), [field]);
                  }
                });

                if (!(0, _lodash.isEmpty)(validateErros)) {
                  _context3.next = 25;
                  break;
                }

                return _context3.abrupt("return");

              case 25:
                this.errorSign(validateErros, initsource);
                return _context3.abrupt("return", validateErros);

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[9, 16]]);
      }));
    }
  }, {
    key: "errorSign",
    value: function errorSign(validateErros, newData) {
      var _this3 = this;

      var update = [];
      var indexArr = [];
      update = newData.map(function (itemData) {
        var nodeId = _this3.agGridConfig.getRowNodeId(itemData);

        var rowNode = _this3.agGridApi.getRowNode(nodeId);

        var rowIndex = (0, _lodash.get)(rowNode, 'rowIndex', -1);
        var errorsArr = validateErros[rowIndex];
        var mergeData = Object.assign(Object.assign({}, (0, _lodash.get)(rowNode, 'data', {})), itemData);

        var merge_rowError = mergeData._rowError,
            newItemData = __rest(mergeData, ["_rowError"]);

        if (errorsArr) {
          var _rowError = {};
          errorsArr.map(function (itemError) {
            (0, _lodash.set)(_rowError, itemError.field, itemError.message);
          });
          rowNode.setData(Object.assign(Object.assign({}, newItemData), {
            _rowError: _rowError
          }));
        } else {
          if (merge_rowError) rowNode.setData(Object.assign({}, newItemData));
        }
      });
    }
  }, {
    key: "getNodeExtendsParent",
    value: function getNodeExtendsParent(rowNode) {
      var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (rowNode.level > 0) {
        this.getNodeExtendsParent(rowNode.parent, false);
        if (!rowNode.parent.expanded) rowNode.parent.setExpanded(true);
      } else if (rowNode.level == 0 && !first) {
        if (!rowNode.expanded) rowNode.setExpanded(true);
      }
    }
  }, {
    key: "cancelCut",
    value: function cancelCut() {
      try {
        var update = (0, _utils.onSetcutData)(this.cutRows, true);
        this.agGridApi.applyTransactionAsync({
          update: update
        });
        this.cutRows = [];
      } catch (error) {
        console.error('cancelCut---->', error);
      }
    }
  }, {
    key: "cut",
    value: function cut(rowsNodes) {
      try {
        var oldUpdate = (0, _utils.onSetcutData)(this.cutRows, true);
        var newUpdate = (0, _utils.onSetcutData)(rowsNodes);
        if (!(0, _lodash.isEmpty)(this.cutRows)) (0, _utils.onSetcutData)(rowsNodes);
        this.agGridApi.applyTransactionAsync({
          update: [].concat((0, _toConsumableArray2.default)(oldUpdate), (0, _toConsumableArray2.default)(newUpdate))
        });
        this.cutRows = rowsNodes;
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "paste",
    value: function paste(node) {
      var _this4 = this;

      var up = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var isChild = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var _a;

      try {
        var _this$agGridConfig2 = this.agGridConfig,
            getDataPath = _this$agGridConfig2.getDataPath,
            createConfig = _this$agGridConfig2.createConfig,
            treeData = _this$agGridConfig2.treeData,
            getRowNodeId = _this$agGridConfig2.getRowNodeId;
        var removeData = [],
            addData = [];

        if (!treeData) {
          removeData = this.cutRows.map(function (itemNode) {
            var _a = (0, _lodash.get)(itemNode, 'data', {}),
                _rowCut = _a._rowCut,
                data = __rest(_a, ["_rowCut"]);

            return data;
          });
          addData = removeData;
        } else {
          if (!(0, _utils.canQuickCreate)(createConfig)) return console.warn('createConfig is error');
          var _createConfig$default = createConfig.defaultParentPath,
              defaultParentPath = _createConfig$default === void 0 ? [] : _createConfig$default;
          defaultParentPath = Array.isArray(defaultParentPath) ? defaultParentPath : [];
          var parentPath = !node ? defaultParentPath : [];

          if (node) {
            var brotherPath = getDataPath((0, _lodash.get)(node, 'data', []));
            parentPath = isChild ? brotherPath : brotherPath.slice(0, brotherPath.length - 1);
          }

          var _getRowsToUpdate = (0, _utils.getRowsToUpdate)(this.cutRows, parentPath, createConfig, this.agGridConfig),
              newRowData = _getRowsToUpdate.newRowData,
              oldRowData = _getRowsToUpdate.oldRowData;

          removeData = oldRowData;
          addData = newRowData;
        }

        if ((_a = this.agGridConfig) === null || _a === void 0 ? void 0 : _a.pasteToGridManager) {
          this.remove(removeData.map(function (item) {
            return getRowNodeId(item);
          }));
          this.create(addData, getRowNodeId(node.data), !up);
          return;
        }

        this.agGridApi.applyTransactionAsync({
          remove: removeData
        }, function (params) {
          var rowData = _this4.getRowData();

          var newDataSource = (0, _utils.replaceRowData)({
            rowData: rowData,
            targetData: node.data,
            newData: addData,
            getRowNodeId: getRowNodeId,
            up: up
          });

          _this4.agGridApi.setRowData(newDataSource);

          _this4.cutRows = [];
          _this4.agGridConfig.onRowsPasteEnd && _this4.agGridConfig.onRowsPasteEnd(newDataSource);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: "reset",
    value: function reset(agGridConfig) {
      this.agGridConfig = Object.assign(Object.assign({}, this.agGridConfig), agGridConfig);
      this.historyStack = [];
      this.redoStack = [];
      this.cutRows = [];
    }
  }, {
    key: "dataSourceChanged",
    value: function dataSourceChanged() {
      var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!Array.isArray(dataSource) || !this.agGridApi) return;
      var gridDataSource = [];
      this.agGridApi.forEachNode(function (node) {
        if (node.data) gridDataSource.push(node.data);
      }); // if (isEqual(dataSource, gridDataSource) || isEqual(dataSource, this.agGridConfig.dataSource))
      //   return this.agGridApi.setRowData(dataSource);

      this.reset({
        dataSource: dataSource
      });
      this.agGridApi.setRowData([]);
      this.agGridApi.setRowData(dataSource);
    }
  }, {
    key: "getRowData",
    value: function getRowData() {
      var rowData = [];
      if (!this.agGridApi) return [];
      this.agGridApi.forEachLeafNode(function (node, index) {
        rowData.push(Object.assign(Object.assign({}, node.data), {
          dataNumber: index
        }));
      });
      return rowData;
    }
  }, {
    key: "modify",
    value: function modify(records) {
      var oldRecords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var _a;

      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this5 = this;

        var _getModifyData, hisRecords, newRecords, updateRowData, diff, modify, add, data;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!((0, _lodash.isEmpty)(records) && (0, _typeof2.default)(records) !== 'object')) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                records = Array.isArray(records) ? records : [records];

                if (!(records.length <= 0)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return");

              case 5:
                _getModifyData = (0, _utils.getModifyData)(records, this.getRowItemData, oldRecords, this.agGridConfig.getRowNodeId), hisRecords = _getModifyData.hisRecords, newRecords = _getModifyData.newRecords;

                if (!(newRecords.length <= 0)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return");

              case 8:
                updateRowData = [];
                newRecords.map(function (data) {
                  var nodeId = _this5.agGridConfig.getRowNodeId(data);

                  var node = _this5.agGridApi.getRowNode(nodeId);

                  if (node && node.data && data) return updateRowData.push(data);
                });
                _context4.next = 12;
                return new Promise(function (resolve) {
                  _this5.batchUpdateGrid({
                    update: updateRowData
                  }, function () {
                    resolve('');
                  });
                });

              case 12:
                this.historyStack.push({
                  type: _interface.DataActions.modify,
                  records: hisRecords
                });

                if (!((_a = this.agGridConfig) === null || _a === void 0 ? void 0 : _a.multiLineVerify)) {
                  _context4.next = 19;
                  break;
                }

                diff = this.diff;
                modify = diff.modify, add = diff.add;
                data = [].concat((0, _toConsumableArray2.default)(modify), (0, _toConsumableArray2.default)(add));
                this.validate(data);
                return _context4.abrupt("return");

              case 19:
                _context4.next = 21;
                return this.validate(updateRowData);

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    } // 创建;

  }, {
    key: "create",
    value: function create(records, targetId) {
      var _this6 = this;

      var isSub = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var getRowNodeId = this.agGridConfig.getRowNodeId;
      var addRecords = Array.isArray(records) ? records : [records];
      if (addRecords.length <= 0) return;
      var rowData = this.getRowData();
      addRecords = addRecords.map(function (item) {
        return Object.assign(Object.assign({}, item), {
          _rowType: _interface.DataActions.add
        });
      });
      this.agGridColumnApi.applyColumnState({});

      if (typeof targetId !== 'number' && !targetId || typeof targetId === 'boolean') {
        var isFirst = typeof targetId === 'boolean' && targetId;
        this.batchUpdateGrid({
          add: addRecords,
          addIndex: isFirst ? 0 : undefined
        }, function () {
          _this6.validate(addRecords);

          _this6.historyStack.push({
            type: _interface.DataActions.add,
            records: addRecords
          });
        });
        return;
      }

      addRecords = addRecords;
      var targetIndex = typeof targetId == 'number' ? targetId : (0, _lodash.get)(this.agGridApi.getRowNode(targetId), 'rowIndex', 0);
      targetIndex = targetIndex < 0 ? 0 : targetIndex;
      if (Array.isArray(targetId)) targetIndex = 0;
      this.batchUpdateGrid({
        add: addRecords,
        addIndex: isSub ? targetIndex + 1 : targetIndex
      }, function () {
        _this6.validate(addRecords);

        _this6.historyStack.push({
          type: _interface.DataActions.add,
          records: addRecords
        });
      });
    }
  }, {
    key: "quickCreateNode",
    value: function quickCreateNode() {
      var isChild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var targetId = arguments.length > 1 ? arguments[1] : undefined;
      var record = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var _this$agGridConfig3 = this.agGridConfig,
          createConfig = _this$agGridConfig3.createConfig,
          treeData = _this$agGridConfig3.treeData,
          getDataPath = _this$agGridConfig3.getDataPath;
      targetId = targetId + '';
      var rowNode = this.agGridApi.getRowNode(targetId);
      var nodeData = rowNode.data;
      var nodePath = getDataPath(nodeData);
      var parentPath = isChild ? (0, _toConsumableArray2.default)(nodePath) : (0, _toConsumableArray2.default)(nodePath.slice(0, nodePath.length - 1));

      if (typeof record == 'number') {
        var len = record > 1 ? record : 1;
        var records = [];

        for (var index = 0; index < len; index++) {
          var data = {};
          var id = (0, _util.generateUuid)() + '';
          data[createConfig.id] = id;

          if (getDataPath && treeData) {
            data[createConfig.path] = createConfig.toPath([].concat((0, _toConsumableArray2.default)(parentPath), [id]));
          }

          records.push(data);
        }

        return this.create(records, targetId);
      }

      if ((0, _typeof2.default)(record) === 'object' && !Array.isArray(record)) {
        var _data = {};

        var _id = (0, _util.generateUuid)() + '';

        _data[createConfig.id] = _id;

        if (getDataPath && treeData) {
          _data[createConfig.path] = createConfig.toPath([].concat((0, _toConsumableArray2.default)(parentPath), [_id]));
          _data = Object.assign(Object.assign({}, _data), record);
        }

        return this.create(_data, targetId);
      }

      if (Array.isArray(record)) {
        var _records = record.map(function (item) {
          var id = (0, _util.generateUuid)() + '';
          var data = Object.assign(Object.assign({}, item), (0, _defineProperty2.default)({}, createConfig.id, id));

          if (getDataPath && treeData) {
            data[createConfig.path] = createConfig.toPath([].concat((0, _toConsumableArray2.default)(parentPath), [id]));
          }

          return data;
        });

        return this.create(_records, targetId);
      }
    } // 创建平行节点

  }, {
    key: "createNode",
    value: function createNode(targetId) {
      var record = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _this$agGridConfig4 = this.agGridConfig,
          createConfig = _this$agGridConfig4.createConfig,
          getRowNodeId = _this$agGridConfig4.getRowNodeId,
          treeData = _this$agGridConfig4.treeData,
          getDataPath = _this$agGridConfig4.getDataPath;
      if (!(0, _utils.canQuickCreate)(createConfig)) return console.warn('createConfig is error');
      if (typeof targetId !== 'number' && !targetId) return console.warn('nodeId is null');
      if (typeof targetId !== 'string' && typeof targetId !== 'number') return console.warn('nodeId format error');
      this.quickCreateNode(false, targetId, record);
    }
  }, {
    key: "createChildNode",
    value: function createChildNode(targetId) {
      var record = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _this$agGridConfig5 = this.agGridConfig,
          createConfig = _this$agGridConfig5.createConfig,
          getRowNodeId = _this$agGridConfig5.getRowNodeId,
          treeData = _this$agGridConfig5.treeData,
          getDataPath = _this$agGridConfig5.getDataPath;
      if (!(0, _utils.canQuickCreate)(createConfig)) return console.warn('createConfig is error');
      if (typeof targetId !== 'number' && !targetId) return console.warn('parentNodeId is null');
      if (typeof targetId !== 'string' && typeof targetId !== 'number') return console.warn('parentNodeId format error');
      this.quickCreateNode(true, targetId, record);
    } //移除;

  }, {
    key: "remove",
    value: function remove(targetid) {
      var deleteChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (typeof targetid !== 'number' && (0, _lodash.isEmpty)(targetid)) return;
      var getRowNodeId = this.agGridConfig.getRowNodeId;
      var targetArray = Array.isArray(targetid) ? targetid : [targetid];
      if (targetArray.length <= 0) return;
      var recordsIndex = [];
      var records = [];
      var rowData = this.getRowData();
      var removeNodes = (0, _utils.getAllChildrenNode)(targetArray, this.agGridApi, deleteChildren);
      removeNodes.map(function (itemNode) {
        var data = itemNode.data,
            childIndex = itemNode.childIndex;

        if (data) {
          var rowIndex = (0, _lodash.findIndex)(rowData, function (itemData) {
            return getRowNodeId(itemData) === getRowNodeId(data);
          });
          recordsIndex.unshift(rowIndex);
          records.unshift(data);
        }
      });
      this.historyStack.push({
        type: _interface.DataActions.remove,
        recordsIndex: recordsIndex,
        records: records
      });
      this.batchUpdateGrid({
        remove: records
      });
      return records;
    } //移除标记;

  }, {
    key: "tagRemove",
    value: function tagRemove(targetKeys) {
      var deleteChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (typeof targetKeys !== 'number' && (0, _lodash.isEmpty)(targetKeys)) return;
      var getRowNodeId = this.agGridConfig.getRowNodeId;
      var rowData = this.getRowData();
      if (!Array.isArray(targetKeys) && (0, _typeof2.default)(targetKeys) === 'object') return;
      var targetArray = Array.isArray(targetKeys) ? targetKeys : [targetKeys];
      if (targetArray.length <= 0) return;
      var removeNodes = (0, _utils.getAllChildrenNode)(targetArray, this.agGridApi, deleteChildren);

      var _removeTagData = (0, _utils.removeTagData)(removeNodes, rowData, getRowNodeId),
          hisRecords = _removeTagData.hisRecords,
          newRecords = _removeTagData.newRecords,
          removeIndexs = _removeTagData.removeIndexs,
          remove = _removeTagData.removeRecords;

      if (newRecords.length == 0 && remove.length == 0) return;
      this.batchUpdateGrid({
        update: newRecords,
        remove: remove
      });
      this.historyStack.push({
        type: _interface.DataActions.removeTag,
        records: hisRecords,
        recordsIndex: removeIndexs
      });
      this.afterTagRemove && this.afterTagRemove({
        removeRecords: remove,
        removeKeys: targetKeys,
        removeNodes: removeNodes
      });
    } //恢复指定删除数据;

  }, {
    key: "redoTagRemove",
    value: function redoTagRemove(targetKeys, deleteChildren) {
      if (typeof targetKeys !== 'number' && (0, _lodash.isEmpty)(targetKeys)) return;
      var getRowNodeId = this.agGridConfig.getRowNodeId;
      if (!Array.isArray(targetKeys) && (0, _typeof2.default)(targetKeys) === 'object') return;
      var targetArray = Array.isArray(targetKeys) ? targetKeys : [targetKeys];
      var removeNodes = (0, _utils.getAllChildrenNode)(targetArray, this.agGridApi, deleteChildren);
      var newData = removeNodes.map(function (itemNode) {
        var itemData = itemNode.data;
        return (0, _lodash.get)(itemData, '_rowData', (0, _lodash.omit)(itemData, '_rowType'));
      });
      this.batchUpdateGrid({
        update: newData
      });
      this.historyStack.push({
        type: _interface.DataActions.modify,
        records: removeNodes.map(function (itemNode) {
          return Object.assign(Object.assign({}, itemNode.data), {
            _rowType: _interface.DataActions.removeTag
          });
        })
      });
    }
  }, {
    key: "toggleUndoRedo",
    value: function toggleUndoRedo(hisStack) {
      var _this7 = this;

      var undo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var getRowNodeId = this.agGridConfig.getRowNodeId;
      var rowData = this.getRowData();
      if (rowData.length == 0) this.agGridApi.setRowData([]);
      var records = hisStack.records,
          recordsIndex = hisStack.recordsIndex,
          type = hisStack.type;

      if (type === _interface.DataActions.remove) {
        recordsIndex.map(function (removeIndex, index) {
          rowData = [].concat((0, _toConsumableArray2.default)(rowData.slice(0, removeIndex)), [records[index]], (0, _toConsumableArray2.default)(rowData.slice(removeIndex)));
        });
        this.agGridApi.setRowData(rowData);
        recordsIndex = [];
        type = _interface.DataActions.add;
      } else if (type === _interface.DataActions.add) {
        recordsIndex = [];
        records.map(function (itemRecord) {
          var removeIndex = (0, _lodash.findIndex)(rowData, function (data) {
            return getRowNodeId(data) === getRowNodeId(itemRecord);
          });
          rowData = [].concat((0, _toConsumableArray2.default)(rowData.slice(0, removeIndex)), (0, _toConsumableArray2.default)(rowData.slice(removeIndex + 1)));
          recordsIndex.unshift(removeIndex);
        });
        records = records.reverse();
        type = _interface.DataActions.remove;
        this.batchUpdateGrid({
          remove: records
        });
      } else if (type === _interface.DataActions.modify) {
        var hisRecords = [];
        console.log('records', records);
        var newRecords = records.map(function (item) {
          var rowNode = _this7.agGridApi.getRowNode(getRowNodeId(item));

          var _nextRowData = item._nextRowData,
              data = __rest(item, ["_nextRowData"]);

          hisRecords.push(Object.assign({}, (0, _lodash.get)(rowNode, 'data', {})));
          return item;
        });
        records = hisRecords;
        this.batchUpdateGrid({
          update: newRecords
        });
      } else {
        var _hisRecords = [];
        recordsIndex.map(function (removeIndex, index) {
          var item = records[index];

          if (item._rowType === _interface.DataActions.add) {
            if (undo) {
              rowData = [].concat((0, _toConsumableArray2.default)(rowData.slice(0, removeIndex)), [item], (0, _toConsumableArray2.default)(rowData.slice(removeIndex)));
            } else {
              rowData = [].concat((0, _toConsumableArray2.default)(rowData.slice(0, removeIndex)), (0, _toConsumableArray2.default)(rowData.slice(removeIndex + 1)));
            }

            _hisRecords.push(item);
          } else {
            rowData = [].concat((0, _toConsumableArray2.default)(rowData.slice(0, removeIndex)), [item], (0, _toConsumableArray2.default)(rowData.slice(removeIndex + 1)));

            var rowNode = _this7.agGridApi.getRowNode(getRowNodeId(item));

            _hisRecords.push(Object.assign({}, (0, _lodash.get)(rowNode, 'data', {})));
          }
        });
        records = _hisRecords.reverse();
        recordsIndex = recordsIndex.reverse();
        this.agGridApi.setRowData(rowData);
      }

      return {
        type: type,
        records: records,
        recordsIndex: recordsIndex
      };
    } //撤销；

  }, {
    key: "undo",
    value: function undo() {
      var hisStack = this.historyStack.pop();
      if ((0, _lodash.isEmpty)(hisStack)) return;
      var newhisStack = this.toggleUndoRedo(hisStack, true);
      this.redoStack.push(newhisStack);
      this.afterUndo && this.afterUndo(hisStack);
    }
  }, {
    key: "redo",
    value: function redo() {
      var hisStack = this.redoStack.pop();
      if ((0, _lodash.isEmpty)(hisStack)) return;
      var newhisStack = this.toggleUndoRedo(hisStack, false);
      this.historyStack.push(newhisStack);
      this.afterRedo && this.afterRedo(hisStack);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var dataSource = this.agGridConfig.dataSource;
      this.agGridApi.setRowData(dataSource);
      this.reset(this.agGridConfig);
      this.afterCancel && this.afterCancel(this.agGridConfig.dataSource);
    }
  }, {
    key: "save",
    value: function save(cb) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var cansave, data;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                cansave = null;

                if (!cb) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 4;
                return cb();

              case 4:
                cansave = _context5.sent;
                this.afterSave && this.afterSave({
                  diff: this.diff
                });

                if (cansave) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return");

              case 8:
                data = Array.isArray(cansave) ? cansave : this.getPureData();
                this.agGridApi.setRowData(data);
                this.reset({
                  dataSource: data
                });

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    } //

  }, {
    key: "changeDiff",
    value: function changeDiff() {
      var _this8 = this;

      var getRowNodeId = this.agGridConfig.getRowNodeId;
      var diffRecords = [];
      var diffArray = [];
      var defaultDiff = {
        add: [],
        modify: [],
        remove: []
      };
      if (!this.agGridApi) return defaultDiff;
      var nowHistoryStack = (0, _lodash.cloneDeep)(this.historyStack);
      nowHistoryStack.reverse().map(function (hisItem) {
        var type = hisItem.type,
            recordsIndex = hisItem.recordsIndex,
            records = hisItem.records;
        records.map(function (recordItem, recordItemIndex) {
          var isRecorded = diffRecords.indexOf(getRowNodeId(recordItem)) >= 0;
          if (isRecorded) return;

          var rowNode = _this8.agGridApi.getRowNode(getRowNodeId(recordItem));

          var _nextRowData = (0, _lodash.get)(rowNode, 'data', recordItem);

          var _rowData = _nextRowData._rowData,
              _rowType = _nextRowData._rowType,
              _rowError = _nextRowData._rowError,
              undefined = _nextRowData.undefined,
              data = __rest(_nextRowData, ["_rowData", "_rowType", "_rowError", "undefined"]);

          _rowData = (0, _lodash.isEmpty)(_rowData) ? data : _rowData;
          diffRecords.push(getRowNodeId(_nextRowData));

          switch (type) {
            case _interface.DataActions.add:
              return diffArray.push(Object.assign(Object.assign({}, data), {
                actionType: _interface.DataActions.add
              }));

            case _interface.DataActions.modify:
              if (!(0, _utils.isEqualObj)(_rowData, data) && _rowType !== _interface.DataActions.add) {
                diffArray.push(Object.assign(Object.assign({}, data), {
                  actionType: _interface.DataActions.modify
                }));
              } else if (_rowType === _interface.DataActions.add) {
                diffArray.push(Object.assign(Object.assign({}, data), {
                  actionType: _interface.DataActions.add
                }));
              }

              return;

            default:
              if (_rowType !== _interface.DataActions.add) {
                diffArray.push(Object.assign(Object.assign({}, _rowData), {
                  actionType: _interface.DataActions.remove
                }));
              }

              return;
          }
        });
      });
      this.agGridApi.forEachNode(function (node, index) {
        var diffIndex = (0, _lodash.findIndex)(diffArray, function (item) {
          return getRowNodeId(item) === getRowNodeId((0, _lodash.get)(node, 'data', {}));
        });

        if (diffIndex >= 0) {
          diffArray[diffIndex] = Object.assign(Object.assign({}, diffArray[diffIndex]), {
            dataNumber: index
          });
        }
      });
      var diff = (0, _lodash.groupBy)(diffArray, 'actionType');
      return (0, _lodash.isEmpty)(diff) ? defaultDiff : Object.assign(Object.assign({}, defaultDiff), diff);
    }
  }, {
    key: "getPureData",
    value: function getPureData() {
      var data = [];
      if (!this.agGridApi) return data;
      this.agGridApi.forEachNode(function (node, index) {
        var cloneData = (0, _lodash.cloneDeep)((0, _lodash.get)(node, 'data', {}));

        if (!(0, _lodash.isEmpty)(cloneData)) {
          var _rowType = cloneData._rowType,
              _rowData = cloneData._rowData,
              _rowCut = cloneData._rowCut,
              _rowError = cloneData._rowError,
              itemData = __rest(cloneData, ["_rowType", "_rowData", "_rowCut", "_rowError"]);

          if (_rowType !== _interface.DataActions.removeTag) data.push(Object.assign(Object.assign({}, itemData), {
            dataNumber: index
          }));
        }
      });
      return data;
    } //批量更新数据 返回更新后的gird数据

  }, {
    key: "batchUpdateDataSource",
    value: function batchUpdateDataSource(params) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var isMerge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var notMergeKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var getRowNodeId = this.agGridConfig.getRowNodeId;
      var dataSource = [];
      var add = params.add,
          modify = params.modify,
          remove = params.remove;
      var update = (0, _lodash.uniqBy)([].concat((0, _toConsumableArray2.default)(add), (0, _toConsumableArray2.default)(modify)), 'dataNumber');
      var removeKeys = remove.map(function (item) {
        return getRowNodeId(item);
      });
      var removeNodes = (0, _utils.getAllChildrenNode)(removeKeys, this.agGridApi, false);
      var assignKeys = typeof keys === 'string' ? [keys] : keys;
      var notAssignKeys = Array.isArray(notMergeKeys) ? notMergeKeys : [notMergeKeys];
      this.agGridApi.forEachNode(function (node, index) {
        var removeIndex = (0, _lodash.findIndex)(removeNodes, function (item) {
          return getRowNodeId((0, _lodash.get)(node, 'data')) === getRowNodeId((0, _lodash.get)(item, 'data'));
        });
        if (removeIndex >= 0) return;
        var addIndex = (0, _lodash.findIndex)(add, function (item) {
          return item.dataNumber === index;
        });
        var updateIndex = (0, _lodash.findIndex)(update, function (item) {
          return item.dataNumber === index;
        });

        var _a = (0, _lodash.get)(node, 'data', {}),
            _rowType = _a._rowType,
            _rowData = _a._rowData,
            _rowCut = _a._rowCut,
            _rowError = _a._rowError,
            treeDataPath = _a.treeDataPath,
            data = __rest(_a, ["_rowType", "_rowData", "_rowCut", "_rowError", "treeDataPath"]);

        var mergeData = {};
        assignKeys.map(function (item) {
          (0, _lodash.set)(mergeData, item, (0, _lodash.get)(data, item));
        });

        if (updateIndex >= 0) {
          if (addIndex > -1) return dataSource.push((0, _lodash.merge)(add[addIndex], mergeData));
          notAssignKeys.map(function (key) {
            (0, _lodash.set)(mergeData, key, (0, _lodash.get)(update, "[".concat(updateIndex, "].").concat(key)));
          });
          var updateItem = isMerge ? (0, _lodash.merge)(data, update[updateIndex], mergeData) : (0, _lodash.merge)(update[updateIndex], mergeData);
          return dataSource.push(updateItem);
        }

        dataSource.push(data);
      });
      return dataSource;
    } // LocalStorage columns

  }, {
    key: "getLocalStorageColumns",
    value: function getLocalStorageColumns(columns, gridKey) {
      var localColumnsJson = localStorage.getItem("gantd-grid-column-".concat(gridKey));
      this.gridKey = gridKey;
      this.columnsDefs = columns;
      if (!localColumnsJson || !gridKey) return columns;

      try {
        var localColumns = JSON.parse(localColumnsJson);
        return (0, _utils.sortAndMergeColumns)(columns, localColumns);
      } catch (err) {
        console.error(err);
        return columns;
      }
    }
  }, {
    key: "setLocalStorageColumnsState",
    value: function setLocalStorageColumnsState() {
      if (!this.gridKey || !this.agGridColumnApi || this.clearloding) return;

      try {
        var columns = this.agGridColumnApi.getColumnState();
        var localColumnsJson = JSON.stringify(columns);
        localStorage.setItem("gantd-grid-column-".concat(this.gridKey), localColumnsJson);
      } catch (error) {}
    }
  }, {
    key: "clearLocalStorageColumns",
    value: function clearLocalStorageColumns() {
      var _this9 = this;

      this.clearloding = true;
      localStorage.removeItem("gantd-grid-column-".concat(this.gridKey));
      this.agGridApi.setColumnDefs(this.columnsDefs);
      this.agGridColumnApi.resetColumnState();
      setTimeout(function () {
        _this9.clearloding = false;
      }, 10);
    }
  }]);
  return GridManage;
}();

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "reset", null);

__decorate([(0, _decorator.modifyDecorator)(), (0, _decorator.hisDecorator)()], GridManage.prototype, "modify", null);

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "create", null);

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "remove", null);

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "tagRemove", null);

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "redoTagRemove", null);

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "undo", null);

__decorate([(0, _decorator.hisDecorator)()], GridManage.prototype, "redo", null);

GridManage = __decorate([(0, _lodashDecorators.bindAll)()], GridManage);
var _default = GridManage;
exports.default = _default;