"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _withbasic = require("../compose/withbasic");

var _renderText = _interopRequireDefault(require("../compose/renderText"));

var _Group = _interopRequireDefault(require("../input/Group"));

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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

var DataEditCell = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(DataEditCell, _Component);

  var _super = _createSuper(DataEditCell);

  function DataEditCell() {
    (0, _classCallCheck2.default)(this, DataEditCell);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DataEditCell, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          popupClassName = _this$props.popupClassName,
          setPopupClassName = _this$props.setPopupClassName,
          disabledBlur = _this$props.disabledBlur,
          setDisabledBlur = _this$props.setDisabledBlur;

      if (!(0, _lodash.isEqual)(prevProps.popupClassName, popupClassName)) {
        setPopupClassName(popupClassName);
      }

      if (!(0, _lodash.isEqual)(prevProps.disabledBlur, disabledBlur)) {
        setDisabledBlur(disabledBlur);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _a = this.props,
          computedEdit = _a.computedEdit,
          propsRenderText = _a.renderText,
          editAfter = _a.editAfter,
          children = _a.children,
          setPopupClassName = _a.setPopupClassName,
          setDisabledBlur = _a.setDisabledBlur,
          allowEdit = _a.allowEdit,
          setEdit = _a.setEdit,
          emptyText = _a.emptyText,
          props = __rest(_a, ["computedEdit", "renderText", "editAfter", "children", "setPopupClassName", "setDisabledBlur", "allowEdit", "setEdit", "emptyText"]);

      var child = typeof children == 'function' ? children : function (props) {
        return children;
      };
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !computedEdit ? (0, _renderText.default)(propsRenderText)(Object.assign({}, this.props)) : /*#__PURE__*/_react.default.createElement(_Group.default, {
        gant: true,
        size: props.size,
        edit: editAfter
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "gant-input-group-inner"
      }, child(props)), editAfter ? /*#__PURE__*/_react.default.createElement("span", {
        className: "gant-input-group-addon ant-input-group-addon"
      }, editAfter) : null));
    }
  }]);
  return DataEditCell;
}(_react.Component);

DataEditCell = __decorate([(0, _withbasic.withBasic)()], DataEditCell);
var _default = DataEditCell;
exports.default = _default;