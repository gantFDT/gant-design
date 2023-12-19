"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/spin/style/css");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

var _table = _interopRequireDefault(require("../table"));

var _config = _interopRequireDefault(require("./config"));

var _customexpandicon = _interopRequireDefault(require("./customexpandicon"));

var _formatschema = _interopRequireDefault(require("./formatschema"));

var _viewpicker = _interopRequireDefault(require("./viewpicker"));

var _hooks = require("./hooks");

var _keyevent = _interopRequireDefault(require("../keyevent"));

var _util = require("../util");

var _Receiver = _interopRequireDefault(require("./locale/Receiver"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var defaultChildrenColumnName = 'children';
var defaultRowKey = 'id';
var defaultBodyMinHeight = 600;
var viewVersionFormat = 'YYYY-MM-DD HH:mm:SSSS';

var getPrefixCls = function getPrefixCls(cls, customizePrefixCls) {
  return customizePrefixCls || 'gant' + cls;
};

function SmartTable(props) {
  var searchTableCellResizable = props.searchTableCellResizable,
      tableKey = props.tableKey,
      title = props.title,
      schema = props.schema,
      viewSchema = props.viewSchema,
      bindKeys = props.bindKeys,
      headerRight = props.headerRight,
      onReload = props.onReload,
      _props$childrenColumn = props.childrenColumnName,
      childrenColumnName = _props$childrenColumn === void 0 ? defaultChildrenColumnName : _props$childrenColumn,
      rowSelection = props.rowSelection,
      bodyStyle = props.bodyStyle,
      dataSource = props.dataSource,
      _props$bodyMinHeight = props.bodyMinHeight,
      bodyMinHeight = _props$bodyMinHeight === void 0 ? defaultBodyMinHeight : _props$bodyMinHeight,
      bodyHeight = props.bodyHeight,
      bodyWidth = props.bodyWidth,
      _props$rowKey = props.rowKey,
      rowKey = _props$rowKey === void 0 ? defaultRowKey : _props$rowKey,
      pagination = props.pagination,
      _props$pageIndex = props.pageIndex,
      pageIndex = _props$pageIndex === void 0 ? 1 : _props$pageIndex,
      _props$pageSize = props.pageSize,
      pageSize = _props$pageSize === void 0 ? 50 : _props$pageSize,
      _props$isGantPageMode = props.isGantPageMode,
      isGantPageMode = _props$isGantPageMode === void 0 ? false : _props$isGantPageMode,
      onPageChange = props.onPageChange,
      _props$totalCount = props.totalCount,
      totalCount = _props$totalCount === void 0 ? 0 : _props$totalCount,
      pageSizeOptions = props.pageSizeOptions,
      emptyDescription = props.emptyDescription,
      _props$withoutAnimati = props.withoutAnimation,
      withoutAnimation = _props$withoutAnimati === void 0 ? false : _props$withoutAnimati,
      _props$headerProps = props.headerProps,
      headerProps = _props$headerProps === void 0 ? {} : _props$headerProps,
      hasExport = props.hasExport,
      onViewChange = props.onViewChange,
      customizePrefixCls = props.prefixCls,
      restProps = __rest(props, ["searchTableCellResizable", "tableKey", "title", "schema", "viewSchema", "bindKeys", "headerRight", "onReload", "childrenColumnName", "rowSelection", "bodyStyle", "dataSource", "bodyMinHeight", "bodyHeight", "bodyWidth", "rowKey", "pagination", "pageIndex", "pageSize", "isGantPageMode", "onPageChange", "totalCount", "pageSizeOptions", "emptyDescription", "withoutAnimation", "headerProps", "hasExport", "onViewChange", "prefixCls"]);

  var prefixCls = getPrefixCls('smart-table', customizePrefixCls);

  var _useMemo = (0, _react.useMemo)(function () {
    return (0, _formatschema.default)(schema);
  }, [schema]),
      columns = _useMemo.columns,
      systemViews = _useMemo.systemViews;

  var _systemViews = (0, _slicedToArray2.default)(systemViews, 1),
      baseView = _systemViews[0];

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      configModalVisible = _useState2[0],
      setConfigModalVisible = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      saveLoading = _useState4[0],
      setSaveLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      saveAsLoading = _useState6[0],
      setSaveAsLoading = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      renameLoading = _useState8[0],
      setRenameLoading = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      updateViewLoading = _useState10[0],
      setUpdateViewLoading = _useState10[1];

  var _useState11 = (0, _react.useState)(baseView),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      activeView = _useState12[0],
      setActiveView = _useState12[1];

  var panelConfig = activeView.panelConfig;

  var _useLocalStorage = (0, _hooks.useLocalStorage)("tableKey:".concat(tableKey), {}),
      _useLocalStorage2 = (0, _slicedToArray2.default)(_useLocalStorage, 2),
      defaultView = _useLocalStorage2[0],
      setDefaultView = _useLocalStorage2[1];

  var _useLocalStorage3 = (0, _hooks.useLocalStorage)("tableKey:".concat(tableKey, "-customViews"), []),
      _useLocalStorage4 = (0, _slicedToArray2.default)(_useLocalStorage3, 2),
      customViews = _useLocalStorage4[0],
      setCustomViews = _useLocalStorage4[1];

  var _useState13 = (0, _react.useState)({
    systemViews: systemViews,
    customViews: customViews || []
  }),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      viewList = _useState14[0],
      setViewList = _useState14[1];

  var _useState15 = (0, _react.useState)(true),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      renderable = _useState16[0],
      setRenderable = _useState16[1];

  (0, _react.useEffect)(function () {
    if (baseView) {
      setActiveView(Object.assign(Object.assign({}, activeView), baseView));
    }
  }, [baseView]);
  var handlerChangeView = (0, _react.useCallback)(function (view) {
    setRenderable(false);
    setTimeout(function () {
      setRenderable(true);
    });
    setActiveView(view);
  }, []);
  (0, _react.useEffect)(function () {
    var usedView;
    usedView = [].concat((0, _toConsumableArray2.default)(systemViews), (0, _toConsumableArray2.default)(customViews)).find(function (sV) {
      return sV.viewId === defaultView.viewId;
    });

    if (!usedView) {
      setDefaultView({
        type: 'system',
        viewId: baseView['viewId']
      });
      usedView = baseView;
    }

    setActiveView(usedView);
    onViewChange && onViewChange(usedView.panelConfig);
  }, []);
  (0, _react.useEffect)(function () {
    if (viewSchema) {
      setActiveView(Object.assign(Object.assign({}, activeView), {
        panelConfig: Object.assign(Object.assign({}, activeView.panelConfig), viewSchema)
      }));
    }
  }, [viewSchema]);
  var handlerSaveViews = (0, _react.useCallback)(function (_ref) {
    var views = _ref.views,
        hideModal = _ref.hideModal,
        type = _ref.type;
    var saveLoadngFunc;

    switch (type) {
      case 'save':
        saveLoadngFunc = setSaveLoading;
        break;

      case 'saveAs':
        saveLoadngFunc = setSaveAsLoading;
        break;

      case 'setDefault':
        saveLoadngFunc = setUpdateViewLoading;
        break;

      case 'delete':
        saveLoadngFunc = setUpdateViewLoading;
        break;

      case 'rename':
        saveLoadngFunc = setRenameLoading;
        break;
    }

    saveLoadngFunc && saveLoadngFunc(true);
    setCustomViews(views);
    saveLoadngFunc && saveLoadngFunc(false);
    setViewList(Object.assign(Object.assign({}, viewList), {
      customViews: views
    }));

    if (hideModal) {
      hideModal();
    }
  }, [viewList, tableKey]);
  var handlerSaveConfig = (0, _react.useCallback)(function (config) {
    setActiveView(Object.assign({}, config));
    var curViewIndex;
    curViewIndex = viewList.customViews.findIndex(function (cV) {
      return cV.viewId === config.viewId;
    });

    if (curViewIndex > -1) {
      viewList.customViews[curViewIndex] = config;
    }

    handlerSaveViews({
      views: viewList.customViews
    });
    setConfigModalVisible(false);
  }, [viewList]); // 另存视图

  var onViewSaveAs = (0, _react.useCallback)(function (vals, hideModal) {
    var newCustomViews = [];
    var name = vals.name,
        panelConfig = vals.panelConfig;
    var newView = {
      viewId: (0, _util.generateUuid)(12),
      name: name,
      version: (0, _moment.default)().format(viewVersionFormat),
      panelConfig: panelConfig
    };
    newCustomViews = viewList.customViews.map(function (item) {
      return Object.assign({}, item);
    });
    newCustomViews.push(newView);
    viewList.customViews = newCustomViews;
    handlerSaveViews({
      views: newCustomViews
    });
    setViewList(viewList);
    setActiveView(newView);
    hideModal();
    setConfigModalVisible(false);
  }, [viewList]);
  var isTreeTable = (0, _react.useMemo)(function () {
    return dataSource && dataSource.some(function (data) {
      return data[childrenColumnName];
    });
  }, [dataSource, childrenColumnName]);

  var _useTableConfig = (0, _hooks.useTableConfig)({
    tableConfig: panelConfig,
    rowSelection: rowSelection,
    columns: columns,
    pagination: pagination,
    pageIndex: pageIndex,
    pageSize: pageSize,
    isGantPageMode: isGantPageMode,
    onPageChange: onPageChange,
    totalCount: totalCount,
    pageSizeOptions: pageSizeOptions,
    tableKey: tableKey
  }),
      _useTableConfig2 = (0, _slicedToArray2.default)(_useTableConfig, 3),
      fakeRowSelection = _useTableConfig2[0],
      finalColumns = _useTableConfig2[1],
      fakePagination = _useTableConfig2[2];

  var HeaderRight = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, headerRight, onReload && /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: locale.reload
    }, /*#__PURE__*/_react.default.createElement(_button.default, {
      size: "small",
      icon: "reload",
      className: "",
      onClick: function onClick() {
        return onReload();
      }
    }));
  }));

  var titleRef = (0, _react.useRef)(null);
  var TableTitle = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
      return /*#__PURE__*/_react.default.createElement(_viewpicker.default, {
        viewName: activeView.name,
        viewId: activeView.viewId,
        customViews: viewList.customViews,
        systemViews: viewList.systemViews,
        switchActiveView: handlerChangeView,
        updateView: handlerSaveViews,
        renameLoading: renameLoading,
        loading: updateViewLoading,
        withoutAnimation: withoutAnimation,
        splitLine: !!title,
        defaultView: defaultView,
        onDefaultViewChange: setDefaultView,
        config: /*#__PURE__*/_react.default.createElement(_tooltip.default, {
          title: locale.config
        }, /*#__PURE__*/_react.default.createElement(_button.default, {
          size: "small",
          icon: "setting",
          className: "",
          onClick: function onClick() {
            return setConfigModalVisible(true);
          }
        })),
        getPopupContainer: function getPopupContainer() {
          return titleRef.current || document.body;
        }
      });
    });
  }, [activeView, viewList, renameLoading, updateViewLoading, defaultView, titleRef, title]);
  var tableHeight = (0, _react.useMemo)(function () {
    return (0, _lodash.isEmpty)(dataSource) ? bodyHeight : panelConfig.heightMode === 'auto' ? 'auto' : bodyHeight;
  }, [dataSource, panelConfig.heightMode, bodyHeight]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-smart-table-wrapper"
  }, renderable ? (0, _keyevent.default)(bindKeys, true)( /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_table.default, Object.assign({
      expandIcon: function expandIcon(_prop) {
        return (0, _customexpandicon.default)(_prop, isTreeTable);
      }
    }, restProps, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        ref: titleRef
      }, title, TableTitle),
      headerRight: HeaderRight,
      headerProps: headerProps,
      columns: finalColumns,
      dataSource: dataSource,
      resizable: searchTableCellResizable,
      bordered: panelConfig.bordered,
      wrap: panelConfig.wrap,
      isZebra: panelConfig.isZebra,
      tableKey: "tableKey:".concat(tableKey),
      rowSelection: fakeRowSelection,
      childrenColumnName: childrenColumnName,
      footerDirection: panelConfig.footerDirection,
      bodyStyle: Object.assign(Object.assign({}, bodyStyle), {
        minHeight: panelConfig.heightMode === 'auto' || (0, _lodash.isEmpty)(dataSource) ? undefined : bodyHeight
      }),
      scroll: {
        y: tableHeight === 'auto' ? undefined : tableHeight,
        x: bodyWidth
      },
      rowKey: rowKey,
      pagination: fakePagination,
      emptyDescription: emptyDescription || locale.empty
    }));
  })) : /*#__PURE__*/_react.default.createElement(_spin.default, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: bodyHeight ? typeof bodyHeight === 'string' ? "".concat(bodyHeight.slice(0, -1), " + 29px)") : bodyHeight + 29 : defaultBodyMinHeight
    }
  })), /*#__PURE__*/_react.default.createElement(_config.default, {
    visible: configModalVisible,
    originColumns: columns,
    withoutAnimation: withoutAnimation,
    dataSource: activeView,
    tableKey: tableKey,
    views: viewList,
    onSaveViews: handlerSaveViews,
    onSaveAs: onViewSaveAs,
    onOk: handlerSaveConfig,
    onCancel: function onCancel() {
      return setConfigModalVisible(false);
    },
    onViewChange: onViewChange
  }));
}

var SmartTableFn = SmartTable;
var _default = SmartTableFn;
exports.default = _default;