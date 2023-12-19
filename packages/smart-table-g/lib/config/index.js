"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/notification/style/css");

var _notification2 = _interopRequireDefault(require("antd/es/notification"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _modal = _interopRequireDefault(require("modal-g"));

var _util = require("util-g");

var _viewpicker = _interopRequireDefault(require("../viewpicker"));

var _SaveAsModal = _interopRequireDefault(require("./SaveAsModal"));

var _UIContent = _interopRequireDefault(require("./UIContent"));

var _Receiver = _interopRequireDefault(require("../locale/Receiver"));

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

function ConfigModal(props) {
  var visible = props.visible,
      originColumns = props.originColumns,
      dataSource = props.dataSource,
      tableKey = props.tableKey,
      views = props.views,
      onSaveViews = props.onSaveViews,
      onSaveAs = props.onSaveAs,
      onOk = props.onOk,
      onCancel = props.onCancel,
      onViewChange = props.onViewChange,
      withoutAnimation = props.withoutAnimation,
      restProps = __rest(props, ["visible", "originColumns", "dataSource", "tableKey", "views", "onSaveViews", "onSaveAs", "onOk", "onCancel", "onViewChange", "withoutAnimation"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      titleModalVisible = _useState2[0],
      setTitleModalVisible = _useState2[1];

  var _useState3 = (0, _react.useState)((0, _util.deepCopy4JSON)(dataSource)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      fakeView = _useState4[0],
      setFakeView = _useState4[1];

  var panelConfig = fakeView.panelConfig;
  (0, _react.useEffect)(function () {
    var view = (0, _util.deepCopy4JSON)(dataSource);
    visible && setFakeView(view);
    onViewChange && onViewChange(view.panelConfig);
  }, [dataSource, visible]);
  var handlerClose = (0, _react.useCallback)(function () {
    onCancel && onCancel();
  }, []);
  var handlerSave = (0, _react.useCallback)(function () {
    if (!panelConfig.columnFields.filter(function (record) {
      return record.checked;
    }).length) return _notification2.default.info({
      message: /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.saveMessage);
      })
    });
    onOk && onOk(fakeView);
  }, [fakeView]);
  var handlerChooseView = (0, _react.useCallback)(function (view) {
    var _view = (0, _util.deepCopy4JSON)(view);

    setFakeView(_view);
    onViewChange && onViewChange(_view.panelConfig);
  }, []);
  var isSystem = (0, _react.useMemo)(function () {
    return fakeView.viewId && fakeView.viewId.includes('sys');
  }, [fakeView]);
  var handleSaveAs = (0, _react.useCallback)(function (values) {
    var cb = function cb() {
      setTitleModalVisible(false);
    };

    onSaveAs && onSaveAs(Object.assign({
      panelConfig: Object.assign({}, fakeView.panelConfig)
    }, values), cb);
  }, [fakeView, onSaveAs]);
  var handlerChangeConfig = (0, _react.useCallback)(function (config) {
    setFakeView(Object.assign(Object.assign({}, fakeView), {
      panelConfig: config
    }));
    onViewChange && onViewChange(config);
  }, [fakeView]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_modal.default, Object.assign({
    transitionName: withoutAnimation ? "" : undefined,
    maskTransitionName: withoutAnimation ? "" : undefined,
    title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "setting"
    }), /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
      return /*#__PURE__*/_react.default.createElement("span", {
        style: {
          margin: '0 8px'
        }
      }, locale.config);
    }), /*#__PURE__*/_react.default.createElement(_viewpicker.default, {
      viewName: fakeView.name,
      withoutAnimation: withoutAnimation,
      viewId: fakeView.viewId,
      customViews: views.customViews,
      systemViews: views.systemViews,
      switchActiveView: handlerChooseView,
      updateView: onSaveViews
    })),
    visible: visible,
    onCancel: handlerClose,
    destroyOnClose: true,
    isModalDialog: true,
    footer: /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_button.default, {
        size: "small",
        icon: "close-circle",
        onClick: handlerClose
      }, locale.cancel), /*#__PURE__*/_react.default.createElement(_button.default, {
        size: "small",
        icon: "diff",
        onClick: function onClick() {
          setTitleModalVisible(true);
        }
      }, locale.saveAs), /*#__PURE__*/_react.default.createElement(_button.default, {
        size: "small",
        type: "primary",
        icon: "save",
        onClick: handlerSave,
        disabled: isSystem
      }, locale.save));
    })
  }, restProps), /*#__PURE__*/_react.default.createElement(_UIContent.default, {
    viewConfig: fakeView.panelConfig,
    onChange: handlerChangeConfig
  })), /*#__PURE__*/_react.default.createElement(_SaveAsModal.default, {
    visible: titleModalVisible,
    onSubmit: handleSaveAs,
    onCancel: function onCancel() {
      setTitleModalVisible(false);
    }
  }));
}

var _default = ConfigModal;
exports.default = _default;