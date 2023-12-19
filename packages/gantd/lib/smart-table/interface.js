"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.langEnum = exports.Fields = void 0;
var Fields;
exports.Fields = Fields;

(function (Fields) {
  Fields["Input"] = "Input";
  Fields["InputNumber"] = "InputNumber";
  Fields["InputUrl"] = "InputUrl";
  Fields["InputTelePhone"] = "InputTelePhone";
  Fields["InputCellPhone"] = "InputCellPhone";
  Fields["InputEmail"] = "InputEmail";
  Fields["InputLanguage"] = "InputLanguage";
  Fields["InputMoney"] = "InputMoney";
  Fields["TextArea"] = "TextArea";
  Fields["DatePicker"] = "DatePicker";
  Fields["Selector"] = "Selector";
  Fields["LocationSelector"] = "LocationSelector";
})(Fields || (exports.Fields = Fields = {}));

var langEnum;
exports.langEnum = langEnum;

(function (langEnum) {
  langEnum["zh-CN"] = "zh-CN";
  langEnum["en-US"] = "en-US";
})(langEnum || (exports.langEnum = langEnum = {}));