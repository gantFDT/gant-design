"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProps = exports.default = void 0;
require("antd/es/button/style/css");
var _button = _interopRequireDefault(require("antd/es/button"));
require("antd/es/tooltip/style/css");
var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _lodash = require("lodash");
var _grid = _interopRequireDefault(require("../grid"));
var _config = _interopRequireDefault(require("./config"));
var _formatschema = _interopRequireWildcard(require("./formatschema"));
var _viewpicker = _interopRequireDefault(require("./viewpicker"));
var _hooks = require("./hooks");
var _keyevent = _interopRequireDefault(require("../keyevent"));
var _header = _interopRequireDefault(require("../header"));
var _util = require("../util");
var _Receiver = _interopRequireDefault(require("./locale/Receiver"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var viewVersionFormat = 'YYYY-MM-DD HH:mm:SSSS';
var GlobalProps = {};
var setProps = exports.setProps = function setProps(extraProps) {
  Object.assign(GlobalProps, extraProps);
};
var GetLocale = function GetLocale(_ref) {
  var setLocale = _ref.setLocale;
  return _react.default.createElement(_Receiver.default, null, function (locale) {
    setLocale(locale);
    return null;
  });
};
function SmartGrid(smartGridProps) {
  var globalConfig = (0, _utils.getGlobalConfig)();
  var props = Object.assign(Object.assign({}, globalConfig), smartGridProps);
  var _a = Object.assign({}, GlobalProps, props),
    originGridKey = _a.gridKey,
    title = _a.title,
    schema = _a.schema,
    viewSchema = _a.viewSchema,
    bindKeys = _a.bindKeys,
    headerRight = _a.headerRight,
    onReload = _a.onReload,
    dataSource = _a.dataSource,
    _a$withoutAnimation = _a.withoutAnimation,
    withoutAnimation = _a$withoutAnimation === void 0 ? false : _a$withoutAnimation,
    _a$headerProps = _a.headerProps,
    headerProps = _a$headerProps === void 0 ? {} : _a$headerProps,
    onViewChange = _a.onViewChange,
    customViewsProp = _a.customViews,
    companyViewsProp = _a.companyViews,
    lastViewKeyProp = _a.lastViewKey,
    onCustomViewsChange = _a.onCustomViewsChange,
    onCompanyViewsChange = _a.onCompanyViewsChange,
    companyViewAuth = _a.companyViewAuth,
    userId = _a.userId,
    getCustomViews = _a.getCustomViews,
    getCompanyViews = _a.getCompanyViews,
    setCustomViewsProp = _a.setCustomViews,
    setCompanyViewsProp = _a.setCompanyViews,
    initView = _a.initView,
    _a$showDisplayConfig = _a.showDisplayConfig,
    showDisplayConfig = _a$showDisplayConfig === void 0 ? false : _a$showDisplayConfig,
    customizePrefixCls = _a.prefixCls,
    height = _a.height,
    style = _a.style,
    _a$hideHeader = _a.hideHeader,
    hideHeader = _a$hideHeader === void 0 ? false : _a$hideHeader,
    onReady = _a.onReady,
    _a$rowkey = _a.rowkey,
    rowkey = _a$rowkey === void 0 ? 'key' : _a$rowkey,
    _a$headerHeight = _a.headerHeight,
    headerHeight = _a$headerHeight === void 0 ? 30 : _a$headerHeight,
    smartGridViewName = _a.smartGridViewName,
    restProps = __rest(_a, ["gridKey", "title", "schema", "viewSchema", "bindKeys", "headerRight", "onReload", "dataSource", "withoutAnimation", "headerProps", "onViewChange", "customViews", "companyViews", "lastViewKey", "onCustomViewsChange", "onCompanyViewsChange", "companyViewAuth", "userId", "getCustomViews", "getCompanyViews", "setCustomViews", "setCompanyViews", "initView", "showDisplayConfig", "prefixCls", "height", "style", "hideHeader", "onReady", "rowkey", "headerHeight", "smartGridViewName"]);
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    locale = _useState2[0],
    setLocale = _useState2[1];
  var _useMemo = (0, _react.useMemo)(function () {
      return (0, _formatschema.default)(schema, originGridKey, locale, smartGridViewName);
    }, [schema, locale]),
    columns = _useMemo.columns,
    systemViews = _useMemo.systemViews;
  var _systemViews = (0, _slicedToArray2.default)(systemViews, 1),
    baseView = _systemViews[0];
  var _useState3 = (0, _react.useState)(originGridKey),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    gridKey = _useState4[0],
    setGridKey = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    configModalVisible = _useState6[0],
    setConfigModalVisible = _useState6[1];
  var _useState7 = (0, _react.useState)(baseView),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    activeView = _useState8[0],
    setActiveView = _useState8[1];
  var panelConfig = activeView.panelConfig;
  var _useLocalStorage = (0, _hooks.useLocalStorage)("grid-last-view-key:".concat(originGridKey, ":").concat(userId), ''),
    _useLocalStorage2 = (0, _slicedToArray2.default)(_useLocalStorage, 2),
    lastViewKey = _useLocalStorage2[0],
    setLastViewKey = _useLocalStorage2[1];
  var _useLocalStorage3 = (0, _hooks.useLocalStorage)("grid-custom-views:".concat(originGridKey, ":").concat(userId), []),
    _useLocalStorage4 = (0, _slicedToArray2.default)(_useLocalStorage3, 2),
    customViews = _useLocalStorage4[0],
    setCustomViews = _useLocalStorage4[1];
  var _useLocalStorage5 = (0, _hooks.useLocalStorage)("grid-company-views:".concat(originGridKey), []),
    _useLocalStorage6 = (0, _slicedToArray2.default)(_useLocalStorage5, 2),
    companyViews = _useLocalStorage6[0],
    setCompanyViews = _useLocalStorage6[1];
  var apiRef = (0, _react.useRef)(null);
  var managerRef = (0, _react.useRef)(null);
  //Grid渲染完成之后的回调方法
  var handleReady = (0, _react.useCallback)(function (params, manager) {
    apiRef.current = params;
    managerRef.current = manager;
    onReady && onReady(params, manager);
  }, [onReady]);
  (0, _react.useEffect)(function () {
    customViewsProp && setCustomViews(customViewsProp);
  }, [customViewsProp]);
  (0, _react.useEffect)(function () {
    companyViewsProp && setCompanyViews(companyViewsProp);
  }, [companyViewsProp]);
  var originCustomViewsRef = (0, _react.useRef)(null);
  var originCompanyViewsRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (getCustomViews) {
      getCustomViews("grid-custom-views:".concat(originGridKey, ":").concat(userId)).then(function (views) {
        originCustomViewsRef.current = (0, _util.deepCopy4JSON)(views);
        setCustomViews(views);
      });
    }
  }, [originGridKey, getCustomViews]);
  (0, _react.useEffect)(function () {
    if (getCompanyViews) {
      getCompanyViews("grid-company-views:".concat(originGridKey)).then(function (views) {
        originCompanyViewsRef.current = (0, _util.deepCopy4JSON)(views);
        setCompanyViews(views);
      });
    }
  }, [originGridKey, getCompanyViews]);
  /** 直接设置视图配置 */
  (0, _react.useEffect)(function () {
    if (viewSchema) {
      setActiveView(Object.assign(Object.assign({}, activeView), viewSchema));
    }
  }, [viewSchema]);
  /** 切换初始视图 */
  (0, _react.useEffect)(function () {
    var usedView;
    var _systemViews2 = (0, _slicedToArray2.default)(systemViews, 1),
      baseView = _systemViews2[0];
    var viewKey = lastViewKeyProp || lastViewKey;
    if (!originGridKey) {
      usedView = initView;
    } else {
      usedView = initView || [].concat((0, _toConsumableArray2.default)(systemViews), (0, _toConsumableArray2.default)(companyViews), (0, _toConsumableArray2.default)(customViews)).find(function (sV) {
        return sV.viewId === viewKey;
      });
    }
    if (!usedView) {
      usedView = baseView;
    }
    setActiveView((0, _lodash.cloneDeep)(usedView));
    if (viewKey !== usedView.viewId) setLastViewKey(usedView.viewId);
    // onViewChange && onViewChange(usedView); 接口自定义视图，customViewsProp属性冲突
  }, [systemViews, customViews, companyViews, lastViewKey, lastViewKeyProp]);
  /** 手动切换视图 */
  var handlerChangeView = (0, _react.useCallback)(function (view) {
    if (view.viewId === lastViewKey) return;
    managerRef.current && managerRef.current.clearLocalStorageColumns();
    onViewChange && onViewChange(view);
    setLastViewKey(view.viewId);
  }, [originGridKey, lastViewKey, onViewChange]);
  /** 保存自定义、共享视图 */
  var handlerSaveViews = (0, _react.useCallback)(function (params) {
    var views = params.views,
      operateView = params.operateView,
      hideModal = params.hideModal;
    if (operateView.viewId.startsWith('company')) {
      onCompanyViewsChange && onCompanyViewsChange(views);
      setCompanyViewsProp && setCompanyViewsProp("grid-company-views:".concat(originGridKey), views);
      setCompanyViews(views);
    } else {
      onCustomViewsChange && onCustomViewsChange(views);
      setCustomViewsProp && setCustomViewsProp("grid-custom-views:".concat(originGridKey, ":").concat(userId), views);
      setCustomViews(views);
    }
    hideModal && hideModal();
  }, []);
  /** 修改视图 */
  var handlerSaveConfig = (0, _react.useCallback)(function (config) {
    var newView = Object.assign({}, config);
    newView.version = (0, _moment.default)().format(viewVersionFormat);
    setLastViewKey(newView.viewId);
    var viewList = newView.viewId.startsWith('company') ? companyViews : customViews;
    var curViewIndex = viewList.findIndex(function (cV) {
      return cV.viewId === newView.viewId;
    });
    if (~curViewIndex) {
      viewList[curViewIndex] = newView;
    }
    handlerSaveViews({
      operateView: newView,
      type: 'edit',
      views: (0, _toConsumableArray2.default)(viewList)
    });
    setConfigModalVisible(false);
  }, [customViews, companyViews]);
  /** 另存视图 */
  var onViewSaveAs = (0, _react.useCallback)(function (vals, hideModal) {
    var type = vals.type,
      name = vals.name,
      panelConfig = vals.panelConfig;
    var newView = {
      viewId: "".concat(type, "-").concat(userId, "-").concat((0, _util.generateUuid)(8)),
      name: name,
      version: (0, _moment.default)().format(viewVersionFormat),
      panelConfig: panelConfig
    };
    var oldViews = type === 'company' ? companyViews : customViews;
    handlerSaveViews({
      operateView: newView,
      type: 'add',
      views: [].concat((0, _toConsumableArray2.default)(oldViews), [newView])
    });
    setLastViewKey(newView.viewId);
    hideModal && hideModal();
    setConfigModalVisible(false);
  }, [customViews, companyViews, userId]);
  var handleSync = (0, _react.useCallback)((0, _lodash.debounce)(function () {
    var columnFieldsMap = {};
    var mapFieldsToObj = function mapFieldsToObj(fields, parentId) {
      fields.forEach(function (field) {
        if (field.children) {
          mapFieldsToObj(field.children, field.fieldName);
          delete field.children;
          columnFieldsMap[field.fieldName] = field;
        } else {
          field.parentColId = parentId;
          columnFieldsMap[field.fieldName] = field;
        }
      });
    };
    mapFieldsToObj(activeView.panelConfig.columnFields);
    var columnDefs = managerRef.current.agGridColumnApi.getColumnState().filter(function (def) {
      return def.colId !== 'defalutSelection' && def.colId !== 'g-index';
    });
    columnDefs.sort(function (prev, next) {
      if (prev.pinned === 'left' && next.pinned !== 'left' || prev.pinned !== 'right' && next.pinned === 'right') {
        return -1;
      }
    });
    var columnFields = [];
    columnDefs.forEach(function (colDef) {
      var _a;
      var parentColId = (_a = columnFieldsMap[colDef.colId]) === null || _a === void 0 ? void 0 : _a.parentColId;
      var cf = Object.assign({}, columnFieldsMap[colDef.colId], {
        fixed: colDef.pinned,
        sort: colDef.sort,
        sortIndex: colDef.sortIndex,
        hide: colDef.hide,
        width: colDef.width
      });
      if (parentColId) {
        var groupField = columnFields.find(function (field) {
          return field.fieldName === parentColId;
        });
        if (groupField) {
          groupField.children.push(cf);
        } else {
          columnFieldsMap[parentColId].children = [cf];
          columnFields.push(columnFieldsMap[parentColId]);
        }
      } else {
        columnFields.push(cf);
      }
    });
    activeView.panelConfig.columnFields = columnFields;
    handlerSaveConfig(activeView);
  }, 250), [activeView]);
  var _useMemo2 = (0, _react.useMemo)(function () {
      return (0, _hooks.useTableConfig)({
        tableConfig: panelConfig,
        columns: columns,
        tableKey: originGridKey
      });
    }, [originGridKey, panelConfig, columns]),
    _useMemo3 = (0, _slicedToArray2.default)(_useMemo2, 1),
    finalColumns = _useMemo3[0];
  // 动态列修改用户自定义视图
  (0, _react.useEffect)(function () {
    setCustomViews(function (_customViews) {
      var _iterator = _createForOfIteratorHelper(_customViews),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _customView = _step.value;
          var __columnFields = _customView.panelConfig.columnFields;
          _customView.panelConfig.columnFields = (0, _formatschema.formatColumnFields)(__columnFields, columns);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (setCustomViewsProp && originCustomViewsRef.current && !(0, _util.JSONisEqual)(originCustomViewsRef.current, _customViews)) {
        setCustomViewsProp("grid-custom-views:".concat(originGridKey, ":").concat(userId), _customViews);
      }
      return (0, _toConsumableArray2.default)(_customViews);
    });
    setCompanyViews(function (_companyViews) {
      var _iterator2 = _createForOfIteratorHelper(_companyViews),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _companyView = _step2.value;
          var __columnFields = _companyView.panelConfig.columnFields;
          _companyView.panelConfig.columnFields = (0, _formatschema.formatColumnFields)(__columnFields, columns);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (setCompanyViewsProp && originCompanyViewsRef.current && !(0, _util.JSONisEqual)(originCompanyViewsRef.current, _companyViews)) {
        setCompanyViewsProp("grid-company-views:".concat(originGridKey), _companyViews);
      }
      return (0, _toConsumableArray2.default)(_companyViews);
    });
  }, [columns, originGridKey, setCustomViewsProp, setCompanyViewsProp]);
  (0, _react.useEffect)(function () {
    setGridKey('gridKey:' + originGridKey + ':' + activeView.viewId + ':' + activeView.version);
  }, [finalColumns, originGridKey, activeView]);
  var titleRef = (0, _react.useRef)(null);
  var TableTitle = (0, _react.useMemo)(function () {
    return _react.default.createElement(_Receiver.default, null, function (locale) {
      return _react.default.createElement(_viewpicker.default, {
        viewName: activeView.name,
        viewId: activeView.viewId,
        userId: userId,
        customViews: customViews,
        companyViews: companyViews,
        systemViews: systemViews,
        switchActiveView: handlerChangeView,
        updateView: handlerSaveViews,
        withoutAnimation: withoutAnimation,
        splitLine: !!title,
        config: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_tooltip.default, {
          title: locale.sync
        }, _react.default.createElement(_button.default, {
          size: "small",
          icon: "sync",
          style: {
            marginRight: 5
          },
          onClick: handleSync,
          disabled: activeView.viewId.startsWith('system')
        })), _react.default.createElement(_tooltip.default, {
          title: locale.config
        }, _react.default.createElement(_button.default, {
          size: "small",
          icon: "setting",
          style: {
            marginRight: 0
          },
          onClick: setConfigModalVisible.bind(null, true)
        }))),
        getPopupContainer: function getPopupContainer() {
          return titleRef.current || document.body;
        }
      });
    });
  }, [activeView, customViews, companyViews, systemViews, titleRef, title, userId]);
  var HeaderRightElem = (0, _react.useMemo)(function () {
    return _react.default.createElement(_react.default.Fragment, null, headerRight, onReload && _react.default.createElement(_Receiver.default, null, function (locale) {
      return _react.default.createElement(_tooltip.default, {
        title: locale.reload
      }, _react.default.createElement(_button.default, {
        size: "small",
        icon: "reload",
        className: "",
        onClick: function onClick() {
          return onReload();
        }
      }));
    }));
  }, [headerRight, onReload]);
  var gridHeight = (0, _react.useMemo)(function () {
    if (!height) return;
    if (hideHeader) return height;
    return typeof height !== 'number' ? "calc(".concat(height, " - ").concat(headerHeight, "px)") : height - headerHeight;
  }, [height, hideHeader, headerHeight]);
  return _react.default.createElement("div", {
    className: "gant-smart-table-wrapper",
    style: Object.assign(Object.assign({}, style), {
      height: height
    })
  }, _react.default.createElement(GetLocale, {
    setLocale: setLocale
  }), !hideHeader && _react.default.createElement(_header.default, Object.assign({
    title: _react.default.createElement("div", {
      ref: titleRef
    }, title, TableTitle),
    extra: HeaderRightElem
  }, headerProps)), (0, _keyevent.default)(bindKeys, true)(_react.default.createElement(_grid.default, Object.assign({
    rowkey: rowkey,
    dataSource: dataSource,
    columns: finalColumns,
    height: gridHeight,
    onReady: handleReady,
    key: originGridKey ? gridKey : undefined
  }, restProps))), _react.default.createElement(_config.default, {
    visible: configModalVisible,
    originColumns: columns,
    withoutAnimation: withoutAnimation,
    userId: userId,
    companyViewAuth: companyViewAuth,
    showDisplayConfig: showDisplayConfig,
    dataSource: activeView,
    gridKey: originGridKey,
    customViews: customViews,
    companyViews: companyViews,
    systemViews: systemViews,
    onSaveViews: handlerSaveViews,
    onSaveAs: onViewSaveAs,
    onOk: handlerSaveConfig,
    onCancel: function onCancel() {
      return setConfigModalVisible(false);
    },
    onViewChange: onViewChange
  }));
}
var SmartGridFn = SmartGrid;
var _default = exports.default = SmartGridFn;