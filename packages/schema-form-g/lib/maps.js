"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldProps = exports.defaultFieldProps = exports.Fields = void 0;
exports.getFields = getFields;
exports.setFieldProps = exports.getGlobalConfig = void 0;
exports.setFields = setFields;
exports.setGlobalConfig = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dataCell = require("data-cell-g");

var _lodash = require("lodash");

var _fields;

// import { Switch, Checkbox, Radio, AutoComplete } from 'antd'
// const CheckboxGroup = Checkbox.Group
// const RadioGroup = Radio.Group
var Password = _dataCell.Input.Password,
    TextArea = _dataCell.Input.TextArea,
    Search = _dataCell.Input.Search;
var RangePicker = _dataCell.DatePicker.RangePicker;
var IconSelector = _dataCell.Icon;
var Fields;
exports.Fields = Fields;

(function (Fields) {
  Fields["Input"] = "Input";
  Fields["Password"] = "Password";
  Fields["InputNumber"] = "InputNumber";
  Fields["InputMoney"] = "InputMoney";
  Fields["InputUrl"] = "InputUrl";
  Fields["InputEmail"] = "InputEmail";
  Fields["InputLanguage"] = "InputLanguage";
  Fields["InputCellPhone"] = "InputCellPhone";
  Fields["InputTelePhone"] = "InputTelePhone";
  Fields["TextArea"] = "TextArea";
  Fields["DatePicker"] = "DatePicker";
  Fields["RangePicker"] = "RangePicker";
  Fields["ColorPicker"] = "ColorPicker";
  Fields["Selector"] = "Selector";
  Fields["IconSelector"] = "IconSelector";
  Fields["LocationSelector"] = "LocationSelector";
  Fields["Switch"] = "Switch";
  Fields["Checkbox"] = "Checkbox";
  Fields["CheckboxGroup"] = "CheckboxGroup";
  Fields["Radio"] = "Radio";
  Fields["RadioGroup"] = "RadioGroup";
  Fields["AutoComplete"] = "AutoComplete";
  Fields["Search"] = "Search";
})(Fields || (exports.Fields = Fields = {}));

var fields = (_fields = {}, (0, _defineProperty2.default)(_fields, Fields.Input, _dataCell.Input), (0, _defineProperty2.default)(_fields, Fields.Password, Password), (0, _defineProperty2.default)(_fields, Fields.Search, Search), (0, _defineProperty2.default)(_fields, Fields.InputNumber, _dataCell.InputNumber), (0, _defineProperty2.default)(_fields, Fields.InputMoney, _dataCell.InputMoney), (0, _defineProperty2.default)(_fields, Fields.InputUrl, _dataCell.InputUrl), (0, _defineProperty2.default)(_fields, Fields.InputEmail, _dataCell.InputEmail), (0, _defineProperty2.default)(_fields, Fields.InputLanguage, _dataCell.InputLanguage), (0, _defineProperty2.default)(_fields, Fields.InputTelePhone, _dataCell.InputTelePhone), (0, _defineProperty2.default)(_fields, Fields.InputCellPhone, _dataCell.InputCellPhone), (0, _defineProperty2.default)(_fields, Fields.TextArea, TextArea), (0, _defineProperty2.default)(_fields, Fields.DatePicker, _dataCell.DatePicker), (0, _defineProperty2.default)(_fields, Fields.RangePicker, RangePicker), (0, _defineProperty2.default)(_fields, Fields.ColorPicker, _dataCell.ColorPicker), (0, _defineProperty2.default)(_fields, Fields.Selector, _dataCell.Selector), (0, _defineProperty2.default)(_fields, Fields.IconSelector, IconSelector), (0, _defineProperty2.default)(_fields, Fields.LocationSelector, _dataCell.LocationSelector), _fields);

function getFields() {
  return Object.assign({}, fields);
}

function setFields(field) {
  fields = Object.assign(Object.assign({}, fields), field);
}

var defaultFieldProps = {
  size: 'small'
};
exports.defaultFieldProps = defaultFieldProps;

var setFieldProps = function setFieldProps(props) {
  (0, _lodash.merge)(defaultFieldProps, props);
};

exports.setFieldProps = setFieldProps;

var getFieldProps = function getFieldProps() {
  return defaultFieldProps;
};

exports.getFieldProps = getFieldProps;
var setGlobalConfig = setFieldProps;
exports.setGlobalConfig = setGlobalConfig;
var getGlobalConfig = getFieldProps;
exports.getGlobalConfig = getGlobalConfig;