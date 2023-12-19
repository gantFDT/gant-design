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

var _header = _interopRequireDefault(require("header-g"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _Receiver = _interopRequireDefault(require("../locale/Receiver"));

var _EditModal = _interopRequireDefault(require("./EditModal"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      return /*#__PURE__*/_react.default.createElement(_empty.default, {
        image: _empty.default.PRESENTED_IMAGE_SIMPLE,
        description: /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.noView);
        })
      });
    }

    var activeDefaultView = (0, _utils.getActiveDefaultView)({
      systemViews: systemViews,
      companyViews: companyViews,
      customViews: customViews,
      defaultView: defaultView
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        margin: '-10px'
      }
    }, /*#__PURE__*/_react.default.createElement(_spin.default, {
      spinning: currentLoading
    }, /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_header.default, {
        title: locale.view,
        type: "icon",
        bottomLine: true,
        icon: "unordered-list",
        style: {
          padding: '0 5px'
        },
        extra: config
      }), /*#__PURE__*/_react.default.createElement(_Panel.default, {
        title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.sysView),
        views: systemViews,
        viewType: "system",
        switchActiveView: switchActiveViewImpl.bind(null, 'system'),
        updateView: updateView,
        defaultViewId: activeDefaultView.viewId,
        onDefaultViewChange: onDefaultViewChange
      }), companyViews.length > 0 && /*#__PURE__*/_react.default.createElement(_Panel.default, {
        title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.companyView),
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
      }), /*#__PURE__*/_react.default.createElement(_Panel.default, {
        viewId: viewId,
        title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, locale.customView),
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_popover.default, {
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
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('gant-dropbutton', {
      DefaultShow: !config || showPop,
      SplitLine: splitLine
    })
  }, /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, viewName || locale.view, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "down",
      style: {
        marginLeft: '5px'
      }
    }));
  }))), /*#__PURE__*/_react.default.createElement(_EditModal.default, {
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