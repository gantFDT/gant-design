"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = View;
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
require("antd/es/popover/style/css");
var _popover = _interopRequireDefault(require("antd/es/popover"));
require("antd/es/spin/style/css");
var _spin = _interopRequireDefault(require("antd/es/spin"));
require("antd/es/empty/style/css");
var _empty = _interopRequireDefault(require("antd/es/empty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _header = _interopRequireDefault(require("../../header"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireWildcard(require("react"));
var _Receiver = _interopRequireDefault(require("../locale/Receiver"));
var _EditModal = _interopRequireDefault(require("./EditModal"));
var _Panel = _interopRequireDefault(require("./Panel"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * 视图组件
 * @param props
 */
function View(props) {
  var viewId = props.viewId,
    userId = props.userId,
    viewName = props.viewName,
    _props$systemViews = props.systemViews,
    systemViews = _props$systemViews === void 0 ? [] : _props$systemViews,
    _props$companyViews = props.companyViews,
    companyViews = _props$companyViews === void 0 ? [] : _props$companyViews,
    _props$customViews = props.customViews,
    customViews = _props$customViews === void 0 ? [] : _props$customViews,
    switchActiveView = props.switchActiveView,
    updateView = props.updateView,
    renameLoading = props.renameLoading,
    _props$splitLine = props.splitLine,
    splitLine = _props$splitLine === void 0 ? true : _props$splitLine,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    defaultView = props.defaultView,
    onDefaultViewChange = props.onDefaultViewChange,
    config = props.config,
    getPopupContainer = props.getPopupContainer,
    withoutAnimation = props.withoutAnimation;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    showModal = _useState2[0],
    setShowModal = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    editViewName = _useState4[0],
    setEditViewName = _useState4[1];
  var _useState5 = (0, _react.useState)({
      name: ''
    }),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    editView = _useState6[0],
    setEditView = _useState6[1];
  var currentLoading = loading || renameLoading ? true : false;
  var _useState7 = (0, _react.useState)(false),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    showPop = _useState8[0],
    setShowPop = _useState8[1];
  var switchActiveViewImpl = (0, _react.useCallback)(function (viewType, view) {
    view.isSystem = viewType !== 'custom';
    switchActiveView && switchActiveView(view);
    setShowPop(false);
  }, [switchActiveView]);
  var updateEditView = function updateEditView(name) {
    if (editView.name === name) {
      setShowModal(false);
      return;
    }
    var _editView$viewId$spli = editView.viewId.split('-'),
      _editView$viewId$spli2 = (0, _slicedToArray2.default)(_editView$viewId$spli, 2),
      viewType = _editView$viewId$spli2[0],
      _userId = _editView$viewId$spli2[1];
    var newViews = (0, _toConsumableArray2.default)(viewType === 'company' ? companyViews : customViews).map(function (item) {
      return Object.assign(Object.assign({}, item), {
        name: _lodash.default.isEqual(item, editView) ? name : item.name
      });
    });
    editView.name = name;
    updateView && updateView({
      views: newViews,
      type: 'rename',
      operateView: editView,
      hideModal: function hideModal() {
        return setShowModal(false);
      }
    });
  };
  var views = (0, _react.useMemo)(function () {
    if (systemViews.length === 0 && customViews.length === 0) {
      return _react.default.createElement(_empty.default, {
        image: _empty.default.PRESENTED_IMAGE_SIMPLE,
        description: _react.default.createElement(_Receiver.default, null, function (locale) {
          return _react.default.createElement(_react.default.Fragment, null, locale.noView);
        })
      });
    }
    var activeDefaultView = (0, _utils.getActiveDefaultView)({
      systemViews: systemViews,
      companyViews: companyViews,
      customViews: customViews,
      defaultView: defaultView
    });
    return _react.default.createElement("div", {
      style: {
        margin: '-10px'
      }
    }, _react.default.createElement(_spin.default, {
      spinning: currentLoading
    }, _react.default.createElement(_Receiver.default, null, function (locale) {
      return _react.default.createElement("div", null, _react.default.createElement(_header.default, {
        title: locale.view,
        type: "icon",
        bottomLine: true,
        icon: "unordered-list",
        style: {
          padding: '0 5px'
        },
        extra: config
      }), _react.default.createElement(_Panel.default, {
        title: _react.default.createElement(_react.default.Fragment, null, locale.sysView),
        views: systemViews,
        viewType: "system",
        switchActiveView: switchActiveViewImpl.bind(null, 'system'),
        updateView: updateView,
        defaultViewId: activeDefaultView.viewId,
        onDefaultViewChange: onDefaultViewChange
      }), companyViews.length > 0 && _react.default.createElement(_Panel.default, {
        title: _react.default.createElement(_react.default.Fragment, null, locale.companyView),
        views: companyViews,
        viewType: "company",
        userId: userId,
        switchActiveView: switchActiveViewImpl.bind(null, 'company'),
        updateView: updateView,
        setViewName: setEditViewName,
        setShowModal: setShowModal,
        setEditView: setEditView,
        defaultViewId: activeDefaultView.viewId,
        onDefaultViewChange: onDefaultViewChange
      }), _react.default.createElement(_Panel.default, {
        viewId: viewId,
        title: _react.default.createElement(_react.default.Fragment, null, locale.customView),
        views: customViews,
        viewType: "custom",
        switchActiveView: switchActiveViewImpl.bind(null, 'custom'),
        updateView: updateView,
        setViewName: setEditViewName,
        setShowModal: setShowModal,
        setEditView: setEditView,
        defaultViewId: activeDefaultView.viewId,
        onDefaultViewChange: onDefaultViewChange
      }));
    })));
  }, [customViews, companyViews, systemViews, viewId, currentLoading, defaultView, onDefaultViewChange, updateView, switchActiveViewImpl, config]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_popover.default, {
    visible: showPop,
    content: views,
    placement: "bottomLeft",
    trigger: "click",
    transitionName: withoutAnimation ? "" : undefined,
    overlayStyle: {
      zIndex: config ? 11 : 1008
    },
    onVisibleChange: setShowPop,
    getPopupContainer: getPopupContainer
  }, _react.default.createElement("div", {
    className: (0, _classnames.default)('gant-dropbutton', {
      DefaultShow: !config || showPop,
      SplitLine: splitLine
    })
  }, _react.default.createElement(_Receiver.default, null, function (locale) {
    return _react.default.createElement(_react.default.Fragment, null, viewName || locale.view, _react.default.createElement(_icon.default, {
      type: "down",
      style: {
        marginLeft: '5px'
      }
    }));
  }))), _react.default.createElement(_EditModal.default, {
    withoutAnimation: withoutAnimation,
    loading: renameLoading,
    initValue: editViewName,
    showModal: showModal,
    setShowModal: setShowModal,
    onSubmit: updateEditView,
    systemViews: systemViews,
    customViews: customViews
  }));
}