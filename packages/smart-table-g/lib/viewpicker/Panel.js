"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/popconfirm/style/css");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/tag/style/css");

var _tag = _interopRequireDefault(require("antd/es/tag"));

require("antd/es/empty/style/css");

var _empty = _interopRequireDefault(require("antd/es/empty"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _header = _interopRequireDefault(require("header-g"));

var _Receiver = _interopRequireDefault(require("../locale/Receiver"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(props) {
  var viewId = props.viewId,
      title = props.title,
      views = props.views,
      viewType = props.viewType,
      switchActiveView = props.switchActiveView,
      updateView = props.updateView,
      setShowModal = props.setShowModal,
      setViewName = props.setViewName,
      setEditView = props.setEditView,
      defaultViewId = props.defaultViewId,
      onDefaultViewChange = props.onDefaultViewChange,
      extra = props.extra;
  var onViewChange = (0, _react.useCallback)(function (item) {
    switchActiveView && switchActiveView(item);
  }, [switchActiveView]); // 删除

  var onDelete = (0, _react.useCallback)(function (item, e) {
    e.stopPropagation();
    var newViews = [];
    newViews = views.filter(function (item_) {
      return !_lodash.default.isEqual(item, item_);
    });
    var res = {
      views: newViews,
      type: 'delete',
      operateView: item
    };
    updateView && updateView(res);
  }, [views, updateView]); // 重命名

  var onEditView = (0, _react.useCallback)(function (item, e) {
    e.stopPropagation();
    setViewName && setViewName(item.name);
    setShowModal && setShowModal(true);
    setEditView && setEditView(item);
  }, []); // 设置默认

  var onSetDefault = function onSetDefault(type, viewId) {
    onDefaultViewChange && onDefaultViewChange({
      type: type,
      viewId: viewId
    });
  };

  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "gant-smart-table-viewpicker-panel"
    }, /*#__PURE__*/_react.default.createElement(_header.default, {
      title: title,
      extra: extra
    }), /*#__PURE__*/_react.default.createElement("ul", {
      className: "content"
    }, views.length === 0 && /*#__PURE__*/_react.default.createElement(_empty.default, {
      image: _empty.default.PRESENTED_IMAGE_SIMPLE,
      description: locale.noView
    }), views.map(function (item) {
      var id = item.viewId,
          name = item.name;
      return /*#__PURE__*/_react.default.createElement("li", {
        key: name
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "leftContent",
        onClick: onViewChange.bind(null, item)
      }, /*#__PURE__*/_react.default.createElement("span", null, name), id === defaultViewId && /*#__PURE__*/_react.default.createElement(_tag.default, {
        className: "tag"
      }, "\xA0", locale.default)), /*#__PURE__*/_react.default.createElement("div", {
        className: "operates"
      }, id !== defaultViewId && /*#__PURE__*/_react.default.createElement("span", {
        className: "operate",
        onClick: onSetDefault.bind(null, viewType, id)
      }, locale.setDefault), viewType === 'custom' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: locale.rename
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        className: "operate",
        type: "edit",
        onClick: onEditView.bind(null, item)
      })), viewId !== id && /*#__PURE__*/_react.default.createElement(_popconfirm.default, {
        placement: "topRight",
        title: locale.confirmDelView,
        onConfirm: onDelete.bind(null, item),
        okText: locale.ok,
        cancelText: locale.cancel
      }, /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: locale.delete
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        className: "operate delete",
        type: "delete"
      }))))));
    })));
  });
};

exports.default = _default;