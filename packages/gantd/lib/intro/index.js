"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _configProvider = require("../config-provider");

var Intro = function Intro(props) {
  var renderContent = function renderContent(locale) {
    var customizePrefixCls = props.prefixCls,
        _props$imageAlign = props.imageAlign,
        imageAlign = _props$imageAlign === void 0 ? 'left' : _props$imageAlign,
        _props$imageRadius = props.imageRadius,
        imageRadius = _props$imageRadius === void 0 ? 0 : _props$imageRadius,
        image = props.image,
        title = props.title,
        content = props.content;
    return /*#__PURE__*/_react.default.createElement(_configProvider.ConfigConsumer, null, function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var prefixCls = getPrefixCls('intro', customizePrefixCls);
      var wrapPrefixCls = prefixCls + '-wrap';
      return /*#__PURE__*/_react.default.createElement("div", {
        className: prefixCls,
        style: {
          flexDirection: imageAlign == 'right' ? 'row-reverse' : 'row',
          padding: image ? '15px' : 0,
          marginBottom: !image ? '15px' : 0
        }
      }, image && /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-image"),
        style: {
          backgroundImage: "url(".concat(image),
          borderRadius: "".concat(imageRadius, "px")
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: wrapPrefixCls,
        style: {
          padding: image && '15px'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(wrapPrefixCls, "-title")
      }, title || locale.title), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(wrapPrefixCls, "-content")
      }, content || locale.content)));
    });
  };

  return /*#__PURE__*/_react.default.createElement(_LocaleReceiver.default, {
    componentName: "Intro"
  }, renderContent);
};

var _default = Intro;
exports.default = _default;