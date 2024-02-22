"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/input/style/css");
var _input = _interopRequireDefault(require("antd/es/input"));
require("antd/es/form/style/css");
var _form = _interopRequireDefault(require("antd/es/form"));
require("antd/es/modal/style/css");
var _modal = _interopRequireDefault(require("antd/es/modal"));
var _react = _interopRequireWildcard(require("react"));
var _Receiver = _interopRequireDefault(require("../locale/Receiver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var EditModal = function EditModal(props) {
  var loading = props.loading,
    showModal = props.showModal,
    setShowModal = props.setShowModal,
    withoutAnimation = props.withoutAnimation,
    _props$initValue = props.initValue,
    initValue = _props$initValue === void 0 ? '' : _props$initValue,
    _props$form = props.form,
    getFieldDecorator = _props$form.getFieldDecorator,
    validateFieldsAndScroll = _props$form.validateFieldsAndScroll,
    onSubmit = props.onSubmit;
  var onOk = (0, _react.useCallback)(function (e) {
    e.stopPropagation();
    validateFieldsAndScroll(function (errors, values) {
      if (errors) return;
      onSubmit && onSubmit(values.name);
    });
  }, [onSubmit]);
  var stoppropagation = (0, _react.useCallback)(function (e) {
    if (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  }, []);
  return _react.default.createElement(_Receiver.default, null, function (locale) {
    return _react.default.createElement("div", {
      onMouseDown: stoppropagation,
      onDoubleClick: stoppropagation,
      style: {
        display: 'inline-block'
      }
    }, _react.default.createElement(_modal.default, {
      okText: locale.ok,
      cancelText: locale.cancel,
      title: locale.setViewName,
      visible: showModal,
      destroyOnClose: true,
      centered: true,
      onCancel: setShowModal.bind(null, false),
      zIndex: 1040,
      onOk: onOk,
      confirmLoading: loading,
      okButtonProps: {
        size: 'small'
      },
      cancelButtonProps: {
        size: 'small'
      },
      transitionName: withoutAnimation ? "" : undefined
    }, _react.default.createElement(_form.default, {
      layout: "horizontal"
    }, _react.default.createElement(_form.default.Item, null, getFieldDecorator('name', {
      initialValue: initValue,
      rules: [{
        required: true,
        message: locale.viewNameRequired
      }]
    })(_react.default.createElement(_input.default, {
      placeholder: locale.viewNamePlaceholder,
      maxLength: 500
    }))))));
  });
};
var _default = exports.default = _form.default.create()(EditModal);