"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/radio/style/css");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/modal/style/css");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireWildcard(require("react"));

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

function SaveAsModal(props) {
  var _props$form = props.form,
      getFieldDecorator = _props$form.getFieldDecorator,
      validateFieldsAndScroll = _props$form.validateFieldsAndScroll,
      visible = props.visible,
      loading = props.loading,
      onCancel = props.onCancel,
      onSubmit = props.onSubmit,
      systemViews = props.systemViews,
      customViews = props.customViews,
      companyViews = props.companyViews,
      companyViewAuth = props.companyViewAuth,
      nextProps = __rest(props, ["form", "visible", "loading", "onCancel", "onSubmit", "systemViews", "customViews", "companyViews", "companyViewAuth"]);

  var allNames = (0, _react.useMemo)(function () {
    return [].concat((0, _toConsumableArray2.default)(systemViews), (0, _toConsumableArray2.default)(customViews), (0, _toConsumableArray2.default)(companyViews)).map(function (item) {
      return item.name;
    });
  }, [systemViews, customViews, companyViews]);
  var onOk = (0, _react.useCallback)(function () {
    validateFieldsAndScroll(function (errors, values) {
      if (errors) return;
      onSubmit && onSubmit(values);
    });
  }, [onSubmit]);
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_modal.default, Object.assign({
      visible: visible,
      title: locale.viewSaveAs,
      onCancel: onCancel,
      centered: true,
      destroyOnClose: true,
      footer: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_button.default, {
        size: "small",
        icon: "close-circle",
        onClick: onCancel
      }, locale.cancel), /*#__PURE__*/_react.default.createElement(_button.default, {
        size: "small",
        type: "primary",
        icon: "save",
        loading: loading,
        onClick: onOk
      }, locale.save))
    }, nextProps), /*#__PURE__*/_react.default.createElement(_form.default, null, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
      label: locale.viewType,
      style: {
        marginBottom: 0
      }
    }, getFieldDecorator('type', {
      initialValue: 'custom'
    })( /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
      size: "small",
      buttonStyle: "solid"
    }, /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: "custom"
    }, locale.customView), companyViewAuth && /*#__PURE__*/_react.default.createElement(_radio.default, {
      value: "company"
    }, locale.companyView)))), /*#__PURE__*/_react.default.createElement(_form.default.Item, {
      label: locale.viewName
    }, getFieldDecorator('name', {
      rules: [{
        message: locale.viewNameRepeat,
        validator: function validator(rule) {
          var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var callback = arguments.length > 2 ? arguments[2] : undefined;
          var res = value.trim();

          if (!res) {
            rule.message = locale.viewNameRequired;
            callback(true);
          } else if (allNames.includes(res)) {
            callback(true);
          }

          callback(undefined);
        }
      }]
    })( /*#__PURE__*/_react.default.createElement(_input.default, {
      placeholder: locale.viewNamePlaceholder,
      maxLength: 500,
      autoComplete: "off"
    })))));
  });
}

var _default = /*#__PURE__*/(0, _react.memo)(_form.default.create()(SaveAsModal));

exports.default = _default;