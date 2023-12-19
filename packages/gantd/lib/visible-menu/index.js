"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/menu/style/css");

var _menu = _interopRequireDefault(require("antd/es/menu"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _configProvider = require("../config-provider");

var _reactSortableHoc = require("react-sortable-hoc");

var _excluded = ["children", "onSortEnd", "helperClass", "lockAxis", "disableAutoscroll", "getHelperDimensions", "hideSortableGhost", "lockOffset", "lockToContainerEdges", "pressDelay", "pressThreshold", "shouldCancelStart", "transitionDuration", "useWindowAsScrollContainer", "useDragHandle"],
    _excluded2 = ["index", "data", "isHidden", "disabled", "key", "label", "handleCheckbox", "onChange", "keyName", "sortable"],
    _excluded3 = ["title", "icon", "data", "hiddenRows", "keyName", "labelName", "disabled", "children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Handle = (0, _reactSortableHoc.sortableHandle)(function () {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-visible-menu-sorthandle"
  });
});
var SortableMenu = (0, _reactSortableHoc.sortableContainer)(function (_ref) {
  var children = _ref.children,
      onSortEnd = _ref.onSortEnd,
      helperClass = _ref.helperClass,
      lockAxis = _ref.lockAxis,
      disableAutoscroll = _ref.disableAutoscroll,
      getHelperDimensions = _ref.getHelperDimensions,
      hideSortableGhost = _ref.hideSortableGhost,
      lockOffset = _ref.lockOffset,
      lockToContainerEdges = _ref.lockToContainerEdges,
      pressDelay = _ref.pressDelay,
      pressThreshold = _ref.pressThreshold,
      shouldCancelStart = _ref.shouldCancelStart,
      transitionDuration = _ref.transitionDuration,
      useWindowAsScrollContainer = _ref.useWindowAsScrollContainer,
      useDragHandle = _ref.useDragHandle,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_menu.default, (0, _extends2.default)({
    className: "gant-visible-menu"
  }, props), children);
});
var SortableMenuItem = (0, _reactSortableHoc.sortableElement)(function (_ref2) {
  var index = _ref2.index,
      data = _ref2.data,
      isHidden = _ref2.isHidden,
      disabled = _ref2.disabled,
      key = _ref2.key,
      label = _ref2.label,
      handleCheckbox = _ref2.handleCheckbox,
      onChange = _ref2.onChange,
      keyName = _ref2.keyName,
      sortable = _ref2.sortable,
      props = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  return /*#__PURE__*/_react.default.createElement(_menu.default.Item, (0, _extends2.default)({
    key: key
  }, props), /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-visible-menu-item"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-visible-menu-item-check"
  }, /*#__PURE__*/_react.default.createElement(_checkbox.default, {
    dataKey: data[keyName],
    checked: !isHidden,
    disabled: disabled,
    onChange: onChange
  }, label)), sortable && /*#__PURE__*/_react.default.createElement(Handle, null)));
});

var VisibleMenu = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(VisibleMenu, _Component);

  var _super = _createSuper(VisibleMenu);

  function VisibleMenu() {
    var _this;

    (0, _classCallCheck2.default)(this, VisibleMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      visible: false,
      sortable: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSortEnd", function (_ref3, e) {
      var from = _ref3.oldIndex,
          to = _ref3.newIndex;
      if (!_lodash.default.isNil(from) && !_lodash.default.isNil(to)) _this.props.onSorted(from, to);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (e) {
      var _this$props = _this.props,
          data = _this$props.data,
          hiddenRows = _this$props.hiddenRows,
          handleCheckbox = _this$props.handleCheckbox;
      var _e$target = e.target,
          checked = _e$target.checked,
          dataKey = _e$target.dataKey;

      var hiddens = _lodash.default.cloneDeep(hiddenRows);

      checked ? _lodash.default.remove(hiddens, function (key) {
        return key === dataKey;
      }) : hiddens.push(dataKey);
      handleCheckbox(data, checked, hiddens);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderWithConfigConsumer", function (_ref4) {
      var getPrefixCls = _ref4.getPrefixCls,
          PrimaryColor = _ref4.PrimaryColor;
      var _this$props2 = _this.props,
          title = _this$props2.title,
          icon = _this$props2.icon,
          data = _this$props2.data,
          hiddenRows = _this$props2.hiddenRows,
          keyName = _this$props2.keyName,
          labelName = _this$props2.labelName,
          disabled = _this$props2.disabled,
          children = _this$props2.children,
          restProps = (0, _objectWithoutProperties2.default)(_this$props2, _excluded3);
      var sortable = _this.state.sortable;
      return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: disabled ? null : title
      }, /*#__PURE__*/_react.default.createElement(_dropdown.default, (0, _extends2.default)({
        disabled: disabled,
        onVisibleChange: function onVisibleChange(visible) {
          _this.setState({
            visible: visible
          });
        },
        visible: _this.state.visible
      }, restProps, {
        overlay: /*#__PURE__*/_react.default.createElement(SortableMenu, {
          onSortEnd: _this.onSortEnd,
          helperClass: getPrefixCls("visible-menu-sorting"),
          lockAxis: "y",
          useDragHandle: true
        }, _lodash.default.map(data, function (i, index) {
          var isHidden = hiddenRows.some(function (name) {
            return name === i[keyName];
          });

          var _disabled = hiddenRows.length + 1 === data.length && !isHidden;

          return /*#__PURE__*/_react.default.createElement(SortableMenuItem, {
            key: i[keyName],
            sortable: sortable,
            data: i,
            keyName: keyName,
            index: index,
            isHidden: isHidden,
            disabled: _disabled,
            label: i[labelName],
            onChange: _this.onChange
          });
        }))
      }), children ? children : /*#__PURE__*/_react.default.createElement(_button.default, {
        icon: icon,
        size: "small",
        style: hiddenRows.length > 0 ? {
          color: PrimaryColor,
          borderColor: PrimaryColor
        } : {}
      })));
    });
    return _this;
  }

  (0, _createClass2.default)(VisibleMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.onSorted !== VisibleMenu.defaultProps.onSorted) {
        this.setState({
          sortable: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_configProvider.ConfigConsumer, null, this.renderWithConfigConsumer);
    }
  }]);
  return VisibleMenu;
}(_react.Component);

exports.default = VisibleMenu;
(0, _defineProperty2.default)(VisibleMenu, "propTypes", {
  title: _propTypes.default.string,
  icon: _propTypes.default.string,
  data: _propTypes.default.array,
  hiddenRows: _propTypes.default.array,
  keyName: _propTypes.default.string,
  labelName: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  handleCheckbox: _propTypes.default.func,
  onSorted: _propTypes.default.func
});
(0, _defineProperty2.default)(VisibleMenu, "defaultProps", {
  title: '动态列',
  icon: 'eye',
  data: [],
  hiddenRows: [],
  keyName: 'key',
  labelName: 'value',
  disabled: false,
  handleCheckbox: function handleCheckbox(_) {
    return _;
  },
  onSorted: function onSorted() {}
});