"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/checkbox/style/css");
var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));
require("antd/es/input/style/css");
var _input = _interopRequireDefault(require("antd/es/input"));
require("antd/es/form/style/css");
var _form = _interopRequireDefault(require("antd/es/form"));
require("antd/es/button/style/css");
var _button = _interopRequireDefault(require("antd/es/button"));
require("antd/es/modal/style/css");
var _modal = _interopRequireDefault(require("antd/es/modal"));
var _react = _interopRequireWildcard(require("react"));
var _Receiver = _interopRequireDefault(require("../locale/Receiver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function SaveAsModal(props) {
  var _props$form = props.form,
    getFieldDecorator = _props$form.getFieldDecorator,
    validateFieldsAndScroll = _props$form.validateFieldsAndScroll,
    visible = props.visible,
    loading = props.loading,
    onCancel = props.onCancel,
    onSubmit = props.onSubmit,
    nextProps = __rest(props, ["form", "visible", "loading", "onCancel", "onSubmit"]);
  var onOk = (0, _react.useCallback)(function () {
    validateFieldsAndScroll(function (errors, values) {
      if (errors) return;
      onSubmit && onSubmit(values);
    });
  }, [onSubmit]);
  return _react.default.createElement(_Receiver.default, null, function (locale) {
    return _react.default.createElement(_modal.default, Object.assign({
      visible: visible,
      title: locale.viewSaveAs,
      onCancel: onCancel,
      centered: true,
      destroyOnClose: true,
      footer: _react.default.createElement("div", null, _react.default.createElement(_button.default, {
        size: "small",
        icon: "close-circle",
        onClick: onCancel
      }, locale.cancel), _react.default.createElement(_button.default, {
        size: "small",
        type: "primary",
        icon: "save",
        loading: loading,
        onClick: onOk
      }, locale.save))
    }, nextProps), _react.default.createElement(_form.default, null, _react.default.createElement(_form.default.Item, {
      label: locale.viewName
    }, getFieldDecorator('name', {
      rules: [{
        required: true,
        message: locale.viewNameRequired
      }]
    })(_react.default.createElement(_input.default, {
      placeholder: locale.viewNamePlaceholder,
      maxLength: 500
    }))), _react.default.createElement(_form.default.Item, null, getFieldDecorator('isDefault', {
      valuePropName: 'checked',
      initialValue: false
    })(_react.default.createElement(_checkbox.default, null, locale.setDefault)))));
  });
}
var _default = exports.default = (0, _react.memo)(_form.default.create()(SaveAsModal));