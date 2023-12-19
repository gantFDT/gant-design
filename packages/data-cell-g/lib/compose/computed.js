"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _editStatus = _interopRequireDefault(require("../edit-status"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = function _default(WrapperedComponent) {
  return /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(_class, _React$Component);

    var _super = _createSuper(_class);

    function _class() {
      (0, _classCallCheck2.default)(this, _class);
      return _super.apply(this, arguments);
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
        return /*#__PURE__*/_react.default.createElement(WrapperedComponent, Object.assign({}, this.props));
      }
    }]);
    return _class;
  }(_react.default.Component);
};

exports.default = _default;