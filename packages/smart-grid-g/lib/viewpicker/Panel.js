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
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
require("antd/es/empty/style/css");
var _empty = _interopRequireDefault(require("antd/es/empty"));
var _header = _interopRequireDefault(require("header-g"));
var _lodash = _interopRequireDefault(require("lodash"));
var _react = _interopRequireWildcard(require("react"));
var _Receiver = _interopRequireDefault(require("../locale/Receiver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = exports.default = function _default(props) {
  var viewId = props.viewId,
    userId = props.userId,
    title = props.title,
    views = props.views,
    viewType = props.viewType,
    switchActiveView = props.switchActiveView,
    updateView = props.updateView,
    setShowModal = props.setShowModal,
    setViewName = props.setViewName,
    setEditView = props.setEditView,
    extra = props.extra;
  var onViewChange = (0, _react.useCallback)(function (item) {
    switchActiveView && switchActiveView(item);
  }, [switchActiveView]);
  // 删除
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
  }, [views, updateView]);
  // 重命名
  var onEditView = (0, _react.useCallback)(function (item, e) {
    e.stopPropagation();
    setViewName && setViewName(item.name);
    setShowModal && setShowModal(true);
    setEditView && setEditView(item);
  }, []);
  return _react.default.createElement(_Receiver.default, null, function (locale) {
    return _react.default.createElement("div", {
      className: "gant-smart-table-viewpicker-panel"
    }, _react.default.createElement(_header.default, {
      title: title,
      extra: extra,
      type: "line",
      style: {
        paddingLeft: 10,
        fontWeight: 'normal'
      }
    }), _react.default.createElement("ul", {
      className: "content"
    }, views.length === 0 && _react.default.createElement(_empty.default, {
      image: _empty.default.PRESENTED_IMAGE_SIMPLE,
      description: locale.noView
    }), views.map(function (item) {
      var id = item.viewId,
        name = item.name;
      var _id$split = id.split('-'),
        _id$split2 = (0, _slicedToArray2.default)(_id$split, 2),
        _ = _id$split2[0],
        _userId = _id$split2[1];
      var editable = viewType === 'custom' || viewType === 'company' && _userId === userId;
      return _react.default.createElement("li", {
        key: name
      }, _react.default.createElement("div", {
        className: "leftContent",
        onClick: onViewChange.bind(null, item)
      }, _react.default.createElement("span", null, name)), _react.default.createElement("div", {
        className: "operates"
      }, editable && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_tooltip.default, {
        title: locale.rename
      }, _react.default.createElement(_icon.default, {
        className: "operate",
        type: "edit",
        onClick: onEditView.bind(null, item)
      })), viewId !== id && _react.default.createElement(_popconfirm.default, {
        placement: "topRight",
        title: locale.confirmDelView,
        onConfirm: onDelete.bind(null, item),
        okText: locale.ok,
        cancelText: locale.cancel
      }, _react.default.createElement(_tooltip.default, {
        title: locale.delete
      }, _react.default.createElement(_icon.default, {
        className: "operate delete",
        type: "delete"
      }))))));
    })));
  });
};