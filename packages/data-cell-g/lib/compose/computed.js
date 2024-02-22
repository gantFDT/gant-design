"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _editStatus = _interopRequireDefault(require("../edit-status"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var _default = exports.default = function _default(WrapperedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(_class, _React$Component);
    function _class() {
      (0, _classCallCheck2.default)(this, _class);
      return _callSuper(this, _class, arguments);
    }
    (0, _createClass2.default)(_class, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props = this.props,
          edit = _this$props.edit,
          selfEdit = _this$props.selfEdit,
          setEdit = _this$props.setEdit,
          onCancelCache = _this$props.onCancelCache;
        if (prevProps.edit !== edit && edit === _editStatus.default.CANCEL) {
          onCancelCache();
        }
        if (edit === _editStatus.default.EDIT && selfEdit === _editStatus.default.EDIT) {
          setEdit(_editStatus.default.CANCEL);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(WrapperedComponent, Object.assign({}, this.props));
      }
    }]);
    return _class;
  }(_react.default.Component);
};