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
    return maps.setGlobalConfig;
  }
});

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _dataCell = require("data-cell-g");

var _recompose = require("recompose");

var _SchemaForm2 = _interopRequireDefault(require("./SchemaForm"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireWildcard(require("./compose"));

var _utils = require("./utils");

var maps = _interopRequireWildcard(require("./maps"));

Object.keys(maps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === maps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return maps[key];
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

var FormContext = /*#__PURE__*/_react.default.createContext({});

exports.FormContext = FormContext;

var SchemaForm = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SchemaForm, _React$Component);

  var _super = _createSuper(SchemaForm);

  function SchemaForm(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SchemaForm);
    _this = _super.call(this, props);
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

  (0, _createClass2.default)(SchemaForm, [{
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
      var _this$props3 = this.props,
          schema = _this$props3.schema,
          form = _this$props3.form,
          edit = _this$props3.edit,
          allowEdit = _this$props3.allowEdit,
          uiSchema = _this$props3.uiSchema,
          titleConfig = _this$props3.titleConfig,
          onSave = _this$props3.onSave,
          data = _this$props3.data,
          customFields = _this$props3.customFields,
          backgroundColor = _this$props3.backgroundColor,
          className = _this$props3.className,
          _this$props3$withoutA = _this$props3.withoutAnimation,
          withoutAnimation = _this$props3$withoutA === void 0 ? false : _this$props3$withoutA,
          _this$props3$prefixCl = _this$props3.prefixCls,
          customizePrefixCls = _this$props3$prefixCl === void 0 ? 'gant' : _this$props3$prefixCl,
          size = _this$props3.size,
          hideTitle = _this$props3.hideTitle,
          formKey = _this$props3.formKey,
          frameworkComponents = _this$props3.frameworkComponents;

      if ((0, _lodash.isEmpty)(schema)) {
        return null;
      }

      var prefixCls = customizePrefixCls + '-schemaform';
      var defalutProps = size ? Object.assign(Object.assign({}, (0, maps.getFieldProps)()), {
        size: size
      }) : Object.assign({}, (0, maps.getFieldProps)());
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
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(className),
        style: {
          backgroundColor: backgroundColor
        },
        ref: "formNodeRef",
        "data-refid": formKey
      }, /*#__PURE__*/_react.default.createElement(_SchemaForm2.default, {
        schema: schema,
        uiSchema: uiSchema,
        titleConfig: titleConfig,
        withoutAnimation: withoutAnimation,
        frameworkComponents: frameworkComponents
      }))));
    }
  }]);
  return SchemaForm;
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

var _default = (0, _recompose.compose)(_compose.refHoc, _compose.default, _form.default.create({
  onValuesChange: function onValuesChange(props, changedValue, allValues) {
    var schema = props.schema,
        form = props.form,
        mapSubSchema = props.mapSubSchema;
    setTimeout(function () {
      (0, _compose.findDependencies)(changedValue, schema, mapSubSchema, form);
    }, 300); // props.onChange && props.onChange(changedValue, allValues)
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

exports.default = _default;