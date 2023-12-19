"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/col/style/css");

var _col = _interopRequireDefault(require("antd/es/col"));

var _editStatus = _interopRequireDefault(require("../edit-status"));

var _input = _interopRequireDefault(require("../input"));

var _Receiver = _interopRequireDefault(require("./locale/Receiver"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _index = require("./index");

var _maps = require("./maps");

var _utils = require("./utils");

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

var SchemaField = function SchemaField(props, ref) {
  var options = props.options,
      title = props.title,
      FieldProps = props.props,
      componentType = props.componentType,
      name = props.name,
      isRequired = props.isRequired,
      required = props.required,
      edit = props.edit,
      uiData = props.uiData;

  var _useContext = (0, _react.useContext)(_index.FormContext),
      _useContext$form = _useContext.form,
      getFieldDecorator = _useContext$form.getFieldDecorator,
      resetFields = _useContext$form.resetFields,
      validateFieldsAndScroll = _useContext$form.validateFieldsAndScroll,
      onSave = _useContext.onSave,
      data = _useContext.data,
      customFields = _useContext.customFields,
      defalutProps = _useContext.defalutProps,
      collectInitialValue = _useContext.collectInitialValue,
      hideTitle = _useContext.hideTitle,
      frameworkComponents = _useContext.frameworkComponents,
      allowEdit = _useContext.allowEdit;

  var LabelComponent = frameworkComponents.LabelComponent;
  var onCancel = (0, _react.useCallback)(function () {
    return name && resetFields([name]);
  }, [componentType, name]);
  var onItemSave = (0, _react.useCallback)(function (id, value, cb) {
    name && validateFieldsAndScroll([name], function (errors, values) {
      if (errors) return;
      onSave(id, value, cb);
    });
  }, [name]);
  var optionsRules = options && options.rules ? options.rules : [];
  var col = uiData.col,
      labelAlign = uiData.labelAlign,
      labelCol = uiData.labelCol,
      wrapperCol = uiData.wrapperCol,
      extra = uiData.extra,
      style = uiData.style,
      className = uiData.className;
  var initialValue = (0, _react.useMemo)(function () {
    return (0, _lodash.get)(options, 'initialValue', (0, _lodash.get)(data, "".concat(name), undefined));
  }, [data]);
  var itemEdit = FieldProps && FieldProps.allowEdit === false ? _editStatus.default.CANCEL : edit;
  var colLayout = typeof col === 'number' ? {
    span: col
  } : col;
  var labelColLayout = typeof labelCol === 'number' ? {
    span: labelCol
  } : labelCol;
  var wrapperColayout = typeof wrapperCol === 'number' ? {
    span: wrapperCol
  } : wrapperCol;
  var renderFieldProps = (0, _react.useMemo)(function () {
    return Object.assign(Object.assign({}, defalutProps), FieldProps);
  }, [defalutProps, FieldProps]);
  var fieldComponent = (0, _react.useMemo)(function () {
    var component = (0, _lodash.get)((0, _maps.getFields)(), "".concat(componentType), null);
    var customIndex = -1;

    if (component == null && componentType) {
      customIndex = (0, _lodash.findIndex)(customFields, function (item) {
        return item.type === componentType || item.name === componentType;
      });
    }

    component = component ? component : (0, _lodash.get)(customFields, "[".concat(customIndex, "].component"), _input.default);

    var _a = renderFieldProps || {},
        initialValue = _a.initialValue,
        pattern = _a.pattern,
        othterProps = __rest(_a, ["initialValue", "pattern"]);

    return /*#__PURE__*/_react.default.createElement(component, Object.assign(Object.assign({
      allowEdit: allowEdit
    }, othterProps), {
      edit: itemEdit,
      onCancel: onCancel,
      onSave: onItemSave
    }));
  }, [renderFieldProps, itemEdit, onCancel, onItemSave, componentType, customFields, allowEdit]);
  (0, _react.useEffect)(function () {
    collectInitialValue(name, initialValue); // if (![null, undefined].includes(initialValue)) {
    //   emitDependenciesChange(name as string, initialValue);
    // }
  }, []);
  var requiredFinally = typeof required === 'boolean' ? required : isRequired;
  return /*#__PURE__*/_react.default.createElement(_col.default, Object.assign({}, colLayout), /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    //非中文语言环境下，label和required之间需要有空格
    var separator = locale.targetLang === 'zh-CN' ? '' : ' ';
    return /*#__PURE__*/_react.default.createElement(_form.default.Item, {
      label: // hideTitle ? <>{title}</> : title
      LabelComponent ? /*#__PURE__*/_react.default.createElement(LabelComponent, {
        title: title
      }) : title,
      // ref={ref}
      className: (0, _classnames.default)(className, (0, _utils.getFieldItemSizeClass)(renderFieldProps.size), requiredFinally ? 'field-required' : ''),
      style: style,
      wrapperCol: wrapperColayout,
      labelAlign: labelAlign,
      labelCol: labelColLayout,
      extra: extra
    }, name && getFieldDecorator(name, Object.assign(Object.assign({}, options), {
      initialValue: initialValue,
      rules: [{
        required: requiredFinally,
        message: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "".concat(title).concat(separator).concat(locale.required))
      }].concat((0, _toConsumableArray2.default)(optionsRules))
    }))(fieldComponent));
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(SchemaField));

exports.default = _default;