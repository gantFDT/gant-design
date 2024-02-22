"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = require("lodash");
//聚合的编辑组件
var CombEditComponent = function CombEditComponent(props) {
  var type = props.type,
    node = props.node,
    fields = props.fields;
  var fieldName = node.data.fieldName;
  //获取单元格的component、props
  var _get = (0, _lodash.get)(fields, fieldName),
    _get$editConfig = _get.editConfig,
    editConfig = _get$editConfig === void 0 ? {} : _get$editConfig;
  var component = editConfig.component,
    editProps = editConfig.props;
  //获取最终的props
  var finalEditConfig = editProps;
  if (typeof editProps === 'function') {
    finalEditConfig = editProps(node.data, props);
  }
  if (typeof component === 'function') {
    var Component = component;
    return _react.default.createElement(Component, Object.assign({}, props, finalEditConfig));
  }
  return _react.default.createElement(component, Object.assign(Object.assign({}, props), finalEditConfig));
};
var _default = exports.default = CombEditComponent;