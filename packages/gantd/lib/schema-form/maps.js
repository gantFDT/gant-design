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
var _input = _interopRequireDefault(require("../input"));
var _inputMoney = _interopRequireDefault(require("../input-money"));
var _inputNumber = _interopRequireDefault(require("../input-number"));
var _inputCellPhone = _interopRequireDefault(require("../input-cell-phone"));
var _inputTelePhone = _interopRequireDefault(require("../input-tele-phone"));
var _inputUrl = _interopRequireDefault(require("../input-url"));
var _inputEmail = _interopRequireDefault(require("../input-email"));
var _inputLanguage = _interopRequireDefault(require("../input-language"));
var _colorPicker = _interopRequireDefault(require("../color-picker"));
var _datePicker = _interopRequireDefault(require("../date-picker"));
var _selector = _interopRequireDefault(require("../selector"));
var _locationSelector = _interopRequireDefault(require("../location-selector"));
var _icon = _interopRequireDefault(require("../icon"));
var _lodash = require("lodash");
var _fields;
// import { Switch, Checkbox, Radio, AutoComplete } from 'antd'
// const CheckboxGroup = Checkbox.Group
// const RadioGroup = Radio.Group
var Password = _input.default.Password,
  TextArea = _input.default.TextArea,
  Search = _input.default.Search;
var RangePicker = _datePicker.default.RangePicker;
var IconSelector = _icon.default;
var Fields;
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
var fields = (_fields = {}, (0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)(_fields, Fields.Input, _input.default), Fields.Password, Password), Fields.Search, Search), Fields.InputNumber, _inputNumber.default), Fields.InputMoney, _inputMoney.default), Fields.InputUrl, _inputUrl.default), Fields.InputEmail, _inputEmail.default), Fields.InputLanguage, _inputLanguage.default), Fields.InputTelePhone, _inputTelePhone.default), Fields.InputCellPhone, _inputCellPhone.default), (0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)(_fields, Fields.TextArea, TextArea), Fields.DatePicker, _datePicker.default), Fields.RangePicker, RangePicker), Fields.ColorPicker, _colorPicker.default), Fields.Selector, _selector.default), Fields.IconSelector, IconSelector), Fields.LocationSelector, _locationSelector.default));
function getFields() {
  return Object.assign({}, fields);
}
function setFields(field) {
  fields = Object.assign(Object.assign({}, fields), field);
}
var defaultFieldProps = exports.defaultFieldProps = {
  size: 'small'
};
var setFieldProps = exports.setFieldProps = function setFieldProps(props) {
  (0, _lodash.merge)(defaultFieldProps, props);
};
var getFieldProps = exports.getFieldProps = function getFieldProps() {
  return defaultFieldProps;
};
var setGlobalConfig = exports.setGlobalConfig = setFieldProps;
var getGlobalConfig = exports.getGlobalConfig = getFieldProps;