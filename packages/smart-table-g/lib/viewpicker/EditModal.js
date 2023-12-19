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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement("div", {
      onMouseDown: stoppropagation,
      onDoubleClick: stoppropagation,
      style: {
        display: 'inline-block'
      }
    }, /*#__PURE__*/_react.default.createElement(_modal.default, {
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
    }, /*#__PURE__*/_react.default.createElement(_form.default, {
      layout: "horizontal"
    }, /*#__PURE__*/_react.default.createElement(_form.default.Item, null, getFieldDecorator('name', {
      initialValue: initValue,
      rules: [{
        required: true,
        message: locale.viewNameRequired
      }]
    })( /*#__PURE__*/_react.default.createElement(_input.default, {
      placeholder: locale.viewNamePlaceholder,
      maxLength: 500
    }))))));
  });
};

var _default = _form.default.create()(EditModal);

exports.default = _default;