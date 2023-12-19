"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/popover/style/css");

var _popover = _interopRequireDefault(require("antd/es/popover"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style/css");

var _col = _interopRequireDefault(require("antd/es/col"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/tag/style/css");

var _tag = _interopRequireDefault(require("antd/es/tag"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _icon = _interopRequireDefault(require("../icon"));

var _dec, _class, _class2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Item = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Item, _Component);

  var _super = _createSuper(Item);

  function Item() {
    (0, _classCallCheck2.default)(this, Item);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Item, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          mode = _this$props.mode;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, mode === 'tags' ? value.map(function (v) {
        return /*#__PURE__*/_react.default.createElement(_tag.default, {
          key: v
        }, v);
      }) : /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        placement: "bottomLeft",
        title: value
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "itemText omitdisplay",
        style: {
          color: value ? 'rgba(0,0,0,.9)' : '#ccc'
        }
      }, value)));
    }
  }]);
  return Item;
}(_react.Component);

var ProfileCard = (_dec = _form.default.create(), _dec(_class = (_class2 = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(ProfileCard, _Component2);

  var _super2 = _createSuper(ProfileCard);

  function ProfileCard() {
    var _this;

    (0, _classCallCheck2.default)(this, ProfileCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getField", function (fields) {
      var _this$props2 = _this.props,
          getFieldDecorator = _this$props2.form.getFieldDecorator,
          layout = _this$props2.layout,
          data = _this$props2.data;
      return function (edit) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_row.default, {
          gutter: 24,
          style: {
            marginBottom: '10px',
            width: '100%'
          }
        }, fields.map(function (field) {
          return /*#__PURE__*/_react.default.createElement(_col.default, {
            key: field.key,
            style: {
              minWidth: 200
            }
          }, /*#__PURE__*/_react.default.createElement(_form.default.Item, (0, _extends2.default)({
            label: field.label
          }, layout), getFieldDecorator(field.key, _objectSpread({
            initialValue: data[field.key] || ''
          }, field.options))( /*#__PURE__*/_react.default.createElement(Item, field))));
        })));
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderWithConfigConsumer", function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props3 = _this.props,
          customizePrefixCls = _this$props3.prefixCls,
          data = _this$props3.data,
          fields = _this$props3.fields,
          showAvatar = _this$props3.showAvatar,
          labelAlign = _this$props3.labelAlign,
          avatarAlign = _this$props3.avatarAlign,
          extraLeftTop = _this$props3.extraLeftTop,
          extraRightTop = _this$props3.extraRightTop,
          extraBottom = _this$props3.extraBottom,
          backgroundImage = _this$props3.backgroundImage,
          backgroundBlur = _this$props3.backgroundBlur,
          height = _this$props3.height,
          trigger = _this$props3.trigger,
          children = _this$props3.children,
          className = _this$props3.className,
          _this$props3$placemen = _this$props3.placement,
          placement = _this$props3$placemen === void 0 ? 'bottom' : _this$props3$placemen,
          overlayClassName = _this$props3.overlayClassName,
          onAvatarClick = _this$props3.onAvatarClick;
      var prefixCls = getPrefixCls('profilecard', customizePrefixCls);

      var content = /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(prefixCls, avatarAlign, className),
        style: {
          height: height || 'auto',
          paddingBottom: extraBottom && 40
        }
      }, extraLeftTop && /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-fixedlefttop")
      }, extraLeftTop), extraRightTop && /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-fixedrighttop")
      }, extraRightTop), showAvatar && /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("".concat(prefixCls, "-avatarBox"), avatarAlign)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("".concat(prefixCls, "-avatarBox-bg"), avatarAlign),
        style: backgroundImage === false ? {} : {
          backgroundImage: "url(".concat(backgroundImage || data.avatarUrl, ")"),
          backgroundSize: 'cover',
          filter: "blur(".concat(backgroundBlur, "px)")
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("".concat(prefixCls, "-avatarBox-avatar"), avatarAlign),
        style: {
          backgroundImage: "url(".concat(data.avatarUrl, ")"),
          cursor: onAvatarClick ? 'pointer' : 'default'
        },
        onClick: onAvatarClick && onAvatarClick
      }, !data.avatarUrl && /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "user"
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)("".concat(prefixCls, "-fields"), labelAlign == 'left' && 'dataform', avatarAlign),
        style: {
          width: children ? 'auto' : 'auto'
        }
      }, /*#__PURE__*/_react.default.createElement(_form.default, {
        labelAlign: labelAlign
      }, _this.getField(fields)(false))), extraBottom && /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-fixedbottom")
      }, extraBottom));

      return data && (children ? /*#__PURE__*/_react.default.createElement(_popover.default, {
        placement: placement,
        content: content,
        trigger: trigger,
        overlayClassName: overlayClassName
      }, children) : content);
    });
    return _this;
  }

  (0, _createClass2.default)(ProfileCard, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_configProvider.ConfigConsumer, null, this.renderWithConfigConsumer);
    }
  }]);
  return ProfileCard;
}(_react.Component), (0, _defineProperty2.default)(_class2, "propTypes", {
  prefixCls: _propTypes.default.string,
  data: _propTypes.default.object,
  fields: _propTypes.default.array,
  showAvatar: _propTypes.default.bool,
  labelAlign: _propTypes.default.oneOf(['default', 'left']),
  avatarAlign: _propTypes.default.oneOf(['top', 'left', 'right']),
  extraLeftTop: _propTypes.default.element,
  extraRightTop: _propTypes.default.element,
  extraBottom: _propTypes.default.element,
  backgroundImage: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  backgroundBlur: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  layout: _propTypes.default.shape({
    labelCol: _propTypes.default.object,
    wrapperCol: _propTypes.default.object
  }),
  trigger: _propTypes.default.oneOf(['hover', 'click']),
  placement: _propTypes.default.string,
  overlayClassName: _propTypes.default.string,
  onAvatarClick: _propTypes.default.func
}), (0, _defineProperty2.default)(_class2, "defaultProps", {
  labelAlign: 'default',
  showAvatar: true,
  avatarAlign: 'top',
  backgroundBlur: 3,
  layout: {
    labelCol: {
      xs: {
        span: 12
      },
      sm: {
        span: 12
      }
    },
    wrapperCol: {
      xs: {
        span: 12
      },
      sm: {
        span: 12
      }
    }
  },
  trigger: 'hover'
}), _class2)) || _class); // export

var _default = ProfileCard;
exports.default = _default;