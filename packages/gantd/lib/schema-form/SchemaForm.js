"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SchemaForm;

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

var _react = _interopRequireWildcard(require("react"));

var _header = _interopRequireDefault(require("../header"));

var _editStatus = _interopRequireDefault(require("../edit-status"));

var _index = require("./index");

var _SchemaField = _interopRequireDefault(require("./SchemaField"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

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

function SchemaForm(props) {
  var uiSchema = props.uiSchema,
      schema = props.schema,
      titleConfig = props.titleConfig,
      withoutAnimation = props.withoutAnimation,
      frameworkComponents = props.frameworkComponents;

  var _useContext = (0, _react.useContext)(_index.FormContext),
      edit = _useContext.edit,
      prefixCls = _useContext.prefixCls;

  var renderPropTypeContent = (0, _react.useCallback)(function (item, pathName, required) {
    var type = item.type,
        hide = item.hide;

    switch (type) {
      case "object":
        return renderContent(pathName);

      default:
        if ((0, _lodash.isEmpty)(item)) return null;
        if (hide) return null;
        var nameArray = pathName.split('.');
        var itemName = nameArray[nameArray.length - 1];
        var isRequired = required && required.indexOf(itemName) >= 0;
        var filedTitle = item.title;
        var filedEdit = (0, _utils.getEdit)(edit, pathName);

        var _a = (0, _utils.getUIData)(uiSchema, "field", pathName),
            orders = _a.orders,
            gutter = _a.gutter,
            itemUiData = __rest(_a, ["orders", "gutter"]);

        if (withoutAnimation) {
          if (['DatePicker', 'RangePicker', "Selector", "LocationSelector"].includes(item.componentType)) {
            if (item.props) {
              item.props.transitionName = "";
            } else {
              item.props = {
                transitionName: ""
              };
            }
          }
        }

        return /*#__PURE__*/_react.default.createElement(_SchemaField.default, Object.assign({
          key: pathName
        }, item, {
          title: filedTitle,
          name: pathName,
          uiData: itemUiData,
          isRequired: isRequired,
          edit: filedEdit
        }));
    }
  }, [uiSchema, schema, edit, withoutAnimation]);
  var renderContent = (0, _react.useCallback)(function (pathName) {
    var schemaData = schema;

    if (pathName) {
      var nameArray = pathName.split('.');
      var getName = nameArray.join('.propertyType.');
      schemaData = (0, _lodash.get)(schema, "propertyType.".concat(getName));
    }

    var _getUIData = (0, _utils.getUIData)(uiSchema, "form", pathName),
        orders = _getUIData.orders,
        gutter = _getUIData.gutter,
        backgroundColor = _getUIData.backgroundColor,
        padding = _getUIData.padding,
        style = _getUIData.style,
        className = _getUIData.className;

    var _schemaData = schemaData,
        propertyType = _schemaData.propertyType,
        required = _schemaData.required,
        title = _schemaData.title;
    if ((0, _lodash.isEmpty)(propertyType)) return null;
    var propertyTypeArray = Object.keys(propertyType); //处理排序

    var orderKeys = (0, _utils.getOrders)(orders, propertyTypeArray); //处理编辑状态；

    var filedEdit = (0, _utils.getEdit)(edit, pathName); //处理header

    var titleSchema = (0, _utils.getTitle)(titleConfig, pathName);

    var visible = titleSchema.visible,
        titleSchemaId = titleSchema.id,
        restTitleSchema = __rest(titleSchema, ["visible", "id"]);

    var contents = orderKeys.map(function (itemName) {
      var item = propertyType[itemName];
      var itemPathName = pathName ? "".concat(pathName, ".").concat(itemName) : itemName;
      return renderPropTypeContent(item, itemPathName, required);
    });
    var pathNameArray = pathName ? pathName.split('.') : [];
    var id = pathNameArray[pathNameArray.length - 1];
    var containerColor = (0, _utils.getBackgroundColor)(backgroundColor, pathNameArray.length);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)("".concat(prefixCls, "-schemaCard"), filedEdit === _editStatus.default.EDIT && "".concat(prefixCls, "-showRequiredMark"), className),
      key: pathName,
      style: Object.assign({
        backgroundColor: containerColor,
        padding: padding
      }, style)
    }, (pathName ? visible : title) && /*#__PURE__*/_react.default.createElement(_header.default, Object.assign({
      title: title,
      style: {
        marginBottom: 16
      }
    }, restTitleSchema, {
      id: titleSchemaId ? titleSchemaId : id
    })), /*#__PURE__*/_react.default.createElement(_row.default, {
      gutter: gutter
    }, contents));
  }, [schema, edit, titleConfig, uiSchema]);
  var content = (0, _react.useMemo)(function () {
    return renderContent();
  }, [renderContent]);
  return /*#__PURE__*/_react.default.createElement(_form.default, {
    className: "".concat(prefixCls, "-schemaForm"),
    hideRequiredMark: true
  }, content);
}