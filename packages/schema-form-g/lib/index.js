"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FormContext: true,
  setGlobalConfig: true
};
exports.default = exports.FormContext = void 0;
Object.defineProperty(exports, "setGlobalConfig", {
  enumerable: true,
  get: function get() {
    return _maps.setGlobalConfig;
  }
});
require("antd/es/form/style/css");
var _form = _interopRequireDefault(require("antd/es/form"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var _dataCell = require("data-cell-g");
var _recompose = require("recompose");
var _SchemaForm2 = _interopRequireDefault(require("./SchemaForm"));
var _lodash = require("lodash");
var _classnames = _interopRequireDefault(require("classnames"));
var _compose = _interopRequireWildcard(require("./compose"));
var _utils = require("./utils");
var _maps = _interopRequireWildcard(require("./maps"));
var maps = _maps;
Object.keys(_maps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _maps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _maps[key];
    }
  });
});
var _reactResizeDetector = _interopRequireDefault(require("react-resize-detector"));
var _lodashDecorators = require("lodash-decorators");
var _interface = require("./interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var FormContext = exports.FormContext = /*#__PURE__*/_react.default.createContext({});
var SchemaForm = /*#__PURE__*/function (_React$Component) {
  function SchemaForm(props) {
    var _this;
    (0, _classCallCheck2.default)(this, SchemaForm);
    _this = _callSuper(this, SchemaForm, [props]);
    /**收集所有子级节点的初始数据 */
    _this.initialValueMap = new Map();
    /**names:["user.name", "user.addr.street"] */
    _this.resetFields = function (names) {
      var _this$props$form = _this.props.form,
        resetFields = _this$props$form.resetFields,
        getFieldsValue = _this$props$form.getFieldsValue;
      _this.resetDependencies(function (init, current) {
        return init !== current;
      }, names);
      return resetFields(names);
    };
    _this.validateForm = function (names) {
      var validateFieldsAndScroll = _this.props.form.validateFieldsAndScroll;
      return new Promise(function (resolve) {
        validateFieldsAndScroll(names, function (errors, values) {
          return resolve({
            errors: errors,
            values: values
          });
        });
      });
    };
    _this.getFieldsValue = function (names) {
      var getFieldsValue = _this.props.form.getFieldsValue;
      return getFieldsValue(names);
    };
    _this.setFieldsValue = function (data) {
      var setFieldsValue = _this.props.form.setFieldsValue;
      setFieldsValue(data);
    };
    _this.getFormNode = function () {
      return _this.refs.formNodeRef;
    };
    var schema = props.schema;
    _this.state = {
      schemaCount: (0, _utils.getSchemaRenderCount)(schema)
    };
    return _this;
  }
  (0, _inherits2.default)(SchemaForm, _React$Component);
  return (0, _createClass2.default)(SchemaForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(pervPops) {
      var _this$props = this.props,
        data = _this$props.data,
        schema = _this$props.schema,
        _this$props$form2 = _this$props.form,
        getFieldsValue = _this$props$form2.getFieldsValue,
        setFieldsValue = _this$props$form2.setFieldsValue;
      var vals = getFieldsValue();
      if (!(0, _lodash.isEqual)(pervPops.data, data) && !(0, _lodash.isEqual)(vals, (0, _utils.getDateToForm)(data, schema))) {
        // schema更改或者data变化，清空map
        this.initialValueMap.clear();
        var newVals = (0, _utils.getNewValue)(vals, data, schema);
        setFieldsValue(newVals);
      }
    }
  }, {
    key: "resetDependencies",
    value: function resetDependencies(cb, names) {
      var _this$props2 = this.props,
        getFieldsValue = _this$props2.form.getFieldsValue,
        resetDependenciesChange = _this$props2.resetDependenciesChange;
      var initialValueMap = this.initialValueMap;
      var currentValues = getFieldsValue();
      /**initialValueMap中包含所有当前field的值 */
      // 需要被重置的所有字段
      var resetsValue = (0, _toConsumableArray2.default)(initialValueMap.entries()).filter(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          key = _ref2[0],
          initialValue = _ref2[1];
        if (!names || names.includes(key)) {
          var currentValue = (0, _lodash.get)(currentValues, key);
          return cb(initialValue, currentValue);
        }
        return false;
      }).reduce(function (result, _ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        var changedValue = [].concat((0, _toConsumableArray2.default)(key.split('.')), [value]).reverse().reduce(function (v, k) {
          return (0, _defineProperty2.default)({}, k, v);
        });
        return Object.assign(Object.assign({}, result), changedValue);
      }, {});
      resetDependenciesChange(resetsValue);
    }
  }, {
    key: "collectInitialValue",
    value: function collectInitialValue(name, initialValue) {
      var schemaCount = this.state.schemaCount;
      this.initialValueMap.set(name, initialValue);
      if (this.initialValueMap.size === schemaCount) {
        this.resetDependencies(function (init) {
          return ![null, undefined].includes(init);
        });
      }
    }
  }, {
    key: "onResize",
    value: function onResize(width, height) {
      var onSizeChange = this.props.onSizeChange;
      onSizeChange && onSizeChange({
        width: width,
        height: height
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _a = this.props,
        schema = _a.schema,
        form = _a.form,
        edit = _a.edit,
        allowEdit = _a.allowEdit,
        uiSchema = _a.uiSchema,
        titleConfig = _a.titleConfig,
        onSave = _a.onSave,
        data = _a.data,
        customFields = _a.customFields,
        backgroundColor = _a.backgroundColor,
        className = _a.className,
        _a$withoutAnimation = _a.withoutAnimation,
        withoutAnimation = _a$withoutAnimation === void 0 ? false : _a$withoutAnimation,
        _a$prefixCls = _a.prefixCls,
        customizePrefixCls = _a$prefixCls === void 0 ? 'gant' : _a$prefixCls,
        size = _a.size,
        hideTitle = _a.hideTitle,
        formKey = _a.formKey,
        frameworkComponents = _a.frameworkComponents,
        style = _a.style,
        resetDependenciesChange = _a.resetDependenciesChange,
        onSchemaChange = _a.onSchemaChange,
        onChange = _a.onChange,
        wrappedComponentRef = _a.wrappedComponentRef,
        onRef = _a.onRef,
        ref = _a.ref,
        onSizeChange = _a.onSizeChange,
        restProps = __rest(_a, ["schema", "form", "edit", "allowEdit", "uiSchema", "titleConfig", "onSave", "data", "customFields", "backgroundColor", "className", "withoutAnimation", "prefixCls", "size", "hideTitle", "formKey", "frameworkComponents", "style", "resetDependenciesChange", "onSchemaChange", "onChange", "wrappedComponentRef", "onRef", "ref", "onSizeChange"]);
      if ((0, _lodash.isEmpty)(schema)) {
        return null;
      }
      var prefixCls = customizePrefixCls + '-schemaform';
      var defalutProps = size ? Object.assign(Object.assign({}, (0, _maps.getFieldProps)()), {
        size: size
      }) : Object.assign({}, (0, _maps.getFieldProps)());
      return /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
        value: {
          form: form,
          edit: edit,
          onSave: onSave,
          data: data,
          customFields: customFields,
          // emitDependenciesChange,
          prefixCls: prefixCls,
          defalutProps: defalutProps,
          collectInitialValue: this.collectInitialValue,
          hideTitle: hideTitle,
          frameworkComponents: frameworkComponents,
          allowEdit: allowEdit
        }
      }, /*#__PURE__*/_react.default.createElement(_reactResizeDetector.default, {
        handleWidth: true,
        handleHeight: true,
        onResize: this.onResize
      }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
        className: (0, _classnames.default)(className),
        style: Object.assign(Object.assign({}, style), {
          backgroundColor: backgroundColor
        }),
        ref: "formNodeRef",
        "data-refid": formKey
      }, restProps), /*#__PURE__*/_react.default.createElement(_SchemaForm2.default, {
        schema: schema,
        uiSchema: uiSchema,
        titleConfig: titleConfig,
        withoutAnimation: withoutAnimation,
        frameworkComponents: frameworkComponents
      }))));
    }
  }]);
}(_react.default.Component);
SchemaForm.maps = maps;
SchemaForm.defaultProps = {
  edit: _dataCell.EditStatus.EDIT,
  onSave: function onSave() {
    return true;
  },
  data: {},
  customFields: [],
  uiSchema: {},
  backgroundColor: 'transparent',
  frameworkComponents: {}
};
__decorate([(0, _lodashDecorators.bind)()], SchemaForm.prototype, "collectInitialValue", null);
__decorate([(0, _lodashDecorators.bind)()], SchemaForm.prototype, "onResize", null);
var _default = exports.default = (0, _recompose.compose)(_compose.refHoc, _compose.default, _form.default.create({
  onValuesChange: function onValuesChange(props, changedValue, allValues) {
    var schema = props.schema,
      form = props.form,
      mapSubSchema = props.mapSubSchema;
    setTimeout(function () {
      (0, _compose.findDependencies)(changedValue, schema, mapSubSchema, form);
    }, 300);
    // props.onChange && props.onChange(changedValue, allValues)
    // 因为有findDependencies的存在, 导致了可能会存在allValues不准确的问题
    // 在这里，异步更新值的组件不会有问题，因为其他组件的值都已经更新
    // 主要问题在于，多层依赖都是同步更新的情况，当调用栈回退到外层更新的时候，此时的allValues中，内层依赖项的值仍然是更新之前的值，
    // 所以此时allValues的数据不可信
    props.onChange && props.onChange(changedValue, Object.assign(Object.assign({}, form.getFieldsValue()), changedValue));
  }
}), (0, _recompose.withHandlers)({
  // emitDependenciesChange: ({ schema, form, mapSubSchema }: Inner) => (
  //   key: string,
  //   value: any,
  // ) => {
  //   const changedValue = [...key.split('.'), value].reverse().reduce((v, k) => ({ [k]: v }));
  //   findDependencies(changedValue, schema, mapSubSchema, form);
  // },
  resetDependenciesChange: function resetDependenciesChange(_ref6) {
    var schema = _ref6.schema,
      form = _ref6.form,
      mapSubSchema = _ref6.mapSubSchema;
    return function (changedValue) {
      (0, _compose.findDependencies)(changedValue, schema, mapSubSchema, form);
    };
  }
}), (0, _recompose.renameProp)('onRef', 'ref'))(SchemaForm);